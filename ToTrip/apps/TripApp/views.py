from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import TripSerializer, SubTripSerializer, SubtripReviewPlaceSerializer, CreateTripSerializer
from rest_framework.response import Response
from rest_framework import status
from apps.TripApp.models import Trip 
from apps.UsersApp.models import User
from rest_framework.permissions import IsAuthenticated

class TripListApiView(APIView):
    def get(self,request, user_id = None):
        if user_id == None:
            [IsAuthenticated]
            user = request.user
            trips = Trip.objects.filter(trippers = user)
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
            if trip_to_delete.delete():
                return Response({'status': 'Поездка удалена'}, status=status.HTTP_200_OK)
        except Trip.DoesNotExist:
            return Response({"error": "Данная поездка не найдена"}, status=status.HTTP_404_NOT_FOUND)
