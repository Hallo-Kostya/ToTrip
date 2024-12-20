from django.contrib import admin
from apps.ImageApp.models import CityImage,PostImage, TripImage, PlaceImage, RegionImage, ReviewImage, CountryImage, DistrictImage
# Register your models here.
admin.site.register(CityImage)
admin.site.register(PostImage)
admin.site.register(TripImage)
admin.site.register(PlaceImage)
admin.site.register(RegionImage)
admin.site.register(ReviewImage)
admin.site.register(CountryImage)
admin.site.register(DistrictImage)