from django.urls import path, include
from .views import *

urlpatterns = [
    path('detail/<int:trip_id>/', TripDetailApiView.as_view(), name = 'trip_detail_api'),
    path('list/', TripListApiView.as_view(), name = 'personal_triplist_api'),
    path('list/<int:user_id>/', TripListApiView.as_view(), name = 'triplist_api'),
    path('create/', CreateTripAPIView.as_view(), name = 'createtrip_api'),
    path('delete/<int:trip_id>/', DeleteTripApiView.as_view(), name = 'deletetrip_api'),
    path('subtrip/create/', CreateSubtripApiView.as_view(), name = 'create_subtrip_api'),
    path('subtrip/add/<int:subtrip_id>/', AddPlaceToSubtripApiView.as_view(), name = 'add_place_to_subtrip_api'),
    path('subtrip/remove/<int:subtripplace_id>/', DeleteSubtripPlaceApiView.as_view(), name = 'delete_place_from_subtrip_api'),
    path('subtrip/delete/<int:subtrip_id>/', DeleteSubtripApiView.as_view(), name = 'delete_subtrip_api'),
]
