from django.shortcuts import render,redirect
from .forms import CityForm
from .models import City
def cities_list(request):
    context={'cities_list':City.objects.all()}
    return render(request,"Search_For_Trip/cities_list.html",context)
def city_form(request):
    if (request.method=="GET"):
        form = CityForm()
        return render(request,"Search_For_Trip/city_form.html",{'form': form} )
    else:
        form = CityForm(request.POST)
        if form.is_valid():
            form.save()
        return redirect('/Trip/cities_list')
def city_delete(request):
    pass
def main_trip_page(request):
    return render(request, "Search_For_Trip/main_trip_page.html")
# Create your views here.
