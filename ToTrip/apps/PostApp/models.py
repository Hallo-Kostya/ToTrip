from django.db import models
from ToTrip import settings
# Create your models here.

class Post(models.Model):
    """модель поста с привязкой к юзеру и контентом в виде текст филда, датой публикации"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_posts')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post by {self.user} at {self.created_at}"