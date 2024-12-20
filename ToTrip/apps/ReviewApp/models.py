from django.db import models
from apps.PlaceApp.models import Place
from apps.UsersApp.models import User
# Create your models here.
class Review(models.Model):
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='reviews')
    author = models.ForeignKey(User, related_name='user_reviews', on_delete=models.CASCADE)
    rating = models.IntegerField()
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"Review for {self.place.name} - {self.rating} stars"