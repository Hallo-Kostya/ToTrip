from .serializers import PlaceSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Place, FavoritePlace
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import redirect, render
from django.http import JsonResponse
from .models import Place
from apps.ImageApp.models import PlaceImage
from .forms import PlaceForm
from django.views import View
from django.db import transaction
from apps.PlaceApp.models import City, Category

class FavoritesView(APIView):
    """
    класс для добавления\удаления места в\из "избранные места" пользователя
    Имеются методы:
    get - для получения списка избранных мест пользователя (для этого не нужно добавлять ничего к url);
    post - для добавления места в список избранных (для этого нужно передать id места в url);
    delete - для удаления места из списка избранных (также нужно передать id места);
    """
    permission_classes = [IsAuthenticated]
    def get(self,request):
        user = request.user
        favorite_places  = FavoritePlace.objects.filter(user = user).select_related("place")
        favorite_places_data = []
        if not favorite_places:
            return Response({"message": "Избранных мест не найдено"}, status = status.HTTP_204_NO_CONTENT)
        for favorite in favorite_places:
            place_data = PlaceSerializer(favorite.place).data
            favorite_places_data.append(place_data)
        return Response({"favorite_places": favorite_places_data}, status = status.HTTP_200_OK)   

    def post(self, request, place_id):
        user = request.user
        try:
            place = Place.objects.get(id=place_id)
            favorite, created = FavoritePlace.objects.get_or_create(user=user, place=place)
            if created:
                return Response({"message": "Место добавлено в избранное."}, status=status.HTTP_201_CREATED)
            return Response({"message": "Место уже в избранном."}, status=status.HTTP_200_OK)
        except Place.DoesNotExist:
            return Response({"error": "Место не найдено."}, status=status.HTTP_204_NO_CONTENT)
        
    def delete(self, request, place_id):
        curr_user = request.user
        try:
            curr_place = Place.objects.get(id=place_id)
            object_to_delete, deleted = FavoritePlace.objects.filter(user = curr_user, place = curr_place).delete()
            if deleted:
                return Response({"message": "Место удалено из избранного."}, status=status.HTTP_201_CREATED)
            return Response({"message": "Места нет в избранном"}, status=status.HTTP_200_OK)
        except Place.DoesNotExist:
            return Response({"error": "Место не найдено."}, status=status.HTTP_404_NOT_FOUND)
        

class AllPlacesIds(APIView):
    """Возвращает id всех мест в бд"""
    def get(self, request):
        places_ids= list(Place.objects.values_list("id", flat=True).distinct())
        if places_ids:
            return Response({"places_ids": places_ids}, status=status.HTTP_200_OK)
        else: 
            return Response({"error": "не найдено мест в базе"}, status=status.HTTP_204_NO_CONTENT)
        
        
class PlaceDetailAPIView(APIView):
    """Класс для получения детальной информации о конкретном объекте"""
    def get(self, request, pk):
        try:
            place = Place.objects.get(pk=pk)
            serializer = PlaceSerializer(place)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Place.DoesNotExist:
            return Response(
                {"error": "Данное место не найдено"}, 
                status=status.HTTP_404_NOT_FOUND
                )
        

def create_place(request):
    if request.method == 'POST':
        form = PlaceForm(request.POST, request.FILES)
        if form.is_valid():
            place = form.save()
            # Обработка загруженных изображений
            files = request.FILES.getlist('images')
            for file in files:
                PlaceImage.objects.create(place=place, image=file)
            return redirect('place_list')  # Перенаправление на список мест
    else:
        form = PlaceForm()
    return render(request, 'add_place_form.html', {'form': form})