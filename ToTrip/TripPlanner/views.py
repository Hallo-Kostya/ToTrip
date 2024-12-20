from django.shortcuts import render, redirect, get_object_or_404
from .forms import CityForm, PlaceForm, RouteForm, RoutePointForm
from .models import City,Place, Review, Route, RoutePoint
from django.db.models import Avg
from .serializers import RouteSerializer, RoutePointSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from itertools import count
from django.core.files.base import ContentFile
from django.shortcuts import render,redirect
import requests
from django.conf import settings
from UserApp import views
from django.http import HttpResponse
from rest_framework.views import APIView


# Добавление нового города
def add_city(request):
    if request.method == 'POST':
        form = CityForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('city_list')  # Перенаправить на список городов
    else:
        form = CityForm()
    return render(request, 'TripPlanner/add_city.html', {'form':form})
def city_list(request):
    cities = City.objects.all()  # Получаем все города
    return render(request, 'TripPlanner/city_list.html', {'cities': cities})
def place_list(request):
    places = Place.objects.all().annotate(average_rating=Avg('reviews__rating'))
    return render(request, 'TripPlanner/place_list.html', {'places': places})
def city_detail(request, city_id):
    city = get_object_or_404(City, id=city_id)
    places = city.places.all()  # Получаем все места, связанные с городом
    return render(request, 'TripPlanner/town-page.html', {'city': city, 'places': places})
def add_place(request):
    if request.method == 'POST':
        form = PlaceForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('place_list')  # Перенаправить на список мест
    else:
        form = PlaceForm()
    return render(request, 'TripPlanner/add_place.html', {'form': form})
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
    places = Place.objects.all().annotate(average_rating=Avg('reviews__rating'))
    return render(request, "TripPlanner/town-page.html", {'places': places})



def place_reviews(request, place_id):
    place = get_object_or_404(Place, id=place_id)
    reviews = Review.objects.filter(place=place)

    context = {
        'place': place,
        'reviews': reviews,
    }
    return render(request, 'TripPlanner/place_reviews.html', context)

def submit_review(request, place_id):
    place = get_object_or_404(Place, id=place_id)  # место, к которому будет привязан отзыв
    if request.method == 'POST':
        rating = request.POST.get('rating')  # оценка пользователя
        text = request.POST.get('text')      # текст отзыва
        Review.objects.create(place=place, rating=rating, text=text)  # Создаем новый отзыв в базе данных
        return redirect('place_detail', place_id=place_id)  # После отправки отзыва перенаправляем на страницу места
    return render(request, 'TripPlanner/submit_review.html', {'place': place})

class RouteViewSet(viewsets.ModelViewSet):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer

