from django.contrib import admin
from .models import City, Place, RoutePoint, Route

admin.site.register(City)
admin.site.register(Place)
admin.site.register(RoutePoint)
admin.site.register(Route)
# Register your models here.
