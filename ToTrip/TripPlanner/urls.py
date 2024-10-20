from django.urls import path,include
from . import views
urlpatterns = [
    path('', views.main_trip_page),
    path('town_page/', views.town_page)
]