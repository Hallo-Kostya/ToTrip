from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response 
from rest_framework import status
from apps.PlaceApp.serializers import PlaceSerializer
from apps.PlaceApp.models import Place


class AddPlaceApiView(APIView):
    """Метод для загрузки места из формы модератором"""
    permission_classes = [IsAdminUser]
    def post(self, request):
        serializer = PlaceSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "место успешно создано"}, status=status.HTTP_201_CREATED)
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class DeletePlaceApiView(APIView):
    """Метод для удаления мест"""
    permission_classes = [IsAdminUser]
    def delete(self, request, place_id):
        try:
            place = Place.objects.get(id=place_id)
            place.delete()
            return Response({"message": "место успешно удалено"}, status=status.HTTP_200_OK)
        except Place.DoesNotExist:
            return Response({"error": "места нет в базе данных!"}, status=status.HTTP_400_BAD_REQUEST)