from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from django.urls import path

schema_view = get_schema_view(
    openapi.Info(
        title="ToTrip API",
        default_version="v1",
        description="Документация Backend API для ToTrip",
        contact=openapi.Contact(email="av.sanya@yandex.ru"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    # Swagger (интерактивная документация)
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),

    # Redoc (альтернативная документация)
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]