class RoutePointViewSet(viewsets.ModelViewSet):
    queryset = RoutePoint.objects.all()
    serializer_class = RoutePointSerializer

    def create(self, request, *args, **kwargs):
        route_id = request.data.get('route')
        route = Route.objects.get(id=route_id)
        order = request.data.get('order')

        # Проверяем, есть ли уже точка с таким порядком в этом маршруте
        if RoutePoint.objects.filter(route=route, order=order).exists():
            return Response(
                {'error': 'A point with this order already exists in this route.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        return super().create(request, *args, **kwargs)

def route_list(request):
    routes = Route.objects.all()
    return render(request, 'TripPlanner/route_list.html', {'routes': routes})

def route_detail(request, route_id):
    route = get_object_or_404(Route, id=route_id)
    points = route.points.all()
    return render(request, 'TripPlanner/route_detail.html', {'route': route, 'points': points})

def add_route(request):
    if request.method == 'POST':
        form = RouteForm(request.POST)
        if form.is_valid():
            route = form.save()
            return redirect('TripPlanner/route_detail', route_id=route.id)
    else:
        form = RouteForm()
    return render(request, 'TripPlanner/add_route.html', {'form': form})

def add_route_point(request, route_id):
    route = get_object_or_404(Route, id=route_id)
    if request.method == 'POST':
        form = RoutePointForm(request.POST)
        if form.is_valid():
            point = form.save(commit=False)
            point.route = route
            point.save()
            return redirect('TripPlanne r/route_detail', route_id=route.id)
    else:
        form = RoutePointForm()
    return render(request, 'TripPlanner/add_route_point.html', {'form': form, 'route': route})


def login_page(request):
    return views.login_page(request)
def register_page(request):
    return views.register_page(request)
def logout_page(request):
    return views.logout_page(request)
def profile_page(request):
    return views.profile_page(request)
# Create your views here.
# class CitySearchView(APIView):
#     def save_image_to_db(self,place, image_url):
#         response = requests.get(image_url)
#         if response.status_code == 200:
#             image_name = image_url.split("/")[-1]
#             place_image = PlaceImage(
#                 place=place
#             )
#             place_image.image.save(image_name, ContentFile(response.content), save=True)
#             print(f"Image saved: {place_image.image.path}")

#     def fetch_and_store_places(self, city, category):
#         url = "https://api.foursquare.com/v3/places/search"
#         headers = {
#             "Authorization": f"{settings.FOURSQUARE_API_KEY}",

#         }
#         params = {
#             "query": f'',
#             "categories":str(category.code),
#             "fields": "fsq_id,rating,name,location,closed_bucket,photos",
#             "near": f"{city.name}, Россия",
#             "limit": 3,
#             "sort":"Rating"
#         }
#         print("URL:", url)
#         print("Headers:", headers)
#         print("Params:", params)
#         country = Country.objects.get_or_create(name="Россия", code="RU")[0]
#         response = requests.get(url, headers=headers, params=params)
#         if response.status_code == 200:
#             places_data = response.json().get("results", [])
#             if not places_data:
#                 print(f"Нет мест для категории {category.name} в городе {city.name}")
#             for place_data in places_data:
#                 avg_rating = place_data.get("rating")
#                 prefix = place_data["photos"][0]["prefix"] if "photos" in place_data and place_data["photos"] else ""
#                 suffix = place_data["photos"][0]["suffix"] if "photos" in place_data and place_data["photos"] else ""
#                 # Полный URL изображения
#                 if prefix and suffix:
#                     image_url = f"{prefix}original{suffix}"
#                 place, created = Place.objects.update_or_create(
#                     fsq_id=place_data["fsq_id"], 
#                     defaults={
#                         "name": place_data["name"],
#                         "category": category,
#                         "avg_rating": avg_rating,
#                         "city": city,
#                         "address": place_data["location"].get("formatted_address", ""),
#                         "country": country,
#                     }
#                 )
#                 self.save_image_to_db(place, image_url)


#     def get(self, request):
#         city_name = request.GET.get('city')  # Получаем название города из запроса
#         category_name=request.GET.get('category')
#         print(f'{city_name}, {category_name} ВЫЗВАН МЕТОД АФАФА')
#         if not city_name:
#             return HttpResponse("Введите название города", status=400)

#         try:
#             city = City.objects.get(name__iexact=city_name)
#         except City.DoesNotExist:
#             country = Country.objects.get_or_create(name="Россия",code="RU")[0]
#             city = City.objects.create(name=city_name,country=country)
#         try:
#             # Получаем все категории из базы данных и добавляем места для каждой категории
#             category= Category.objects.get(name__iexact=category_name)
#             self.fetch_and_store_places(city,category)
#             places = Place.objects.filter(city=city, category=category)
#             print(category,places)
#         except Category.DoesNotExist:
#             return HttpResponse("Данной категории не существует", status=400)

#         # Получаем все места, связанные с этим городом, отсортированные по категориям
       

#         # Передаем город и места по категориям в шаблон
#         return render(request, 'TripPlanner/town-page.html', {
#             'city': city,
#             'places': places
#         })

