from django.urls import path,include
from .views import RegisterView, LoginView, UserProfileView

urlpatterns = [
    path('users/register/', RegisterView.as_view(), name='register_api'),
    path('users/login/', LoginView.as_view(), name='login_api'),
    path('users/profile/', UserProfileView.as_view(), name='profile_api')
]