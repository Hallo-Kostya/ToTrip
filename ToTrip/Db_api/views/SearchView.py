from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from Db_api.models import Place, City, District, Country, Region, Category 
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
        width = request.GET.get("width", 80)
        height = request.GET.get("height", 80)

        cities = City.objects.annotate(lower_name=Lower('name')).filter(
            Q(lower_name__icontains=query) | 
            Q(lower_name__in=query_parts)
        )

        places = set(Place.objects.prefetch_related("place_images").annotate(lower_name=Lower('name')).filter(
            Q(lower_name__icontains=query) | 
            Q(lower_name__in=query_parts)
        ))

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
        if len(places) < 10:
            category = Category.objects.annotate(lower_name=Lower('name')).filter(
                Q(lower_name__icontains=query) | 
                Q(lower_name__in=query_parts)
            )
            if category:
                category=category.values_list('id', flat=True)
                if cities_data:
                    city_ids = cities.values_list('id', flat=True)
                    category_places = set(Place.objects.filter(
                        Q(category_id__in = category) &
                        Q(city_id__in = city_ids)
                    ))
                    places=places.union(category_places)
                elif not cities_data:
                    category_places = set(Place.objects.filter(
                        Q(category_id__in = category) 
                    ))
                    places=places.union(category_places)
            elif cities_data and not category:
                city_ids = cities.values_list('id', flat=True)
                city_places= set(Place.objects.filter(
                    Q(city_id__in = city_ids)
                ))
                places=places.union(city_places)
        places_data = PlaceSerializer(places, many=True, context={
            'width': int(width),
            'height': int(height)
            }).data
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