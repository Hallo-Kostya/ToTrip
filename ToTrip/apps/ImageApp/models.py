from django.db import models
from apps.PlaceApp.models import Country, District, Region, City, Place
from apps.ReviewApp.models import Review
from apps.PostApp.models import Post
from apps.TripApp.models import Trip
# Create your models here.
class CountryImage(models.Model):
    country = models.ForeignKey(Country,related_name="countryimage_set", on_delete=models.CASCADE)
    image = models.ImageField(upload_to='country_images/')
    
    def __str__(self):
        return f"Photos for Country {self.country.name}"



class DistrictImage(models.Model):
    district = models.ForeignKey(District,related_name="districtimage_set", on_delete=models.CASCADE)
    image = models.ImageField(upload_to='district_images/')
    
    def __str__(self):
        return f"Photos for District {self.district.name}"



class RegionImage(models.Model):
    region = models.ForeignKey(Region,related_name="regionimage_set", on_delete=models.CASCADE)
    image = models.ImageField(upload_to='region_images/')
    
    def __str__(self):
        return f"Photos for Region {self.region.name}"


class CityImage(models.Model):
    city = models.ForeignKey(City,related_name="cityimage_set", on_delete=models.CASCADE)
    image = models.ImageField(upload_to='city_images/')
    
    def __str__(self):
        return f"Photos for City {self.city.name}"

class TripImage(models.Model):
    trip = models.ForeignKey(Trip,related_name="tripimage_set", on_delete=models.CASCADE)
    image = models.ImageField(upload_to='trip_images/')
    
    def __str__(self):
        return f"Photos for Trip {self.trip.user}"
class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='postimage_set')
    image = models.ImageField(upload_to='post_photos/')

    def __str__(self):
        return f"Photo for Post {self.post.id}"
class ReviewImage(models.Model):
    review=models.ForeignKey(Review, on_delete=models.CASCADE, related_name='reviewimage_set')
    image=models.ImageField(upload_to='review_photos/')

    def __str__(self):
        return f"Photo for Review {self.review.id}"
class PlaceImage(models.Model):
    place = models.ForeignKey(Place,related_name="placeimage_set", on_delete=models.CASCADE)
    image = models.ImageField(upload_to='place_images/')
    
    def __str__(self):
        return f"Photos for Place {self.place.name}"