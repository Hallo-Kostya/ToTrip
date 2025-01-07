from django.db import models
from ToTrip import settings
from apps.PlaceApp.models import Place, City
from apps.UsersApp.models import User
# Create your models here.
class Trip(models.Model):
    """модель поездки, содержащая связь с пользователем и местами\городами\странами, заголовок, описание, даты начала и конца
    поездки, а также дату создания поездки"""
    trippers = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='trippers')
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    start_Date = models.DateField()
    end_Date = models.DateField()
    temp_image = models.ImageField(upload_to="trip_photos/", default= "trip_photos/trip_base.png")
    cities = models.CharField(max_length=150, default='Не указан')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Поездка: {self.title} ({self.start_date} - {self.end_date})"




class  SubTrip(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name = 'subtrips')
    date = models.DateField()
    class Meta:
        unique_together = ('trip', 'date')


class SubtripPlace(models.Model):
    subtrip = models.ForeignKey(SubTrip, on_delete = models.CASCADE, related_name = 'subtrip_places')
    place = models.ForeignKey(Place, on_delete = models.DO_NOTHING, related_name = 'subtrip_review_places')
    class Meta:
        unique_together = ('subtrip', 'place')

class Note(models.Model):
    subtrip = models.ForeignKey(SubTrip, on_delete = models.CASCADE, related_name = "subtrip_notes")
    author = models.ForeignKey(User, on_delete= models.CASCADE, related_name="user_notes")
    title = models.CharField(max_length=100)
    content = models.TextField(blank=False, null = False)