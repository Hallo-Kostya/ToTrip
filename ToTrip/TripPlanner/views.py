from django.shortcuts import render, redirect, get_object_or_404
from .forms import CityForm, PlaceForm, RouteForm, RoutePointForm
from .models import City,Place, Review, Route, RoutePoint
from django.db.models import Avg
from .serializers import RouteSerializer, RoutePointSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response

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
            return redirect('TripPlanner/route_detail', route_id=route.id)
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
