# Db_api/models.py
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone

from ToTrip import settings


class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('Email обязателен')
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        return self.create_user(email, username, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=30, unique=True)
    first_name = models.CharField(max_length=50, null=True)
    last_name = models.CharField(max_length=50,null=True)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    bio = models.TextField(blank=True, null=True)
    photo = models.ImageField(upload_to='user_photos/', blank=True, null=True,default='user_photos/default_avatar.jpg')
    last_login = models.DateTimeField(default=timezone.now, null=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    city=models.CharField(max_length=50, null=True)
    country = models.CharField(max_length=50, null=True)
    followers=models.ManyToManyField('self',symmetrical=False, related_name='following', blank=True)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return self.email
class Country(models.Model):
    name=models.CharField(max_length=100,unique=True)
    code=models.CharField(max_length=3, unique=True)
    image=models.ImageField(upload_to='country_photos/', blank=True, null=True)
    flag=models.ImageField(upload_to='country_photos/flags/', blank=True, null=True)
    def __str__(self):
        return self.name

class City(models.Model):
    name = models.CharField(max_length=100)
    country = models.ForeignKey(Country, related_name='cities', on_delete=models.CASCADE)
    region = models.CharField(max_length=100)
    coordinates=models.CharField(max_length=100, unique=True)
    photo=models.ImageField(upload_to='city_photos/', blank=True, null=True)
    def __str__(self):
        return f"{self.name}, {self.country}"
class Place(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    category = models.CharField(max_length=50)
    description = models.TextField(null=True, blank=True)
    photos = models.ImageField(upload_to='place_photos/', blank=True, null=True)
    avg_rating = models.FloatField(default=0.0)
    coordinates = models.CharField(max_length=100, unique=True)
    working_hours = models.CharField(max_length=100)
    city = models.ForeignKey(City, related_name='city_places', on_delete=models.CASCADE)
    country= models.ForeignKey(Country, related_name='places', on_delete=models.CASCADE)
    def __str__(self):
        return self.name

class Trip(models.Model):
    user=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='trips')
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    photos = models.ImageField(upload_to='trip_photos/', blank=True, null=True)
    start_Date=models.DateField()
    end_Date=models.DateField()
    places=models.ManyToManyField(Place, related_name='places_in_country')
    cities = models.ManyToManyField(City, related_name='cities')
    country= models.ManyToManyField(Country, related_name='trips_in_country')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Поездка: {self.title} ({self.start_date} - {self.end_date})"

class Post(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post by {self.user} at {self.created_at}"

class PostPhoto(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='photos')
    image = models.ImageField(upload_to='post_photos/')

    def __str__(self):
        return f"Photo for Post {self.post.id}"

class Review(models.Model):
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField()
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"Review for {self.place.name} - {self.rating} stars"

class ReviewPhotos(models.Model):
    review=models.ForeignKey(Review, on_delete=models.CASCADE, related_name='photos')
    image=models.ImageField(upload_to='review_photos/')

    def __str__(self):
        return f"Photo for Review {self.review.id}"

class Route(models.Model):
    name = models.CharField(max_length=255, unique=True, help_text="Name of the route")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class RoutePoint(models.Model):
    route = models.ForeignKey(Route, related_name='points', on_delete=models.CASCADE)
    name = models.CharField(max_length=255, help_text="Name or description of the point")
    latitude = models.FloatField(help_text="Latitude of the point")
    longitude = models.FloatField(help_text="Longitude of the point")
    order = models.PositiveIntegerField(help_text="Order of the point in the route")

    class Meta:
        unique_together = ('route', 'order')
        ordering = ['order']

    def __str__(self):
        return f"{self.name} (Order: {self.order})"