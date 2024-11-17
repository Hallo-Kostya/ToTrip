# Db_api/serializers.py
from rest_framework import serializers
from .models import User, City, Place, Category, PlaceImage, Country, District, Region
from django.contrib.auth import authenticate
from PIL import Image
from io import BytesIO
from django.core.files.base import ContentFile
import os
from ToTrip import settings


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


class PlaceImageSerializer(serializers.ModelSerializer):
    resized_image = serializers.SerializerMethodField()

    class Meta:
        model = PlaceImage
        fields = ["image", "resized_image"]

    def get_resized_image(self, obj):
        if obj.image:
            width = self.context.get('width', 80)  
            height = self.context.get('height', 80)
            img = Image.open(obj.image)
            img.thumbnail((width, height))
            # Сохраняем в буфер
            buffer = BytesIO()
            img.save(buffer, format="JPEG")  
            buffer.seek(0)

            original_filename = obj.image.name
            name, ext = os.path.splitext(original_filename)
            resized_filename = f"{name}-{width}x{height}{ext}"

            # Путь для сохранения изображения
            media_root = settings.MEDIA_ROOT  
            resized_path = os.path.join(media_root, 'resized', resized_filename)
            # Создаем папку, если она не существует
            os.makedirs(os.path.dirname(resized_path), exist_ok=True)
            # Сохраняем файл на диск
            with open(resized_path, 'wb') as f:
                f.write(buffer.getvalue())
            # Возвращаем путь к изображению, который будет доступен в URL
            return f"/media/resized/{resized_filename}"

        return None


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
