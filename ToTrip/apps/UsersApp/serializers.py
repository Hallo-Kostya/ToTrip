# Db_api/serializers.py
from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from apps.ReviewApp.serializers import ReviewSerializer
from apps.PostApp.serializers import PostSerializer
from django.contrib.auth.hashers import make_password
from rest_framework.exceptions import ValidationError

class RegisterSerializer(serializers.ModelSerializer):
    """сериализатор, переводящий из json формата данные в новый объект User"""
    password = serializers.CharField(max_length=128, min_length=8, write_only=True)
    class Meta:
        model = User
        fields = (
            "username",
            "password",
            "first_name",
            "last_name",
            "email",
            "phone_number",
            "bio",
            "photo",
            "city",
            "country"
        )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    """сериализатор, проверяющий имеется ли данный юзер в бд"""
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(email=data["email"], password=data["password"])
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Некорректные данные для входа")


class FollowSerializer(serializers.ModelSerializer):
    """сериализатор для модели подписчика"""
    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "photo"]

class UserSerializer(serializers.ModelSerializer):
    """сериализатор пользователя, содержащий дополнительно счетчик подписок, подписчиков,
    отзывы, посты"""
    followers_count = serializers.IntegerField(source="followers.count", read_only=True)
    following_count = serializers.IntegerField(source="following.count", read_only=True)
    followers = FollowSerializer(many=True, read_only=True)
    user_reviews = ReviewSerializer(many=True, read_only = True)
    user_posts = PostSerializer(many=True, read_only = True)
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
            "user_reviews",
            "user_posts"
        ]


class UserEditSerializer(serializers.ModelSerializer):
    """
    Сериализатор для редактирования профиля пользователя, предоставляет возможность изменить любое поле объекта
    """
    class Meta:
        model = User
        fields = (
            "email",
            "password",
            "first_name",
            "last_name",
            "bio",
            "city",
            "country",
            "photo",
            "username",
            "phone_number"
        )
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
            'email': {'required': False},
            'first_name': {'required': False},
            'last_name': {'required': False},
            'username': {'required': False}
        }

    def update(self, instance, validated_data):
        """метод проверяет на существование такого же емайла, юзернейма, а также чтобы новый пароль отличался от прошлого"""
        if 'password' in validated_data:
            new_password = validated_data['password']
            if new_password != instance.password:
                validated_data['password'] = new_password
            else:
                raise ValidationError("Новый пароль должен отличаться от нынешнего!")

        if 'email' in validated_data:
            email = validated_data['email']
            if User.objects.filter(email=email).exclude(id=instance.id).exists():
                raise ValidationError("Этот email уже используется другим пользователем.")

        if 'username' in validated_data:
            username = validated_data['username']
            if User.objects.filter(username=username).exclude(id=instance.id).exists():
                raise ValidationError("Этот username уже используется другим пользователем.")

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance
