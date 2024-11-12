from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'routes', views.RouteViewSet)
router.register(r'points', views.RoutePointViewSet)

urlpatterns = [
    path('', views.main_trip_page, name='home_page'),
    path('add_city/', views.add_city, name='add_city'),
    path('town_page/', views.town_page, name='town_page'),
    path('cities/', views.city_list, name='city_list'),
    path('places/', views.place_list, name='place_list'),
    path('place/add/', views.add_place, name='add_place'),
    path('city/<int:city_id>/', views.city_detail, name='city_detail'),
    path('place/<int:place_id>/reviews/', views.place_reviews, name='place_reviews'),
    path('place/<int:place_id>/review/', views.submit_review, name='submit_review'),
    path('routes/', views.route_list, name='route_list'),
    path('routes/add/', views.add_route, name='add_route'),
    path('routes/<int:route_id>/', views.route_detail, name='route_detail'),
    path('routes/<int:route_id>/add_point/', views.add_route_point, name='add_route_point'),
    path('profile/',views.profile_page, name='profile_page'),
    path('logout/', views.logout_page, name='logout_page'),
    path('register/', views.register_page, name='register_page'),
    path('login/', views.login_page, name='login_page'),
    path('search/', views.CitySearchView.as_view(), name='search_city')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)