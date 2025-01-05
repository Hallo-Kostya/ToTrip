from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import ReviewSerializer
from apps.ImageApp.models import ReviewImage
from rest_framework.response import Response
from rest_framework import status


# Create your views here.
class AddReviewApiView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = ReviewSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            user = request.user
            review = serializer.save()
            uploaded_images = request.FILES.getlist('reviewimage_set')
            for image in uploaded_images:
                ReviewImage.objects.create(review=review, image=image, author = user)
            return Response({"review": serializer.data}, status=status.HTTP_200_OK)
        return Response({"error": serializer.errors}, status= status.HTTP_406_NOT_ACCEPTABLE)
    