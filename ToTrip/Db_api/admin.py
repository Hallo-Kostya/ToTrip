from django.contrib import admin
from Db_api.models import City, CityImage, Place, User, Review, Country, CountryImage, Trip, TripImage, Category, Post, PostImage, ReviewImage, District, DistrictImage, Region, RegionImage, PlaceImage, FavoritePlace

admin.site.register(Country)
admin.site.register(CountryImage)
admin.site.register(District)
admin.site.register(DistrictImage)
admin.site.register(Region)
admin.site.register(RegionImage)
admin.site.register(City)
admin.site.register(CityImage)
admin.site.register(Place)
admin.site.register(PlaceImage)
admin.site.register(FavoritePlace)
admin.site.register(User)
admin.site.register(Review)
admin.site.register(Trip)
admin.site.register(TripImage)
admin.site.register(Category)
admin.site.register(Post)
admin.site.register(PostImage)
admin.site.register(ReviewImage)
# Register your models here.
