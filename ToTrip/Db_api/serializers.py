# Db_api/serializers.py
from rest_framework import serializers
from .models import User, City, CityImage, Place, PlaceImage, Category,  Country, CountryImage, District, DistrictImage, Region, RegionImage 
from django.contrib.auth import authenticate
from PIL import Image
import os
from ToTrip import settings


def crop_image(obj):
    # Обрабатываем только первую фотографию
    img = Image.open(obj.image)
    img_width, img_height = img.size
    if img.mode in ("RGBA", "LA"):
        background = Image.new("RGB", img.size, (255, 255, 255))  # Белый фон
        background.paste(img, mask=img.split()[3])  # Применяем альфа-канал как маску
        img = background
    # Находим наименьшую сторону
    min_side = min(img_width, img_height)
    # Находим координаты для обрезки (по центру)
    left = (img_width - min_side) / 2
    top = (img_height - min_side) / 2
    right = (img_width + min_side) / 2
    bottom = (img_height + min_side) / 2

    # Обрезаем изображение, чтобы оно стало квадратным
    img_cropped = img.crop((left, top, right, bottom))
    original_filename = obj.image.name
    name, ext = os.path.splitext(original_filename)
    cropped_filename = f"{name}-cropped{ext}"
    media_root = settings.MEDIA_ROOT
    cropped_path = os.path.join(media_root, 'cropped', cropped_filename)
    if os.path.exists(cropped_path):
        return f"/media/cropped/{cropped_filename}"
    os.makedirs(os.path.dirname(cropped_path), exist_ok=True)
    img_cropped.save(cropped_path, format="JPEG", quality=90, optimize=True)
    return f"/media/cropped/{cropped_filename}"


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            "username",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "bio",
            "photo",
            "password",
            "city",
            "country",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            username=validated_data["username"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            phone_number=validated_data.get("phone_number"),
            city=validated_data.get("city"),
            country=validated_data.get("country"),
            bio=validated_data.get("bio"),
        )
        user.set_password(
            validated_data["password"]
        )  # Храните пароль в зашифрованном виде
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data["email"], password=data["password"])
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Некорректные данные для входа")


class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "photo"]


class UserSerializer(serializers.ModelSerializer):
    followers_count = serializers.IntegerField(source="followers.count", read_only=True)
    following_count = serializers.IntegerField(source="following.count", read_only=True)
    followers = FollowSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "bio",
            "city",
            "country",
            "photo",
            "username",
            "phone_number",
            "created_at",
            "followers_count",
            "following_count",
            "followers",
        ]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "code", "icon", "photo"]


class CityImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityImage
        fields = ["image"]


class CountryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryImage
        fields = ["image"]


class DistrictImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistrictImage
        fields = ["image"]
    

class RegionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegionImage
        fields = ["image"]


class PlaceImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceImage
        fields = ["image"]


class PlaceSerializer(serializers.ModelSerializer):
    placeimage_set = PlaceImageSerializer(many=True, read_only=True)

    class Meta:
        model = Place
        fields = [
            "id",
            "name",
            "address",
            "category",
            "description",
            "avg_rating",
            "coordinates",
            "working_hours",
            "city",
            "country",
            "placeimage_set",
        ]

    

class CitySerializer(serializers.ModelSerializer):
    places = PlaceSerializer(many=True, read_only=True)

    class Meta:
        model = City
        fields = ["name", "region", "places"]


class RegionSerializer(serializers.ModelSerializer):
    cities = CitySerializer(many=True, read_only=True)

    class Meta:
        model = Region
        fields = ["id", "name", "image", "district", "cities"]


class DistrictSerializer(serializers.ModelSerializer):
    regions = RegionSerializer(many=True, read_only=True)

    class Meta:
        model = District
        fields = ["id", "name", "image", "country", "regions"]


class CountrySerializer(serializers.ModelSerializer):
    districts = DistrictSerializer(many=True, read_only=True)

    class Meta:
        model = Country
        fields = ["id", "name", "code", "image", "flag", "districts"]

class SearchCitySerializer(serializers.ModelSerializer):
    search_image = serializers.SerializerMethodField()  
    region_name = serializers.CharField(source="region.name", read_only=True)
    district_name = serializers.CharField(source="district.name", read_only=True)
    country_name = serializers.CharField(source="region.district.country.name", read_only=True)
    class Meta:
        model = City
        fields = ["name", "region_name", "district_name", "country_name", "search_image"]
    def get_search_image(self, obj):
        search_image = obj.cityimage_set.first()
        if search_image:
            return crop_image(search_image)
        return None


class SearchRegionSerializer(serializers.ModelSerializer):
    search_image = serializers.SerializerMethodField() 
    district_name = serializers.CharField(source="district.name", read_only=True)
    country_name = serializers.CharField(source="district.country.name", read_only=True)
    class Meta:
        model = Region
        fields = ["id", "name", "search_image", "district_name", "country_name"]
    def get_search_image(self, obj):
        search_image = obj.regionimage_set.first()
        if search_image:
            return crop_image(search_image)
        return None


class SearchDistrictSerializer(serializers.ModelSerializer):
    search_image = serializers.SerializerMethodField()
    country_name = serializers.CharField(source="country.name", read_only=True)
    class Meta:
        model = District
        fields = ["id", "name", "search_image", "country_name"]

    def get_search_image(self, obj):
        search_image = obj.districtimage_set.first()
        if search_image:
            return crop_image(search_image)
        return None


class SearchCountrySerializer(serializers.ModelSerializer):
    search_image = serializers.SerializerMethodField()
    class Meta:
        model = Country
        fields = ["id", "name", "search_image"]

    def get_search_image(self, obj):
        search_image = obj.countryimage_set.first()
        if search_image:
            return crop_image(search_image)
        return None

class SearchPlaceSerializer(serializers.ModelSerializer):
    search_image = serializers.SerializerMethodField()
    city_name = serializers.CharField(source="city.name", read_only=True)
    region_name = serializers.CharField(source="city.region.name", read_only=True)
    district_name = serializers.CharField(source="city.region.district.name", read_only=True)
    country_name = serializers.CharField(source="country.name", read_only=True)
    class Meta:
        model = Place
        fields = [
            "id",
            "name",
            "city_name",
            "region_name",
            "district_name",
            "country_name",
            "search_image"
        ]

    def get_search_image(self, obj):
        search_image = obj.placeimage_set.first()
        if search_image:
            return crop_image(search_image)
        return None