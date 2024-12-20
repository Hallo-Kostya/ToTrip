from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Review, Place
from .serializers import ReviewSerializer

class ReviewListCreateView(APIView):
    def get(self, request, place_id):
        try:
            place = get_object_or_404(Place, id=place_id)
            reviews = Review.objects.filter(place_id=place_id)
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Place.DoesNotExist:
            return Response({"error": "Place not found"}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, place_id):
        try:
            Place.objects.get(id=place_id)  # Ensure the place exists
        except Place.DoesNotExist:
            return Response({"error": "Place not found"}, status=status.HTTP_404_NOT_FOUND)

        data = request.data
        data['place'] = place_id  # Add place_id to the review data
        serializer = ReviewSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
