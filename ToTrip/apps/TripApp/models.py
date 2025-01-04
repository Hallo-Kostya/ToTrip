from django.db import models
from ToTrip import settings
from apps.PlaceApp.models import Place, City
from apps.ReviewApp.models import Review
# Create your models here.
class Trip(models.Model):
    """модель поездки, содержащая связь с пользователем и местами\городами\странами, заголовок, описание, даты начала и конца
    поездки, а также дату создания поездки"""
    trippers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='trippers')
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    start_Date = models.DateField()
    end_Date = models.DateField()
    cities = models.ManyToManyField(City, related_name='trip_cities')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Поездка: {self.title} ({self.start_date} - {self.end_date})"


class  SubTrip(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name = 'subtrips')
    date = models.DateField()
    class Meta:
        unique_together = ('trip', 'date')


class SubtripPlace(models.Model):
    subtrip = models.ForeignKey(SubTrip, on_delete=models.CASCADE, related_name = 'subtrip_places')
    place = models.ForeignKey(Place, on_delete = models.DO_NOTHING, related_name = 'subtrip_review_places')
    class Meta:
        unique_together = ('subtrip', 'place')