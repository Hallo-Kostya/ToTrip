from django.urls import path,include
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('create/', AddPostView.as_view(), name = 'add_post_api'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
