from django.contrib import admin
from apps.PostApp.models import Post, PostCategory

admin.site.register(Post)
# Register your models here.
admin.site.register(PostCategory)