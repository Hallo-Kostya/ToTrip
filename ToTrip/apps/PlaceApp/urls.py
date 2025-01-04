from django.conf import settings
from django.urls import path,include
from django.conf.urls.static import static
from .views import *

urlpatterns = [
    path('<int:pk>/', PlaceDetailAPIView.as_view(), name='place_detail'),
    path('list/', AllPlacesIds.as_view(), name='places_ids'),
    path('favorite/', FavoritesView.as_view(), name = 'favorite_places'),
    path('favorite/<int:place_id>/', FavoritesView.as_view(), name = 'favorite_places'),
    path('addplace/', create_place, name='addplace')
] +  static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)