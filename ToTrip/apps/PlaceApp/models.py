from django.db import models
# Create your models here.
from ToTrip import settings

class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)
    code = models.IntegerField(unique=True)
    icon = models.ImageField(upload_to='category_icons/', null=True, blank=True)
    def __str__(self):
        return f"Категория {self.name}"
    

class Country(models.Model):
    name=models.CharField(max_length=100,unique=True)
    code=models.CharField(max_length=3, unique=True)
    image=models.ImageField(upload_to='country_photos/', blank=True, null=True)
    flag=models.ImageField(upload_to='country_photos/flags/', blank=True, null=True)
    def __str__(self):
        return self.name
    

class District(models.Model):
    name=models.CharField(max_length=100,unique=True)
    country=models.ForeignKey(Country, related_name='districts', on_delete=models.CASCADE)
    def __str__(self):
        return f'{self.name} в стране {self.country.name}'
    
class Region(models.Model):
    name=models.CharField(max_length=100,unique=True)
    district=models.ForeignKey(District, related_name='regions', on_delete=models.CASCADE)
    def __str__(self):
        return f'{self.name} в {self.district.name}'

class City(models.Model):
    name = models.CharField(max_length=100)
    region = models.ForeignKey(Region, related_name='region_cities', on_delete=models.CASCADE)
    coordinates=models.CharField(max_length=100, null=True)
    def __str__(self):
        return f"{self.name}, {self.region.name}, {self.region.district.name}, {self.region.district.country.name}"
    


class Place(models.Model):
    fsq_id=models.CharField(max_length=50, unique=True, null=True)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255, default="Не указан")
    category = models.ForeignKey(Category, on_delete=models.CASCADE,related_name='places')
    description = models.TextField(null=True, blank=True)
    avg_rating = models.FloatField(default=0.0, null=True)
    coordinates = models.CharField(max_length=100, null=True)
    working_hours = models.CharField(max_length=100)
    city = models.ForeignKey(City, related_name='city_places', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    

class FavoritePlace(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='favorite_places', on_delete=models.CASCADE)
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'place')  # Отключает дублирование избранного места для пользователя
    def __str__(self):
        return f"Favorite place for {self.user} in {self.place.city}."



