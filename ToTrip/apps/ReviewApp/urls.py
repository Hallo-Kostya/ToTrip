from django.urls import path
from .views import *

urlpatterns = [
    path('create/', AddReviewApiView.as_view(), name = 'add_review_api'),
]
