from django.db import models
from apps.PlaceApp.models import Place
from apps.UsersApp.models import User
# Create your models here.
class Review(models.Model):
    """модель отзыва, включающая связь с местом, юзером(автором), рейтинг и сам текст отзыва с временем написания"""
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='reviews')
    author = models.ForeignKey(User, related_name='user_reviews', on_delete=models.CASCADE)
    rating = models.FloatField()
    text = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        self.update_place_avg_rating()

    def delete(self, *args, **kwargs):
        super().delete(*args, **kwargs)
        self.update_place_avg_rating()

    def update_place_avg_rating(self):
        try:
            reviews = Review.objects.filter(place=self.place).values_list('rating', flat = True).distinct()
            if len(reviews) > 0:
                rating = sum(reviews)/len(reviews)
                count = len(reviews)
            else:
                rating = 0.0
            self.place.avg_rating = rating 
            self.place.reviews_count = count
            self.place.save()
        except Review.DoesNotExist:
            rating = 0.0
            self.place.avg_rating = rating 
            self.place.save()

    def __str__(self):
        return f"Review for {self.place.name} - {self.rating} stars"