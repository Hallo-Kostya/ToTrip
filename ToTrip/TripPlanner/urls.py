from django.urls import path,include
from . import views
urlpatterns = [
    path('', views.main_trip_page, name='main_trip_page'),
    path('add_city/', views.add_city, name='add_city'),
    path('add_place/', views.add_place, name='add_place'),
    path('town_page/', views.town_page, name='town_page'),
    path('cities/', views.city_list, name='city_list'),
    path('places/', views.place_list, name='place_list'),
    path('city/<int:city_id>/', views.city_detail, name='city_detail')
]