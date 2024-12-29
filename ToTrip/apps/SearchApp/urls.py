from django.urls import path,include
from .views import *

urlpatterns = [
    path('', SearchPlacesAPIView.as_view(), name='search_api')
]