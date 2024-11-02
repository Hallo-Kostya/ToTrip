from django.contrib import admin
from django.urls import path, include
from .views import register_page, login_page, profile_page, logout_page, main_page

urlpatterns = [
    path('', main_page, name='home_page'),
    path('register/',register_page, name='register_page' ),
    path('login/', login_page, name='login_page'),
    path('profile/',profile_page,  name='profile_page'),
    path('logout/', logout_page, name='logout_page')
]
