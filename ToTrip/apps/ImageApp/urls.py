from django.urls import path, include
from .views import *
urlpatterns = [
    path('<int:id>/', ImageApiView.as_view(), name = "api_get_image"),
    path('delete/<int:id>/', ImageApiView.as_view(), name = "api_delete_image"),
    path('edit/<int:id>/', ImageApiView.as_view(), name = "api_edit_image")
]