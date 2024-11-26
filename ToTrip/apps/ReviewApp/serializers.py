from apps.ImageApp.serializers import ReviewImageSerializer
from apps.ReviewApp.models import Review
from rest_framework import serializers

class ReviewSerializer(serializers.ModelSerializer):
    reviewimage_set = ReviewImageSerializer(many=True, read_only=True)
    class Meta:
        model = Review
        fields = ["place", "author", "rating", "text", "created_at", "reviewimage_set"]