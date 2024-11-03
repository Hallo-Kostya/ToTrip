from django import forms
from .models import City, Place, Route, RoutePoint

class CityForm(forms.ModelForm):
    class Meta:
        model = City
        fields = ['name', 'country','region']

class PlaceForm(forms.ModelForm):
    class Meta:
        model = Place
        fields = ['name', 'category', 'description', 'city']

class RouteForm(forms.ModelForm):
    class Meta:
        model = Route
        fields = ['name']

class RoutePointForm(forms.ModelForm):
    class Meta:
        model = RoutePoint
        fields = ['name', 'latitude', 'longitude', 'order']