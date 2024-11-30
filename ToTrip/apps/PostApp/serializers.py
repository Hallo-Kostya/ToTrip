from apps.ImageApp.serializers import PostImageSerializer
from apps.PostApp.models import Post
from rest_framework import serializers

class PostSerializer(serializers.ModelSerializer):
    """класс для сериализации поста (перевода в json и наоборот)"""
    postimage_set = PostImageSerializer(many = True, read_only = True)
    class Meta:
        model = Post
        fields = ["id", "user", "content", "created_at", "postimage_set"]
