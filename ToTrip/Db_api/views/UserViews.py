from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from ..models import  City, Place, Category, FavoritePlace, User
from rest_framework_simplejwt.tokens import RefreshToken
from ..serializers import RegisterSerializer, LoginSerializer, UserSerializer, CitySerializer, PlaceSerializer
from django.shortcuts import render, redirect
import requests

from ToTrip import settings


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    def post(self, request):
        request.session.pop('access', None)
        request.session.pop('refresh', None)
        return Response({"message": "вы вышли из аккаунта."}, status=status.HTTP_200_OK)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            token = get_tokens_for_user(user)
            return Response(token, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddToFavoritesView(APIView):
    def post(self, request, place_id):
        user = request.user
        try:
            place = Place.objects.get(id=place_id)
            favorite, created = FavoritePlace.objects.get_or_create(user=user, place=place)
            if created:
                return Response({"message": "Место добавлено в избранное."}, status=status.HTTP_201_CREATED)
            return Response({"message": "Место уже в избранном."}, status=status.HTTP_200_OK)
        except Place.DoesNotExist:
            return Response({"error": "Место не найдено."}, status=status.HTTP_404_NOT_FOUND)


class FollowUserView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        try:
            user_to_follow = User.objects.get(id=user_id)
            request.user.following.add(user_to_follow)
            return Response({'status': 'Подписка оформлена'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'Данный пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, user_id):
        try:
            user_to_unfollow = User.objects.get(id=user_id)
            request.user.following.remove(user_to_unfollow)
            return Response({'status': 'Подписка отменена'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "Данный пользователь не найден"}, status=status.HTTP_404_NOT_FOUND)