from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from apps.PlaceApp.models import Place, City, District, Country, Region, Category 
from .serializers import  SearchCitySerializer, SearchCountrySerializer, SearchDistrictSerializer, SearchPlaceSerializer, SearchRegionSerializer
from django.db.models import Q
from django.db.models.functions import Lower
from rest_framework.pagination import PageNumberPagination       

class SearchPlacesAPIView(APIView):
    """метод для получения городов, мест, округов, стран, регионов из бд.
    Запрос делится через .split() на слова, по ним осуществляется фильтрация.
    В случае, если в ответ будет отправлено меньше 10 мест по конкретному запросу,
    производится поиск мест по категории и по заданному городу и поиск дополняется этими местами. Если категории нет в запросе, 
    то в поиск идут просто места из города в запросе. Если же наоборот нет города,
    то поиск дополняется местами по данной категории из других городов."""
    class CustomPagination(PageNumberPagination):
        page_size = 10  # Количество объектов на странице
        page_size_query_param = 'page_size'
        max_page_size = 100
    def get(self, request):
        query = request.GET.get("query", "")
        full_search = request.GET.get("full_search", "false").lower() == "true"
        query_cat = request.GET.get("query_cat", "").lower()
        if query=="":
            return Response({"error": "Отправлен пустой запрос"}, status=status.HTTP_400_BAD_REQUEST)
        query=query.lower()
        query_parts = query.split()

        cities = City.objects.annotate(lower_name=Lower('name')).filter(
            Q(lower_name__icontains=query) | 
            Q(lower_name__in=query_parts)
        )

        places = set(Place.objects.prefetch_related("placeimage_set").annotate(lower_name=Lower('name')).filter(
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
        
        if query_cat == "":
            if full_search or len(places)<8:
                category = Category.objects.annotate(lower_name=Lower('name')).filter(
                    Q(lower_name__icontains=query) | 
                    Q(lower_name__in=query_parts)
                )
                if category:
                    category=category.values_list('id', flat=True)
                    if cities:
                        city_ids = cities.values_list('id', flat=True)
                        category_places = (Place.objects.filter(
                            Q(category_id__in = category) &
                            Q(city_id__in = city_ids)
                        ))
                        places=places.union(category_places)
                    elif not cities:
                        category_places = (Place.objects.filter(
                            Q(category_id__in = category) 
                        ))
                        places=places.union(category_places)
                elif cities and not category:
                    city_ids = cities.values_list('id', flat=True)
                    city_places= (Place.objects.filter(
                        Q(city_id__in = city_ids)
                    ))
                    places=places.union(city_places)
        else:
            category_ids = Category.objects.annotate(lower_name=Lower('name')).filter(
                    Q(lower_name__icontains=query_cat)
                ).values_list('id', flat=True)
            if category_ids.exists():
                places = (Place.objects.filter(
                        Q(category_id__in = category_ids)
                    ))
        if not full_search:
            places = list(places)[:8]
        paginator = self.CustomPagination()
        paginated_cities = paginator.paginate_queryset(cities, request, view=self)
        paginated_places = paginator.paginate_queryset(list(places), request, view=self)
        paginated_regions = paginator.paginate_queryset(regions, request, view=self)
        paginated_districts = paginator.paginate_queryset(districts, request, view=self)
        paginated_countries = paginator.paginate_queryset(countries, request, view=self)
        cities_data = SearchCitySerializer(paginated_cities, many=True).data
        places_data = SearchPlaceSerializer(paginated_places, many=True).data
        districts_data = SearchDistrictSerializer(paginated_districts, many=True).data
        regions_data = SearchRegionSerializer(paginated_regions, many=True).data
        countries_data = SearchCountrySerializer(paginated_countries, many=True).data

        return Response({
            "cities": cities_data,
            "places": places_data,
            "countries": countries_data,
            "regions": regions_data,
            "districts": districts_data
        }, status=status.HTTP_200_OK)

# Create your views here.
