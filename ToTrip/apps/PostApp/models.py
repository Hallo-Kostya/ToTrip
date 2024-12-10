from django.db import models
from ToTrip import settings
from django.core.validators import FileExtensionValidator
# Create your models here.


class PostCategory(models.Model):
    name = models.CharField(max_length=50, unique=True)
    icon = models.FileField(upload_to='postcategory_icons/', validators=[FileExtensionValidator(['jpg', 'png', 'svg'])], null=True, blank=True)

    def __str__(self):
        return f"Категория для постов {self.name}"
    

class Post(models.Model):
    """модель поста с привязкой к юзеру и контентом в виде текст филда, датой публикации"""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_posts')
    category = models.ForeignKey(PostCategory, on_delete = models.CASCADE, related_name="category_posts", null = True, blank = True)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Post by {self.user} at {self.created_at}"