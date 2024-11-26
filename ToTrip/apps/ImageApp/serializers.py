from rest_framework import serializers
from .models import *

class PostImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = ["image"]

class CityImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityImage
        fields = ["image"]


class CountryImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryImage
        fields = ["image"]


class DistrictImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DistrictImage
        fields = ["image"]
    

class RegionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegionImage
        fields = ["image"]


class PlaceImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaceImage
        fields = ["image"]


class ReviewImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewImage
        fields = ["image"]