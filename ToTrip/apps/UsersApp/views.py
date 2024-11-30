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
    """функция для получения access(15 мин.) и refresh(365 дней) токенов для пользователя"""
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
    """класс для регистрации пользователя, возвращает access(15 мин.) и refresh(365 дней, но оба обновляются при запросе с фронтенда) 
    токены после регистрации"""
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
    """класс для выхода из системы, с фронтенда должен быть отправлен refresh token для его дальнейшего добавления в 
    черный список, чтобы в случае его кражи, взломщик не смог получить новые токены по старому refresh токену."""
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
    """класс для авторизации пользователя, после подтверждения сериализатора отправляет токены"""
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            token = get_tokens_for_user(user)
            return Response(token, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    """класс, отправляющий свой либо чужой профиль на фронтенд"""
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
        """метод для проверки авторизации и установления дальнейшего уровня доступа в зависимости от него"""
        # Если user_id не указан, разрешаем доступ только авторизованным пользователям
        if self.kwargs.get('user_id') is None:
            return [IsAuthenticated()]
        # Если user_id указан, доступ открыт всем
        return [AllowAny()]


class AddToFavoritesView(APIView):
    """класс для добавления места в "избранные места" пользователя"""
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
    """класс для подписки на другого пользователя"""
    permission_classes = [IsAuthenticated]

    def post(self, request, user_id):
        """подписаться от пользователя"""
        try:
            user_to_follow = User.objects.get(id=user_id)
            request.user.following.add(user_to_follow)
            return Response({'status': 'Подписка оформлена'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({'error': 'Данный пользователь не найден'}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, user_id):
        """отписаться от пользователя"""
        try:
            user_to_unfollow = User.objects.get(id=user_id)
            request.user.following.remove(user_to_unfollow)
            return Response({'status': 'Подписка отменена'}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "Данный пользователь не найден"}, status=status.HTTP_404_NOT_FOUND)