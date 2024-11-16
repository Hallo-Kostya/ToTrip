from ..serializers import PlaceSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Place


class PlaceDetailAPIView(APIView):
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