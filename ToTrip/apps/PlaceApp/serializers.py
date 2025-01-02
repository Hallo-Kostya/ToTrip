from rest_framework import serializers
from .models import  Place, City, District, Country, Region, Category
from apps.ImageApp.serializers import PlaceImageSerializer
from apps.ReviewApp.serializers import ReviewSerializer
class CategorySerializer(serializers.ModelSerializer):
    """класс для преобразования категории мест в json формат и наоборот"""
    class Meta:
        model = Category
        fields = ["id", "name", "code", "icon", "photo"]

class PlaceSerializer(serializers.ModelSerializer):
    """класс для преобразования места в json формат и наоборот"""
    placeimage_set = PlaceImageSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only = True)
    city_name = serializers.CharField(source="city.name", read_only=True)
    city_id = serializers.IntegerField(source = "city.id", read_only=True)
    region_name = serializers.CharField(source="city.region.name", read_only=True)
    region_id = serializers.IntegerField(source = "city.region.id", read_only=True)
    district_name = serializers.CharField(source="city.region.district.name", read_only=True)
    district_id = serializers.IntegerField(source = "city.region.district.id", read_only=True)
    country_name = serializers.CharField(source="city.region.district.country.name", read_only=True)
    country_id = serializers.IntegerField(source = "city.region.district.country.id", read_only=True)
    categories = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), many=True)
    class Meta:
        model = Place
        fields = [
            "id",
            "name",
            "address",
            "city_id",
            "city_name",
            "region_id",
            "region_name",
            "district_id",
            "district_name",
            "country_id",
            "country_name",
            "categories",
            "description",
            "avg_rating",
            "longitude",
            "latitude",
            "working_hours",
            "placeimage_set",
            "reviews"
        ]
    def create(self, validated_data):
        categories_data = validated_data.pop('categories')
        place = Place.objects.create(**validated_data)
        place.categories.set(categories_data)
        return place

class CitySerializer(serializers.ModelSerializer):
    """класс для преобразования города в json формат и наоборот"""
    places = PlaceSerializer(many=True, read_only=True)
    region_name = serializers.CharField(source="region.name", read_only=True)
    region_id = serializers.IntegerField(source = "region.id", read_only=True)
    district_name = serializers.CharField(source="district.name", read_only=True)
    disctrict_id = serializers.IntegerField(source = "region.district.id", read_only=True)
    country_name = serializers.CharField(source="region.district.country.name", read_only=True)
    country_id = serializers.IntegerField(source = "region.district.country.id", read_only=True)
    class Meta:
        model = City
        fields = ["id", "name", "region_id","region_name", "district_id", "district_name", "country_id", "country_name","places"]

class CityShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = ["id", "name"]

class RegionSerializer(serializers.ModelSerializer):
    """класс для преобразования региона в json формат и наоборот"""
    cities = CitySerializer(many=True, read_only=True)

    class Meta:
        model = Region
        fields = ["id", "name", "image", "district", "cities"]


class DistrictSerializer(serializers.ModelSerializer):
    """класс для преобразования округа в json формат и наоборот"""
    regions = RegionSerializer(many=True, read_only=True)

    class Meta:
        model = District
        fields = ["id", "name", "image", "country", "regions"]


class CountrySerializer(serializers.ModelSerializer):
    """класс для преобразования страны в json формат и наоборот"""
    districts = DistrictSerializer(many=True, read_only=True)

    class Meta:
        model = Country
        fields = ["id", "name", "code", "image", "flag", "districts"]
