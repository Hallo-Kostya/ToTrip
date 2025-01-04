from apps.ImageApp.serializers import PostImageSerializer
from apps.PostApp.models import Post
from rest_framework import serializers
from apps.ImageApp.models import PostImage 

class PostSerializer(serializers.ModelSerializer):
    """класс для сериализации поста (перевода в json и наоборот)"""
    postimage_set = PostImageSerializer(many = True, read_only = True)
    class Meta:
        model = Post
        fields = ["id", "user", "content", "created_at", "postimage_set"]

    def create(self, validated_data):
        post_images = validated_data.pop('postimage_set', [])
        post = Post.objects.create(**validated_data)
        for image_data in post_images:
            PostImage.objects.create(post=post, **image_data)
        
        return post
