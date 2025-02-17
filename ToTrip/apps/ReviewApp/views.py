from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from apps.UsersApp.permissions import OwnerOrModeratorOrReadonly, IsModerator
from .serializers import ReviewSerializer, EditReviewSerializer
from apps.ImageApp.models import BaseImage
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
                BaseImage.objects.create(model_name = "Review", model_id = review.id, image=image, author = user)
            return Response({"review": serializer.data}, status=status.HTTP_200_OK)
        return Response({"error": serializer.errors}, status= status.HTTP_406_NOT_ACCEPTABLE)

class ReviewApiView(APIView):
    permission_classes = [OwnerOrModeratorOrReadonly]
    def delete(self, request, review_id):
        review = get_object_or_404(Review, pk =review_id)
        review.delete()
        return Response({"message": "отзыв успешно удалён"}, status=status.HTTP_200_OK)
        
    def get(self,request, review_id):
        review = get_object_or_404(Review, pk = review_id)
        serializer = ReviewSerializer(review)
        return Response({"review": serializer.data}, status = status.HTTP_200_OK)

    def patch(self, request, review_id):
        review = get_object_or_404(Review, pk = review_id)
        serializer = EditReviewSerializer(review, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)