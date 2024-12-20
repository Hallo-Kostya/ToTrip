from django.conf import settings
from django.urls import path,include
from django.conf.urls.static import static
from .views import *

urlpatterns = [
    path('place/<int:pk>/', PlaceDetailAPIView.as_view(), name='place_detail'),
    path('places/', AllPlacesIds.as_view(), name='places_ids')
]