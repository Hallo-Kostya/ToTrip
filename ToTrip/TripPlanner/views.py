from itertools import count

from django.shortcuts import render,redirect
import requests
from django.conf import settings
from Db_api.models import City, Place, Category,Country  # Импорт моделей из db_api
from Db_api.serializers import CitySerializer
from UserApp import views
from django.http import HttpResponse
from rest_framework.views import APIView


def main_trip_page(request):
    return render(request,"TripPlanner/MainPage.html")
def town_page(request):
    #if (request.method=="GET"):
        #form = CityForm()
        #return render(request,"Search_For_Trip/city_form.html",{'form': form} )
    #else:
        #form = CityForm(request.POST)
        #if form.is_valid():
            #form.save()
        #return redirect('/Trip/cities_list')
    return render(request, "TripPlanner/town-page.html")
def login_page(request):
    return views.login_page(request)
def register_page(request):
    return views.register_page(request)
def logout_page(request):
    return views.logout_page(request)
def profile_page(request):
    return views.profile_page(request)
# Create your views here.
class CitySearchView(APIView):
    def fetch_and_store_places(self, city, category):
        url = "https://api.foursquare.com/v3/places/search"
        headers = {
            "Authorization": f"{settings.FOURSQUARE_API_KEY}",

        }
        params = {
            "query": f'',
            "categories":str(category.code),
            "fields": "fsq_id,rating,name,location,closed_bucket",
            "near": f"{city.name}, Россия",
            "limit": 10,
            "sort":"POPULARITY"
        }
        print("URL:", url)
        print("Headers:", headers)
        print("Params:", params)
        country = Country.objects.get_or_create(name="Россия", code="RU")[0]
        response = requests.get(url, headers=headers, params=params)
        if response.status_code == 200:
            places_data = response.json().get("results", [])
            if not places_data:
                print(f"Нет мест для категории {category.name} в городе {city.name}")
            for place_data in places_data:
                avg_rating = place_data.get("rating")
                Place.objects.update_or_create(
                    fsq_id=place_data["fsq_id"],
                    name=place_data["name"],
                    category=category,
                    avg_rating=avg_rating,
                    city=city,
                    address=place_data["location"].get("formatted_address", ""),
                    country=country,
                )
    def get(self, request):

        city_name = request.GET.get('city')  # Получаем название города из запроса
        print(f'{city_name} ВЫЗВАН МЕТОД АФАФА')
        if not city_name:
            return HttpResponse("Введите название города", status=400)

        try:
            city = City.objects.get(name__iexact=city_name)
        except City.DoesNotExist:
            country = Country.objects.get_or_create(name="Россия",code="RU")[0]
            city = City.objects.create(name=city_name,country=country)

            # Получаем все категории из базы данных и добавляем места для каждой категории
            categories = Category.objects.all()
            for category in categories:
                self.fetch_and_store_places(city, category)

        # Получаем все места, связанные с этим городом, отсортированные по категориям
        places_by_category = {}
        for category in Category.objects.all():
            places = Place.objects.filter(city=city, category=category)
            places_by_category[category.name] = places
            print(category,places)

        # Передаем город и места по категориям в шаблон
        return render(request, 'TripPlanner/town-page.html', {
            'city': city,
            'places_by_category': places_by_category
        })

