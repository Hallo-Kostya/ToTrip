from apps.ImageApp.serializers import BaseImageSerializer
from apps.ReviewApp.models import Review
from rest_framework import serializers
from apps.PlaceApp.models import Place
from apps.UsersApp.models import User


class UserReviewSerializer(serializers.ModelSerializer):
    """сериализатор пользователя, содержащий дополнительно счетчик подписок, подписчиков,
    отзывы, посты"""

    class Meta:
        model = User
        fields = [
            "id",
            "first_name",
            "last_name",
            "photo",
        ]

class EditReviewSerializer(serializers.ModelSerializer):

    class Meta:
        model = Review
        fields = (
            "rating",
            "text"
        )
    # extra_kwargs = {
    #         'password': {'write_only': True, 'required': False},
    #         'email': {'required': False},
    #         'first_name': {'required': False},
    #         'last_name': {'required': False},
    #         'username': {'required': False}
    #     }

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

class ReviewSerializer(serializers.ModelSerializer):
    """сериализатор отзыва"""
    reviewimage_set = BaseImageSerializer(many=True, read_only=True)
    place_id = serializers.PrimaryKeyRelatedField(queryset=Place.objects.all(), write_only=True)
    author = UserReviewSerializer(read_only=True)
    class Meta:
        model = Review
        fields = ["id","place_id","author", "rating", "text", "created_at", "reviewimage_set"]

    def create(self, validated_data):
        # Получаем текущего пользователя из контекста запроса
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['author'] = request.user
        place = validated_data.pop('place_id')
        validated_data['place'] = place
        
        return super().create(validated_data)  



       