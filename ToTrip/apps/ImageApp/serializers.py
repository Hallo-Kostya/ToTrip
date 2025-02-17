from rest_framework import serializers
from .models import *


class BaseImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseImage
        fields = "__all__"
    
    def validate(self, data):
        if data["model_name"] not in ["District", "City", "Place", "Review", "Region", "Post", "Trip"]:
            raise serializers.ValidationError("given model_name is not allowed")
        if type(data["model_id"]) is not int |  int(data["model_id"])<0: 
            raise serializers.ValidationError("model_id must be integer and greater than 0")
        return data
        

        
# class PostImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PostImage
#         fields = ["image", "author"]

# class CityImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CityImage
#         fields = ["image", "author"]


# class CountryImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CountryImage
#         fields = ["image", "author"]


# class DistrictImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = DistrictImage
#         fields = ["image", "author"]
    

# class RegionImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = RegionImage
#         fields = ["image", "author"]


# class PlaceImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PlaceImage
#         fields = ["image", "author"]


# class ReviewImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ReviewImage
#         fields = ["image", "author"]

# class TripImageSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = TripImage
#         fields = ["image", "author"]