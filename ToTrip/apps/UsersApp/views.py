from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User
from apps.PlaceApp.models import Place
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from apps.PlaceApp.models import FavoritePlace
from .renderers import UserJSONRenderer
from rest_framework.exceptions import NotFound
from rest_framework_simplejwt.tokens import RefreshToken


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    refresh.payload.update({

        'user_id': user.id,

        'username': user.username

    })
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


class RegisterView(APIView):
    renderer_classes = (UserJSONRenderer,)
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):   
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token
            return Response({
                "refresh": str(refresh),
                "access": str(access),
                "user": {
                    "email": user.email,
                    "username": user.username,
                    "first_name": user.first_name,
                    "last_name": user.lastname
                }},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        refresh_token = request.data.get('refresh_token') # С клиента нужно отправить refresh token
        if not refresh_token:
            return Response({'error': 'Необходим Refresh token'},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            token = RefreshToken(refresh_token)
            token.blacklist() # Добавить его в чёрный список
        except Exception as e:
            return Response({'error': 'Неверный Refresh token'},
                            status=status.HTTP_400_BAD_REQUEST)
        return Response({'success': 'Выход успешен'}, status=status.HTTP_200_OK)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            token = get_tokens_for_user(user)
            return Response(token, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    def get(self, request, user_id=None):
        # Если user_id не передан, используем профиль текущего пользователя
        if user_id is None:
            # Требуется авторизация
            self.check_permissions(request)
            user = request.user
        else:
            # Разрешаем доступ без авторизации
            try:
                user = User.objects.get(pk=user_id)
            except User.DoesNotExist:
                raise NotFound("Пользователь с таким ID не найден")
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def get_permissions(self):
        # Если user_id не указан, разрешаем доступ только авторизованным пользователям
        if self.kwargs.get('user_id') is None:
            return [IsAuthenticated()]
        # Если user_id указан, доступ открыт всем
        return [AllowAny()]


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