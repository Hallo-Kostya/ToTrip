from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import (
    TripSerializer,
    SubTripSerializer,
    SubtripPlaceSerializer,
    CreateTripSerializer,
    NoteSerializer,
)
from rest_framework.response import Response
from rest_framework import status
from apps.TripApp.models import Trip, SubTrip, SubtripPlace
from apps.PlaceApp.models import Place
from apps.UsersApp.models import User
from rest_framework.permissions import IsAuthenticated
from .models import Note


class TripListApiView(APIView):
    """
    Метод для получения списка поездок конкретного пользователя  по его id,
    если же id не передан, то возвращает список поездок авторизованного пользователя
    """

    def get(self, request, user_id=None):
        if user_id == None:
            user = request.user
            if user.is_authenticated:
                trips = Trip.objects.filter(trippers=user.id)
            else:
                return Response(
                    {"message": "У вас нет своего профиля! Авторизуйтесь сперва."},
                    status=status.HTTP_204_NO_CONTENT,
                )
        else:
            trips = Trip.objects.filter(trippers__id=user_id)
        if trips:
            trips_data = TripSerializer(
                trips, many=True, context={"request": request}
            ).data
            return Response({"trips": trips_data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": "Нет поездок для данного пользователя!"},
                status=status.HTTP_204_NO_CONTENT,
            )


class CreateTripAPIView(APIView):
    """
    метод для создания поездки для авторизованного пользователя
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        tripSerializer = CreateTripSerializer(
            data=request.data, context={"request": request}
        )
        if tripSerializer.is_valid():
            tripSerializer.save()
            return Response(
                {"trip": tripSerializer.data}, status=status.HTTP_201_CREATED
            )
        else:
            return Response(tripSerializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeleteTripApiView(APIView):
    """
    метод для удаления поездки по её trip_id, если же много путешественников в поездке,
    то удаляется авторизованный пользователь из их списка, если он последний,
    то удаляется поездка.
    """

    permission_classes = [IsAuthenticated]

    def delete(self, request, trip_id):
        try:
            trip_to_delete = Trip.objects.get(id=trip_id)
            user = request.user
            if trip_to_delete.trippers.count() > 1:
                trip_to_delete.trippers.remove(user)
                trip_to_delete.save()
                return Response(
                    {"status": "Поездка удалена"}, status=status.HTTP_200_OK
                )
            else:
                if trip_to_delete.delete():
                    return Response(
                        {"status": "Поездка удалена"}, status=status.HTTP_200_OK
                    )
        except Trip.DoesNotExist:
            return Response(
                {"error": "Данная поездка не найдена"}, status=status.HTTP_404_NOT_FOUND
            )


class SubtripDetailApiView(APIView):
    """
    Метод для получения данных о конкретном дне поездки(subtrip)
    """

    def get(self, request, trip_id, date):
        try:
            subtrip = SubTrip.objects.get(trip_id=trip_id, date=date)
            serializer = SubTripSerializer(subtrip, context={"request": request})
            return Response({"subtrip": serializer.data}, status=status.HTTP_200_OK)
        except SubTrip.DoesNotExist:
            return Response(
                {"error": "данного сабтрипа нет в базе данных!"},
                status=status.HTTP_404_NOT_FOUND,
            )


class CreateSubtripApiView(APIView):
    """
    Метод для создания дня поездки (subtrip),
    который содержит в себе посещенные места и дату (уникален по date и trip_id)
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        subtripSerializer = SubTripSerializer(data=request.data)
        if subtripSerializer.is_valid():
            subtrip = subtripSerializer.save()
            places_ids = request.data.get("places_ids")
            subtrip_places = [
                SubtripPlace(subtrip=subtrip, place_id=place_id)
                for place_id in places_ids
            ]
            SubtripPlace.objects.bulk_create(subtrip_places)
            response_data = SubTripSerializer(
                subtrip, context={"request": request}
            ).data
            return Response({"subtrip": response_data}, status=status.HTTP_201_CREATED)
        else:
            return Response(
                subtripSerializer.errors, status=status.HTTP_400_BAD_REQUEST
            )


class TripDetailApiView(APIView):
    """
    Метод для получения данных о поездке по её trip_id
    """

    def get(self, request, trip_id):
        try:
            trip = Trip.objects.get(id=trip_id)
            serializer = TripSerializer(trip, context={"request": request})
            return Response({"trip": serializer.data}, status=status.HTTP_200_OK)
        except Trip.DoesNotExist:
            return Response(
                {"error": "данной поездки не сушествует"},
                status=status.HTTP_404_NOT_FOUND,
            )


class GetUserNotesApiView(APIView):
    """
    Метод для получения заметок авторизованного пользователя.
    Заметки видны только автору.
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        notes = Note.objects.filter(author_id=user.id)
        if notes.exists():
            serializer = NoteSerializer(notes, many=True, context={"request": request})
            return Response({"notes": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response(
                {"error": "у данного пользователя нет заметок!"},
                status=status.HTTP_404_NOT_FOUND,
            )


class DeleteSubtripApiView(APIView):
    """
    Метод для удаления дня поездки по trip_id и date вместо subtrip_id
    """

    permission_classes = [IsAuthenticated]

    def delete(self, request, trip_id, date):
        try:
            subtrip_to_delete = SubTrip.objects.get(trip_id=trip_id, date=date)
            if subtrip_to_delete.delete():
                return Response(
                    {"status": "день поездки удален"}, status=status.HTTP_200_OK
                )
        except SubTrip.DoesNotExist:
            return Response(
                {"error": "день поездки не найден"}, status=status.HTTP_404_NOT_FOUND
            )


class AddPlaceToSubtripApiView(APIView):
    """
    Метод для добавления места в посещенные в конкретный день поездки по trip_id и date идет идентификация subtrip'а, а по ключу place необходимо передать места для добавления
    """

    permission_classes = [IsAuthenticated]

    def patch(self, request, trip_id, date):
        try:
            subtrip = SubTrip.objects.get(trip_id=trip_id, date=date)
            place_id = request.data.get("place")
            place = Place.objects.get(id=place_id)
            if not place_id:
                return Response(
                    {"error": "не передан Id места"}, status=status.HTTP_400_BAD_REQUEST
                )
            if not place:
                return Response(
                    {"error": "указан некорректный Id места"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            if SubtripPlace.objects.filter(subtrip=subtrip, place=place).exists():
                return Response(
                    {"error": "Место уже добавлено"}, status=status.HTTP_400_BAD_REQUEST
                )
            SubtripPlace.objects.create(subtrip=subtrip, place=place)
            return Response(
                {"status": "место успешно добавлено"}, status=status.HTTP_200_OK
            )
        except SubTrip.DoesNotExist:
            return Response(
                {"error": "день поездки не найден"}, status=status.HTTP_404_NOT_FOUND
            )
        except Place.DoesNotExist:
            return Response(
                {"error": "место не найдено"}, status=status.HTTP_404_NOT_FOUND
            )


class DeleteSubtripPlaceApiView(APIView):
    """
    Метод для удаления места из посещенных в какой либо конкретный день по subttripplace_id
    """

    permission_classes = [IsAuthenticated]

    def delete(self, request, subtripplace_id):
        try:
            place = SubtripPlace.objects.get(id=subtripplace_id)
            if not place:
                return Response(
                    {"error": "Место не добавлено в данный день поездки"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            if place.delete():
                return Response(
                    {"status": "место успешно удалено из дня поездки"},
                    status=status.HTTP_200_OK,
                )
        except SubtripPlace.DoesNotExist:
            return Response(
                {"error": "Данного места в этот день не найдено"},
                status=status.HTTP_404_NOT_FOUND,
            )


class AddNoteApiView(APIView):
    """
    метод для добавления заметки к конкретному subtrip по его date и trip_id (дате и айди поездки, к которой он привязан)
    """

    permission_classes = [IsAuthenticated]

    def post(self, request):
        date = request.data.get("date")
        trip_id = request.data.get("trip_id")
        note = NoteSerializer(
            data=request.data,
            context={"request": request, "date": date, "trip_id": trip_id},
        )
        if note.is_valid():
            note.save()
            return Response({"note": note.data}, status=status.HTTP_200_OK)
        return Response({"error": note.errors}, status=status.HTTP_400_BAD_REQUEST)


class DeleteNoteApiView(APIView):
    """
    Метод для удаления заметки по её note_id
    """

    permission_classes = [IsAuthenticated]

    def delete(self, request, note_id):
        try:
            note = Note.objects.get(id=note_id)
            if note.delete():
                return Response(
                    {"message": "заметка успешно удалена"}, status=status.HTTP_200_OK
                )
        except Note.DoesNotExist:
            return Response(
                {"error": "данной заметки не существует!"},
                status=status.HTTP_404_NOT_FOUND,
            )
