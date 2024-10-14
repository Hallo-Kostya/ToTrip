from django.urls import path,include
from . import views
urlpatterns = [
    path('', views.main_trip_page),
    path('cities_list/', views.cities_list)
]