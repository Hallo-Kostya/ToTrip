# Db_api/serializers.py
from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate
from apps.ReviewApp.serializers import ReviewSerializer
from apps.PostApp.serializers import PostSerializer

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, min_length=8, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)
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
            "country",
            "token"
        )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


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