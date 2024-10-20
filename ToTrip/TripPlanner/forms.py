from django import forms
from .models import City, Place

class CityForm(forms.ModelForm):
    class Meta:
        model = City
        fields = ['name', 'country','region']

class PlaceForm(forms.ModelForm):
    class Meta:
        model = Place
        fields = ['name', 'category', 'description', 'city']