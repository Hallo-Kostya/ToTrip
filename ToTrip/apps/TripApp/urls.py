from django.urls import path, include
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('detail/<int:trip_id>/', TripDetailApiView.as_view(), name = 'trip_detail_api'),
    path('list/', TripListApiView.as_view(), name = 'personal_triplist_api'),
    path('list/<int:user_id>/', TripListApiView.as_view(), name = 'triplist_api'),
    path('create/', CreateTripAPIView.as_view(), name = 'createtrip_api'),
    path('delete/<int:trip_id>/', DeleteTripApiView.as_view(), name = 'deletetrip_api'),
    path('subtrip/create/', CreateSubtripApiView.as_view(), name = 'create_subtrip_api'),
    path('subtrip/detail/<int:trip_id>/<str:date>/', SubtripDetailApiView.as_view(), name = 'subtrip_detail_api'),
    path('subtrip/add_place/<int:trip_id>/<str:date>/', AddPlaceToSubtripApiView.as_view(), name = 'add_place_to_subtrip_api'),
    path('subtrip/remove_place/<int:subtripplace_id>/', DeleteSubtripPlaceApiView.as_view(), name = 'delete_place_from_subtrip_api'),
    path('subtrip/delete/<int:trip_id>/<str:date>/', DeleteSubtripApiView.as_view(), name = 'delete_subtrip_api'),
    path('subtrip/add_note/', AddNoteApiView.as_view(), name = 'add_note_api'),
    path('subtrip/notes/', GetUserNotesApiView.as_view(), name = 'notes_list_api'),
    path('subtrip/delete_note/<int:note_id>/', DeleteNoteApiView.as_view(), name = 'delete_note_api'), 
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
