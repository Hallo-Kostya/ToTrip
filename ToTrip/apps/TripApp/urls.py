from django.urls import path, include
from .views import *

urlpatterns = [
    path('list/', TripListApiView.as_view(), name = 'personal_triplist_api'),
    path('list/<int:user_id>/', TripListApiView.as_view(), name = 'triplist_api'),
    path('create/', CreateTripAPIView.as_view(), name = 'createtrip_api'),
    path('delete/<int:trip_id>/', DeleteTripApiView.as_view(), name = 'deletetrip_api')
]
