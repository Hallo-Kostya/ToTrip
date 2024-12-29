from rest_framework import serializers
from .models import Trip, SubTrip, SubtripReviewPlace
from apps.UsersApp.serializers import FollowSerializer
from apps.PlaceApp.serializers import CityShortSerializer, PlaceSerializer
from apps.PlaceApp.models import City
from apps.UsersApp.models import User 
from apps.ReviewApp.serializers import ReviewSerializer

class SubtripReviewPlaceSerializer(serializers.ModelSerializer):
    place = PlaceSerializer(read_only=True)
    review = ReviewSerializer(read_only=True)
    class Meta:
        model = SubtripReviewPlace
        fields = ["id", "place", "review"]


class SubTripSerializer(serializers.ModelSerializer):
    places = SubtripReviewPlaceSerializer(many = True, read_only = True)
    class Meta:
        model = SubTrip
        fields = ["id", "date", "places"]

class CreateTripSerializer(serializers.ModelSerializer):
    trippers = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)
    cities = serializers.PrimaryKeyRelatedField(queryset=City.objects.all(), many=True)
    
    class Meta:
        model = Trip
        fields = ['id', 'trippers', 'title', 'description', 'start_Date', 'end_Date', 'cities']


class TripSerializer(serializers.ModelSerializer):
    trippers = FollowSerializer(many = True, read_only = True)
    cities = CityShortSerializer(many = True, read_only = True)  
    subtrips = SubTripSerializer(many = True, read_only = True)
    class Meta:
        model = Trip
        fields = ['id', 'trippers', 'title', 'description', 'start_Date', 'end_Date', 'cities', 'subtrips']

    def validate(self, data):
        """Проверка, что даты корректны"""
        if data['start_Date'] > data['end_Date']:
            raise serializers.ValidationError("Дата начала не может быть позже даты окончания.")
        return data