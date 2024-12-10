from django.contrib import admin
from apps.PlaceApp.models import City, Country, District, Region, Place, FavoritePlace, Category
admin.site.register(City)
admin.site.register(Country)
admin.site.register(District)
admin.site.register(Region)
admin.site.register(Place)
admin.site.register(FavoritePlace)
admin.site.register(Category)
# Register your models here.
