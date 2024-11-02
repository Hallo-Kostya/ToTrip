from django.shortcuts import render,redirect
import requests
from UserApp import views
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
