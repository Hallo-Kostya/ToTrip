from rest_framework import serializers
from .models import Trip, SubTrip, SubtripPlace
from apps.UsersApp.serializers import FollowSerializer
from apps.PlaceApp.serializers import CityShortSerializer, PlaceSerializer
from apps.PlaceApp.models import City, Place
from apps.ReviewApp.models import Review
from apps.UsersApp.models import User 
from apps.ReviewApp.serializers import ReviewSerializer

class SubtripPlaceSerializer(serializers.ModelSerializer):
    place_id = serializers.PrimaryKeyRelatedField(queryset=Place.objects.all(), source='place', write_only=True)
    place = PlaceSerializer(read_only=True)
    class Meta:
        model = SubtripPlace
        fields = ["id", "place_id", "place"]

    def to_representation(self, instance):
        """Добавляем полную информацию о месте при запросе"""
        representation = super().to_representation(instance)
        representation['place'] = PlaceSerializer(instance.place).data
        return representation

class SubTripSerializer(serializers.ModelSerializer):
    subtrip_places = SubtripPlaceSerializer(many = True)
    trip_id = serializers.PrimaryKeyRelatedField(queryset=Trip.objects.all(), write_only=True)
    class Meta:
        model = SubTrip
        fields = ["id", "date", "subtrip_places", "trip_id"]

    def create(self, validated_data):
        places_data = validated_data.pop('subtrip_places')
        trip = validated_data.pop('trip_id')
        
        # Создаем SubTrip, привязываем к Trip
        subtrip = SubTrip.objects.create(trip=trip, **validated_data)
        
        # Создаем связанные места для SubTrip
        for place_data in places_data:
            place = place_data.pop('place')
            SubtripPlace.objects.create(subtrip=subtrip, place=place, **place_data)
        
        return subtrip

class CreateTripSerializer(serializers.ModelSerializer):
    trippers = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True)
    cities = serializers.PrimaryKeyRelatedField(queryset=City.objects.all(), many=True)
    
    class Meta:
        model = Trip
        fields = ['id', 'trippers', 'title', 'description', 'start_Date', 'end_Date', 'cities']


class TripSerializer(serializers.ModelSerializer):
    trippers = FollowSerializer(many = True)
    cities = CityShortSerializer(many = True)  
    subtrips = SubTripSerializer(many = True)
    class Meta: 
        model = Trip
        fields = ['id', 'trippers', 'title', 'description', 'start_Date', 'end_Date', 'cities', 'subtrips']

    def validate(self, data):
        """Проверка, что даты корректны"""
        if data['start_Date'] > data['end_Date']:
            raise serializers.ValidationError("Дата начала не может быть позже даты окончания.")
        return data