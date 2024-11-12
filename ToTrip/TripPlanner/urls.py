from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings
from . import views
urlpatterns = [
    path('', views.main_trip_page, name='home_page'),
    path('town_page/', views.town_page, name='town_page'),
    path('profile/',views.profile_page, name='profile_page'),
    path('logout/', views.logout_page, name='logout_page'),
    path('register/', views.register_page, name='register_page'),
    path('login/', views.login_page, name='login_page'),
    path('search/', views.CitySearchView.as_view(), name='search_city')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)