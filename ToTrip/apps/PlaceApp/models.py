from django.db import models
from django.core.validators import FileExtensionValidator
from django.contrib.postgres.fields import ArrayField
# Create your models here.
from ToTrip import settings

class Category(models.Model):
    """модель категории с именем, кодом(для фильтрации будущей) и иконкой"""
    name = models.CharField(max_length=50, unique=True)
    code = models.IntegerField(unique=True)
    icon = models.FileField(upload_to='category_icons/', validators=[FileExtensionValidator(['jpg', 'png', 'svg'])], null=True, blank=True)
    def __str__(self):
        return f"Категория {self.name}"
    

class Country(models.Model):
    """модель страны с именем, кодом, своими фотографиями и флагом"""
    name=models.CharField(max_length=100,unique=True)
    code=models.CharField(max_length=3, unique=True)
    flag=models.ImageField(upload_to='country_photos/flags/', blank=True, null=True)
    def __str__(self):
        return self.name
    

class District(models.Model):
    """модель округа с именем и страной"""
    name=models.CharField(max_length=100,unique=True)
    country=models.ForeignKey(Country, related_name='districts', on_delete=models.CASCADE)
    def __str__(self):
        return f'{self.name} в стране {self.country.name}'
    
class Region(models.Model):
    """модель региона с именем и округом"""
    name=models.CharField(max_length=100,unique=True)
    district=models.ForeignKey(District, related_name='regions', on_delete=models.CASCADE)
    def __str__(self):
        return f'{self.name} в {self.district.name}'

class City(models.Model):
    """модель города с именем, координатами, регионом"""
    name = models.CharField(max_length=100)
    region = models.ForeignKey(Region, related_name='region_cities', on_delete=models.CASCADE)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null = True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null = True)
    def __str__(self):
        return f"{self.name}, {self.region.name}, {self.region.district.name}, {self.region.district.country.name}"
    


class Place(models.Model):
    """модель места с координатами, именем, адресом, категорией, рейтингом, рабочими часами"""
    services = ArrayField(
        models.CharField(max_length=100),  # Каждый элемент - строка длиной до 100 символов
        blank=True,
        default=list  # По умолчанию пустой список
    )
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255, default="Не указан")
    categories = models.ManyToManyField(Category, related_name='places')
    description = models.TextField(null=True, blank=True)
    avg_rating = models.FloatField(default=0.0)
    reviews_count = models.IntegerField(default=0)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null = True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null = True)
    working_hours = models.CharField(max_length=100)
    city = models.ForeignKey(City, related_name='city_places', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
    

class FavoritePlace(models.Model):
    """модель избранного места, связывающая пользователя и место"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='favorite_places', on_delete=models.CASCADE)
    place = models.ForeignKey(Place, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'place')  # Отключает дублирование избранного места для пользователя
    def __str__(self):
        return f"Favorite place for {self.user} in {self.place.city}."



