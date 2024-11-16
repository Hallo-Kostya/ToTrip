from django.urls import path,include
from .views.UserViews import RegisterView, LoginView, UserProfileView, FollowUserView, LogoutView
from .views.PlaceViews import PlaceDetailAPIView
from .views.SearchView import SearchPlacesAPIView

urlpatterns = [
    path('users/register/', RegisterView.as_view(), name='register_api'),
    path('users/login/', LoginView.as_view(), name='login_api'),
    path('users/logout/', LogoutView.as_view(), name='login_api'),
    path('users/profile/', UserProfileView.as_view(), name='profile_api'),
    path('users/<int:user_id>/follow/', FollowUserView.as_view(), name = 'follow_user'),
    path('users/<int:user_id>/unfollow/', FollowUserView.as_view(), name = 'unfollow_user'),
    path('place/<int:pk>/', PlaceDetailAPIView.as_view(), name='place-detail'),
    path('search/', SearchPlacesAPIView.as_view(), name='search_api')
]
