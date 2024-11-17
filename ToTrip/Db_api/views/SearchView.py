from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from Db_api.models import Place, City, District, Country, Region
from Db_api.serializers import PlaceSerializer, CitySerializer, CountrySerializer, DistrictSerializer, RegionSerializer
from django.db.models import Q
from django.db.models.functions import Lower

class SearchPlacesAPIView(APIView):
    def get(self, request):
        query = request.GET.get("query", "")
        if not query:
            return Response({"error": "Отправлен пустой запрос"}, status=status.HTTP_400_BAD_REQUEST)
        query=query.lower()
        query_parts = query.split()
        
        cities = City.objects.annotate(lower_name=Lower('name')).filter(
            Q(lower_name__icontains=query) | 
            Q(lower_name__in=query_parts)
        )
        places = Place.objects.annotate(lower_name=Lower('name')).filter(
            Q(lower_name__icontains=query) | 
            Q(lower_name__in=query_parts)
        )
        regions = Region.objects.annotate(lower_name=Lower('name')).filter(
            Q(lower_name__icontains=query) | 
            Q(lower_name__in=query_parts)
        )
        districts = District.objects.annotate(lower_name=Lower('name')).filter(
            Q(lower_name__icontains=query) | 
            Q(lower_name__in=query_parts)
        )
        countries = Country.objects.annotate(lower_name=Lower('name')).filter(
            Q(lower_name__icontains=query) | 
            Q(lower_name__in=query_parts)
        )

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