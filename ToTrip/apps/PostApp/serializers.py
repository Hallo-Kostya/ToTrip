from apps.ImageApp.serializers import BaseImageSerializer
from apps.PostApp.models import Post
from rest_framework import serializers
from apps.ImageApp.models import BaseImage 

class PostSerializer(serializers.ModelSerializer):
    """класс для сериализации поста (перевода в json и наоборот)"""
    postimage_set = BaseImageSerializer(many = True, read_only = True)
    class Meta:
        model = Post
        fields = ["id", "user", "content", "created_at", "postimage_set"]

    def create(self, validated_data):
        post_images = validated_data.pop('postimage_set', [])
        post = Post.objects.create(**validated_data)
        for image_data in post_images:
            BaseImage.objects.create(model_name = "Post", model_id = post.id, **image_data)
        
        return post
