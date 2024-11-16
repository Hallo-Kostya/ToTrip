from rest_framework.response import Response
from rest_framework.views import APIView
from Db_api.models import Place, City, District, Country, Region
from Db_api.serializers import PlaceSerializer, CitySerializer, CountrySerializer, DistrictSerializer, RegionSerializer
from rest_framework.permissions import AllowAny


class SearchPlacesAPIView(APIView):
    def get(self, request):
        query = request.GET.get("query", "")
        if not query:
            return Response({"error": "Отправлен пустой запрос"}, status=status.HTTP_400_BAD_REQUEST)

        # Синхронный доступ к БД
        cities = City.objects.filter(name__icontains=query)
        places = Place.objects.filter(name__icontains=query)
        districts = District.objects.filter(name__icontains=query)
        regions = Region.objects.filter(name__icontains=query)
        countries = Country.objects.filter(name__icontains=query)

        # Сериализация данных
        cities_data = CitySerializer(cities, many=True).data
        places_data = PlaceSerializer(places, many=True).data
        districts_data = DistrictSerializer(districts, many=True).data
        regions_data = RegionSerializer(regions, many=True).data
        countries_data = CountrySerializer(countries, many=True).data

        return Response({
            "cities": cities_data,
            "places": places_data,
            "countries": countries_data,
            "regions": regions_data,
            "districts": districts_data
        }, status=status.HTTP_200_OK)