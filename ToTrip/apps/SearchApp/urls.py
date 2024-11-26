from django.urls import path,include
from .views import *

urlpatterns = [
    path('search/', SearchPlacesAPIView.as_view(), name='search_api')
]