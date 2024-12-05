from django.urls import path,include
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register_api'),
    path('login/', TokenObtainPairView.as_view(), name='login_api'),
    path('logout/', LogoutView.as_view(), name='login_api'),
    path('profile/', UserProfileView.as_view(), name='self_profile_api'),
    path('profile/edit/', EditUserView.as_view(), name = 'edituser_api'),
    path('profile/<int:user_id>/', UserProfileView.as_view(), name='profile_api'),
    path('<int:user_id>/follow/', FollowUserView.as_view(), name = 'follow_user'),
    path('<int:user_id>/unfollow/', FollowUserView.as_view(), name = 'unfollow_user'),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
