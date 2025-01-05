from apps.ImageApp.serializers import ReviewImageSerializer
from apps.ReviewApp.models import Review
from rest_framework import serializers
from apps.PlaceApp.models import Place
from apps.UsersApp.serializers import UserSerializer

class ReviewSerializer(serializers.ModelSerializer):
    """сериализатор отзыва"""
    reviewimage_set = ReviewImageSerializer(many=True, read_only=True)
    place_id = serializers.PrimaryKeyRelatedField(queryset=Place.objects.all(), write_only=True)
    author = UserSerializer(read_only=True)
    class Meta:
        model = Review
        fields = ["place_id","author", "rating", "text", "created_at", "reviewimage_set"]

    def create(self, validated_data):
        # Получаем текущего пользователя из контекста запроса
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['author'] = request.user
        place = validated_data.pop('place_id')
        validated_data['place'] = place
        
        return super().create(validated_data)  


        