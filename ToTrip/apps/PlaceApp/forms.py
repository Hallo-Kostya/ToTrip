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
    services = forms.CharField(
        widget=forms.TextInput(attrs={
            'class': 'service-input',
            'placeholder': 'Здесь отображаются услуги'
        }),
        required=False
    )
    class Meta:
        model = Place
        fields = ['name', 'address', 'categories', 'description', 'city',   ]
        widgets = {
            'categories': forms.CheckboxSelectMultiple(),
        }

    def clean_services(self):
        services = self.data.getlist('services')  # Получаем все теги из POST-запроса
        return [service.strip() for service in services if service.strip()]
    
    def save(self, commit=True):
        # Сначала сохраняем сам объект места
        place = super().save(commit=False)
        services = self.cleaned_data.get('services', [])
        categories = self.cleaned_data.get('categories', [])

        # Сохраняем услуги в объекте Place
        place.services = services
        if commit:
            place.save()
            self.save_m2m()
        return place