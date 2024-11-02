from django.urls import path,include
from . import views
urlpatterns = [
    path('', views.main_trip_page, name='home_page'),
    path('town_page/', views.town_page, name='town_page'),
    path('profile/',views.profile_page, name='profile_page'),
    path('logout/', views.logout_page, name='logout_page'),
    path('register/', views.register_page, name='register_page'),
    path('login/', views.login_page, name='login_page')
]