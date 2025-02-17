from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User
from apps.PlaceApp.models import Place
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, UserEditSerializer
from apps.PlaceApp.models import FavoritePlace
from .renderers import UserJSONRenderer
from rest_framework.exceptions import NotFound
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate


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
    """класс для регистрации пользователя, принимающий username, password, last_name, email, first_name как обязательные параметры"""
    renderer_classes = [UserJSONRenderer]
    def post(self, request):
        if request.user.is_authenticated:
            return Response({"error": "Вы уже авторизованы"},
                status=status.HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS)
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):   
            serializer.save()
            return Response({"user": serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    """класс для выхода из системы, с фронтенда должен быть отправлен refresh token для его дальнейшего добавления в 
    черный список, чтобы в случае его кражи, взломщик не смог получить новые токены по старому refresh токену."""
    permission_classes = [IsAuthenticated]
    def post(self, request):
        refresh_token = request.data.get('refresh') # С клиента нужно отправить refresh token
        if not refresh_token:
            return Response({'error': 'Необходим Refresh token'},
                            status=status.HTTP_400_BAD_REQUEST)
        try:
            token = RefreshToken(refresh_token)
            token.blacklist() # Добавляем токен в чёрный список
        except Exception as e:
            return Response({'error': 'Неверный Refresh token'},
                            status=status.HTTP_400_BAD_REQUEST)
        return Response({'success': 'Выход успешен'}, status=status.HTTP_200_OK)


class LoginView(APIView):
    """класс для авторизации пользователя, после подтверждения сериализатора отправляет токены"""
    def post(self, request):
        if request.user.is_authenticated:
            return Response({"error":"Вы уже авторизованы"},
                status=status.HTTP_451_UNAVAILABLE_FOR_LEGAL_REASONS)
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            token = get_tokens_for_user(user)
            user = authenticate(email=email, password=password)
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
        serializer = UserSerializer(user, context={"request": request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def get_permissions(self):
        """метод для проверки авторизации и установления дальнейшего уровня доступа в зависимости от него"""
        # Если user_id не указан, разрешаем доступ только авторизованным пользователям
        if self.kwargs.get('user_id') is None:
            return [IsAuthenticated()]
        # Если user_id указан, доступ открыт всем
        return [AllowAny()]


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


class EditUserView(APIView):
    """Метод для редактирования профиля пользователя"""
    permission_classes = [IsAuthenticated]
    def patch(self, request):
        user = request.user
        serializer = UserEditSerializer(user, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status = status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status= status.HTTP_418_IM_A_TEAPOT)
