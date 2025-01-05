from rest_framework import serializers
from .models import  Place, City, District, Country, Region, Category, FavoritePlace
from apps.UsersApp.models import User
from apps.ReviewApp.models import Review
from apps.ImageApp.serializers import PlaceImageSerializer
from apps.ReviewApp.serializers import ReviewSerializer

class CategorySerializer(serializers.ModelSerializer):
    """класс для преобразования категории мест в json формат и наоборот"""
    class Meta:
        model = Category
        fields = ["id", "name", "code", "icon"]

class PlaceSerializer(serializers.ModelSerializer):
    """класс для преобразования места в json формат и наоборот"""
    is_favorite = serializers.SerializerMethodField()
    placeimage_set = PlaceImageSerializer(many=True, read_only=True)
    reviews = ReviewSerializer(many=True, read_only = True)
    review_ids = serializers.PrimaryKeyRelatedField(queryset=Review.objects.all(), many=True, write_only=True)  
    city_name = serializers.CharField(source="city.name", read_only=True)
    city_id = serializers.IntegerField(source = "city.id", read_only=True)
    region_name = serializers.CharField(source="city.region.name", read_only=True)
    region_id = serializers.IntegerField(source = "city.region.id", read_only=True)
    district_name = serializers.CharField(source="city.region.district.name", read_only=True)
    district_id = serializers.IntegerField(source = "city.region.district.id", read_only=True)
    country_name = serializers.CharField(source="city.region.district.country.name", read_only=True)
    country_id = serializers.IntegerField(source = "city.region.district.country.id", read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), many=True, write_only=True)  
    avg_rating = serializers.SerializerMethodField()
    class Meta:
        model = Place
        fields = [
            "id",
            "name",
            "address",
            "services",
            "city_id",
            "city_name",
            "region_id",
            "region_name",
            "district_id",
            "district_name",
            "country_id",
            "country_name",
            "category_ids",
            "categories",
            "description",
            "avg_rating",
            "is_favorite",
            "placeimage_set",
            "reviews",
            "reviews_count",
            "review_ids"
        ]
    def get_is_favorite(self,obj):
        try:
            user = self.context.get('request').user
            favorite = FavoritePlace.objects.filter(user_id = user.id, place_id = obj.id).exists()
            return favorite
        except AttributeError:
            return False
            

    def create(self, validated_data):
        categories_data = validated_data.pop('category_ids')
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
