from django.shortcuts import render,redirect
from django.shortcuts import get_object_or_404
from .forms import CityForm, PlaceForm
from .models import City,Place, Review
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
    places = Place.objects.all()  # Получаем все города
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
    if request.method == 'POST':  # Когда пользователь отправляет запрос
        city_name = request.POST.get('query')
        print(f'Ищем город: {city_name}')
        try:
            cities = City.objects.filter(name__iexact=city_name)
            if cities.exists():
                city = cities.first()  # Получаем первый город из набора
                return redirect('city_detail', city_id=city.pk)
# Перенаправляем на страницу города
        except City.DoesNotExist:
            return render(request, 'MainPage.html', {'error': 'Город не найден'})
    return render(request, 'TripPlanner/MainPage.html')

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


def place_reviews(request, place_id):
    place = get_object_or_404(Place, id=place_id)
    reviews = Review.objects.filter(place=place)

    context = {
        'place': place,
        'reviews': reviews,
    }
    return render(request, 'place_reviews.html', context)

def submit_review(request, place_id):
    place = get_object_or_404(Place, id=place_id)  # место, к которому будет привязан отзыв
    if request.method == 'POST':
        rating = request.POST.get('rating')  # оценка пользователя
        text = request.POST.get('text')      # текст отзыва
        Review.objects.create(place=place, rating=rating, text=text)  # Создаем новый отзыв в базе данных
        return redirect('place_detail', place_id=place_id)  # После отправки отзыва перенаправляем на страницу места
    return render(request, 'TripPlanner/submit_review.html', {'place': place})



# Create your views here.
