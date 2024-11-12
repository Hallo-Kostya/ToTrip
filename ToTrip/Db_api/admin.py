from django.contrib import admin
from Db_api.models import City, Place, User, Review, Country, Trip, Category, Post, PostPhoto, ReviewPhotos, District, Region, PlaceImage, FavoritePlace

admin.site.register(Country)
admin.site.register(District)
admin.site.register(Region)
admin.site.register(City)
admin.site.register(Place)
admin.site.register(PlaceImage)
admin.site.register(FavoritePlace)
admin.site.register(User)
admin.site.register(Review)
admin.site.register(Trip)
admin.site.register(Category)
admin.site.register(Post)
admin.site.register(PostPhoto)
admin.site.register(ReviewPhotos)
# Register your models here.