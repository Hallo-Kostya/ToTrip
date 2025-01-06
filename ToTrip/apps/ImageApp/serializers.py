from rest_framework import serializers
from .models import *

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ["image", "author"]

class CityImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityImage
        fields = ["image", "author"]


class CountryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryImage
        fields = ["image", "author"]


class DistrictImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistrictImage
        fields = ["image", "author"]
    

class RegionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegionImage
        fields = ["image", "author"]


class PlaceImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceImage
        fields = ["image", "author"]


class ReviewImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewImage
        fields = ["image", "author"]

class TripImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripImage
        fields = ["image", "author"]