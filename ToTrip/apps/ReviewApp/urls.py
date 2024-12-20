from django.urls import path
from .views import ReviewListCreateView

urlpatterns = [
    path('places/<int:place_id>/reviews/', ReviewListCreateView.as_view(), name='review-list-create'),
]
