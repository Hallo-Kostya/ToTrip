from django.db import models
from apps.PlaceApp.models import Country, District, Region, City, Place
from apps.ReviewApp.models import Review
from apps.PostApp.models import Post
from apps.TripApp.models import Trip
from apps.UsersApp.models import User
# Create your models here.
def image_upload_path(instance, filename):
    return f'{instance.model_name}_images/{filename}'

class BaseImage(models.Model):
    model_name = models.TextField(max_length = 15)
    model_id = models.IntegerField()
    image = models.ImageField(upload_to=image_upload_path)
    author = models.ForeignKey(User, related_name='user_images', blank=True, null=True, on_delete=models.DO_NOTHING)
    

    def __str__(self):
        return f"Images for {self.model_name} with id: {self.model_id}, image_id:{self.pk}"


# class CountryImage(BaseImage):
#     country = models.ForeignKey(Country,related_name="countryimage_set", on_delete=models.CASCADE)
#     image = models.ImageField(upload_to='country_images/')
#     author = models.ForeignKey(User,related_name='country_photos', blank=True, null=True, on_delete=models.DO_NOTHING)
    
#     def __str__(self):
#         return f"Photos for Country {self.country.name}"



# class DistrictImage(BaseImage):
#     district = models.ForeignKey(District,related_name="districtimage_set", on_delete=models.CASCADE)
#     image = models.ImageField(upload_to='district_images/')
#     author = models.ForeignKey(User,related_name='district_photos', blank=True, null=True, on_delete=models.DO_NOTHING)
#     def __str__(self):
#         return f"Photos for District {self.district.name}"



# class RegionImage(BaseImage):
#     region = models.ForeignKey(Region,related_name="regionimage_set", on_delete=models.CASCADE)
#     image = models.ImageField(upload_to='region_images/')
#     author = models.ForeignKey(User,related_name='region_photos', blank=True, null=True, on_delete=models.DO_NOTHING)
    
#     def __str__(self):
#         return f"Photos for Region {self.region.name}"


# class CityImage(BaseImage):
#     city = models.ForeignKey(City,related_name="cityimage_set", on_delete=models.CASCADE)
#     image = models.ImageField(upload_to='city_images/')
#     author = models.ForeignKey(User,related_name='city_photos', blank=True, null=True, on_delete=models.DO_NOTHING)
    
#     def __str__(self):
#         return f"Photos for City {self.city.name}"

# class TripImage(BaseImage):
#     trip = models.ForeignKey(Trip,related_name="tripimage_set", on_delete=models.CASCADE)
#     image = models.ImageField(upload_to='trip_images/')
#     author = models.ForeignKey(User,related_name='trip_photos', blank=True, null=True, on_delete=models.DO_NOTHING)
#     def __str__(self):
#         return f"Photos for Trip {self.trip.user}"
    

# class PostImage(BaseImage):
#     post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='postimage_set')
#     image = models.ImageField(upload_to='post_photos/')
#     author = models.ForeignKey(User,related_name='post_photos', blank=True, null=True, on_delete=models.DO_NOTHING)
#     def __str__(self):
#         return f"Photo for Post {self.post.id}"
    

# class ReviewImage(BaseImage):
#     review=models.ForeignKey(Review, on_delete=models.CASCADE, related_name='reviewimage_set')
#     image=models.ImageField(upload_to='review_photos/')
#     author = models.ForeignKey(User,related_name='review_photos', blank=True, null=True, on_delete=models.DO_NOTHING)
#     def __str__(self):
#         return f"Photo for Review {self.review.id}"
    

# class PlaceImage(BaseImage):
#     place = models.ForeignKey(Place,related_name="placeimage_set", on_delete=models.CASCADE)
#     image = models.ImageField(upload_to='place_images/')
#     author = models.ForeignKey(User,related_name='place_photos', blank=True, null=True, on_delete=models.DO_NOTHING)
#     def __str__(self):
#         return f"Photos for Place {self.place.name}"