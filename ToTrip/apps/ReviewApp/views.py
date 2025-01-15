from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializers import ReviewSerializer,EditReviewSerializer
from apps.ImageApp.models import ReviewImage
from rest_framework.response import Response
from rest_framework import status
from apps.ReviewApp.models import Review

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

class ReviewApiView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, review_id):
        user = request.user
        try:
            review = Review.objects.get(id=review_id)
            if user == review.author:
                review.delete()
                return Response({"message": "отзыв успешно удалён"}, status=status.HTTP_200_OK)
            else:
                return Response({"error": "удалять отзыв может только автор или модератор!"}, status=status.HTTP_403_FORBIDDEN)
        except Review.DoesNotExist:
            return Response({"error": "данного отзыва не существует!"}, status=status.HTTP_404_NOT_FOUND)
        
    def get(self,request, review_id):
        try:
            review = Review.objects.get(id=review_id)
            serializer = ReviewSerializer(review)
            return Response({"review": serializer.data}, status = status.HTTP_200_OK)
        except Review.DoesNotExist:
            return Response({"review": serializer.data}, status = status.HTTP_404_NOT_FOUND)

    def patch(self, request, review_id):
        try:
            review = Review.objects.get(id=review_id)
            serializer = EditReviewSerializer(review, data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data, status = status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status = status.HTTP_418_IM_A_TEAPOT)
        except Review.DoesNotExist:
            return Response({"error": "данного отзыва нет в базе данных!"}, status = status.HTTP_404_NOT_FOUND)