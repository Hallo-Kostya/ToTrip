from django.db import models
from ToTrip import settings
from apps.PlaceApp.models import Place, City, Country
# Create your models here.
class Trip(models.Model):
    user=models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='trips')
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    start_Date=models.DateField()
    end_Date=models.DateField()
    places=models.ManyToManyField(Place, related_name='places_in_country')
    cities = models.ManyToManyField(City, related_name='cities')
    country= models.ManyToManyField(Country, related_name='trips_in_country')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Поездка: {self.title} ({self.start_date} - {self.end_date})"


