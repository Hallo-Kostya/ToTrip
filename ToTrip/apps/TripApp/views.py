from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import TripSerializer, SubTripSerializer, SubtripPlaceSerializer, CreateTripSerializer
from rest_framework.response import Response
from rest_framework import status
from apps.TripApp.models import Trip, SubTrip, SubtripPlace
from apps.PlaceApp.models import Place
from apps.UsersApp.models import User
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import AnonymousUser

class TripListApiView(APIView):
    def get(self,request, user_id = None):
        if user_id == None:
            user = request.user
            if user.is_authenticated:
                trips = Trip.objects.filter(trippers = user.id)
            else:
                return Response({"message": "У вас нет своего профиля! Авторизуйтесь сперва."}, status= status.HTTP_204_NO_CONTENT)
        else:
            trips = Trip.objects.filter(trippers__id = user_id)
        if trips:
            trips_data = TripSerializer(trips, many = True).data
            return Response({"trips": trips_data},
                status=status.HTTP_200_OK)
        else:
            return Response({"message": "Нет поездок для данного пользователя!"},
                status=status.HTTP_204_NO_CONTENT)


class CreateTripAPIView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        tripSerializer = CreateTripSerializer(data = request.data)
        if tripSerializer.is_valid():
            tripSerializer.save()
            return Response({"trip": tripSerializer.data},
                status=status.HTTP_201_CREATED)
        else:
            return Response(tripSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class DeleteTripApiView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, trip_id):
        try:
            trip_to_delete = Trip.objects.get(id=trip_id)
            user = request.user
            if len(trip_to_delete.trippers)>1:
                trip_to_delete.trippers.remove(user)
                trip_to_delete.save()
            else:
                if trip_to_delete.delete():
                    return Response({'status': 'Поездка удалена'}, status=status.HTTP_200_OK)
        except Trip.DoesNotExist:
            return Response({"error": "Данная поездка не найдена"}, status=status.HTTP_404_NOT_FOUND)


class CreateSubtripApiView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        subtripSerializer = SubTripSerializer(data = request.data)
        if subtripSerializer.is_valid():
            subtripSerializer.save()
            return Response({"subtrip": subtripSerializer.data},
                status=status.HTTP_201_CREATED)
        else:
            return Response(subtripSerializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TripDetailApiView(APIView):
    def get(self, request, trip_id):
        try:
            trip = Trip.objects.get(id = trip_id)
            serializer = TripSerializer(trip)
            return Response({"trip": serializer.data}, status=status.HTTP_200_OK)
        except Trip.DoesNotExist:
            return Response({"error": "данной поездки не сушествует"}, status=status.HTTP_404_NOT_FOUND)
        
class DeleteSubtripApiView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, subtrip_id):
        try:
            subtrip_to_delete = SubTrip.objects.get(id=subtrip_id)
            if subtrip_to_delete.delete():
                return Response({'status': 'день поездки удален'}, status=status.HTTP_200_OK)
        except SubTrip.DoesNotExist:
            return Response({"error": "день поездки не найден"}, status=status.HTTP_404_NOT_FOUND)
        
class AddPlaceToSubtripApiView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request, subtrip_id):
        try:
            subtrip = SubTrip.objects.get(id=subtrip_id)
            place_id = request.data.get('place_id')
            place = Place.objects.get(id=place_id)
            if not place_id:
                return Response({'error': 'не передан Id места'}, status=status.HTTP_400_BAD_REQUEST)
            if not place:
                return Response({'error': 'указан некорректный Id места'}, status=status.HTTP_400_BAD_REQUEST)
            if SubtripPlace.objects.filter(subtrip=subtrip, place=place).exists():
                return Response({"error": "Место уже добавлено"}, status=status.HTTP_400_BAD_REQUEST)
            SubtripPlace.objects.create(subtrip=subtrip, place=place)
            return Response({'status': 'место успешно добавлено'}, status=status.HTTP_200_OK)
        except SubTrip.DoesNotExist:
            return Response({"error": "день поездки не найден"}, status=status.HTTP_404_NOT_FOUND)
    
class DeleteSubtripPlaceApiView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, subtripplace_id):
        try:
            place = SubtripPlace.objects.get(id = subtripplace_id)
            if not place:
                return Response({"error": "Место не добавлено в данный день поездки"}, status=status.HTTP_400_BAD_REQUEST)
            if place.delete():
                return Response({'status': 'место успешно удалено из дня поездки'}, status=status.HTTP_200_OK)
        except SubtripPlace.DoesNotExist:
            return Response({"error": "Данного места в этот день не найдено"}, status=status.HTTP_404_NOT_FOUND)