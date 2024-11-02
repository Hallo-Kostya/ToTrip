from django.db import models
class City(models.Model):
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    region = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.name}, {self.country}"

class Place(models.Model):
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=50)
    description = models.TextField()
    avg_rating = models.FloatField(default=0.0)
    coordinates = models.CharField(max_length=100)
    working_hours = models.CharField(max_length=100)
    city = models.ForeignKey(City, related_name='places', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} ({self.category})"

class Review(models.Model):
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(default=1)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for {self.place.name} - {self.rating} stars"
