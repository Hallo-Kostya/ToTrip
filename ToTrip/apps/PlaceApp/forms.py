from django import forms
from .models import Place

class MultipleFileInput(forms.ClearableFileInput):
    allow_multiple_selected = True  # Поддержка мультизагрузки


class MultipleFileField(forms.FileField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault('widget', MultipleFileInput(attrs={'multiple': True}))
        super().__init__(*args, **kwargs)

    def clean(self, data, initial=None):
        single_file_clean = super().clean
        if isinstance(data, (list, tuple)):
            return [single_file_clean(d, initial) for d in data]
        return single_file_clean(data, initial)


class PlaceForm(forms.ModelForm):
    images = MultipleFileField(label='Загрузить фотографии', required=True)

    class Meta:
        model = Place
        fields = ['name', 'address', 'categories', 'description', 'city', 'longitude', 'latitude', 'working_hours', ]
        widgets = {
            'categories': forms.CheckboxSelectMultiple()
        }