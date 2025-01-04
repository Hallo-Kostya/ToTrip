from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from apps.PostApp.serializers import PostSerializer
from rest_framework.response import Response
from rest_framework import status


class AddPostView(ApiView):
    """
    Класс принимающий только request, создающий статью (текст и фото), привязанную к конкретному пользователю.
    По задумке им могут пользоваться только пользователи с ролью - модератор.
    """
    permission_classes = [IsAuthenticated]
    def post(self, request):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):   
            post = serializer.save()
            response_data = PostSerializer(post).data
            return Response(response_data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
