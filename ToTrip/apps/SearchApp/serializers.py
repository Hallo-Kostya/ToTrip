from rest_framework import serializers
from apps.PlaceApp.models import  City, Place,  Country, District,  Region
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