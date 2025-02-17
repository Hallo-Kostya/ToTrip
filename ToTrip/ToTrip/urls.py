"""
URL configuration for ToTrip project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static
from .yasg import urlpatterns as documentation_urls

urlpatterns = [
    path('api/v1/admin/', admin.site.urls),
    path('api/v1/users/', include('apps.UsersApp.urls')),
    path('api/v1/search/', include('apps.SearchApp.urls')),
    path('api/v1/reviews/', include('apps.ReviewApp.urls')),
    path('api/v1/posts/', include('apps.PostApp.urls')),
    path('api/v1/trips/', include('apps.TripApp.urls')),
    path('api/v1/images/', include('apps.ImageApp.urls')),
    path('api/v1/places/', include('apps.PlaceApp.urls'))
]  + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + documentation_urls
 