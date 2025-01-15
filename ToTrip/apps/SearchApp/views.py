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
        page_size = 10
        page_size_query_param = 'page_size'
        max_page_size = 100
    def post(self, request):
        query = request.data.get("query", "")
        full_search = request.data.get("full_search", "false").lower() == "true"
        query_cat = request.data.get("query_cat", "").lower()
        order_by = request.data.get("order_by", "").lower()
        then_by = request.data.get("then_by", "").lower()
        is_asc = request.data.get("is_asc", "false").lower() == "true"

        query=query.lower()
        query_parts = query.split()

        annotated_cities = City.objects.annotate(lower_name=Lower('name'))
        annotated_places = Place.objects.annotate(lower_name=Lower('name'))
        annotated_regions = Region.objects.annotate(lower_name=Lower('name'))
        annotated_districts = District.objects.annotate(lower_name=Lower('name'))
        annotated_countries = Country.objects.annotate(lower_name=Lower('name'))
        annotated_category = Category.objects.annotate(lower_name=Lower('name'))

        cities = annotated_cities.filter(
            Q(lower_name__icontains=query) | 
            Q(lower_name__in=query_parts)
        )

        places = annotated_places.prefetch_related("placeimage_set").filter(
            Q(lower_name__icontains=query) | 
            Q(lower_name__in=query_parts)
        )

        regions = annotated_regions.filter(
            Q(lower_name__icontains=query) | 
            Q(lower_name__in=query_parts)
        )

        districts = annotated_districts.filter(
            Q(lower_name__icontains=query) | 
            Q(lower_name__in=query_parts)
        )

        countries = annotated_countries.filter(
            Q(lower_name__icontains=query) | 
            Q(lower_name__in=query_parts)
        )

        # Сериализация данных
        
        if query_cat == "":
            if full_search or len(places)<8:
                category = annotated_category.filter(
                    Q(lower_name__icontains=query) | 
                    Q(lower_name__in=query_parts)
                )
                if category:
                    category_ids = category.values_list('id', flat=True)
                    if cities:
                        city_ids = cities.values_list('id', flat=True)
                        category_places = (annotated_places.filter(
                            Q(categories__in = category) &
                            Q(city_id__in = city_ids)
                        ))
                        places = places.union(category_places)
                    elif not cities:
                        category_places = (annotated_places.filter(
                            Q(categories__in = category) 
                        ))
                        places = places.union(category_places)
                elif cities and not category:
                    city_ids = cities.values_list('id', flat=True)
                    city_places = (annotated_places.filter(
                        Q(city_id__in = city_ids)
                    ))
                    places = places.union(city_places)
        else:
            category_ids = annotated_category.filter(
                    Q(lower_name__icontains=query_cat)
                ).values_list('id', flat=True)
            if category_ids.exists():
                places = places.filter(categories__id__in=category_ids).distinct()

        places = self.sort_output(order_by, then_by, is_asc, places)

        if not full_search:
            places = list(places)[:8]

        # pagination
        paginator_places = self.CustomPagination()
        paginated_places = paginator_places.paginate_queryset(places, request, view=self)
        places_data = SearchPlaceSerializer(paginated_places, many=True).data

        # paginated_cities = paginator_cities.paginate_queryset(cities, request, view=self)
       
        # paginated_regions = paginator_regions.paginate_queryset(regions, request, view=self)
        # paginated_districts = paginator_districts.paginate_queryset(districts, request, view=self)
        # paginated_countries = paginator_countries.paginate_queryset(countries, request, view=self)
        # cities_data = SearchCitySerializer(paginated_cities, many=True).data
       
        # districts_data = SearchDistrictSerializer(paginated_districts, many=True).data
        # regions_data = SearchRegionSerializer(paginated_regions, many=True).data
        # countries_data = SearchCountrySerializer(paginated_countries, many=True).data

        return Response({
            # "cities": cities_data,
            "places": places_data,
            "total_pages": paginator_places.page.paginator.num_pages,
            "count_objects": paginator_places.page.paginator.count,
            # "countries": countries_data,
            # "regions": regions_data,
            # "districts": districts_data
        }, status=status.HTTP_200_OK)

    def sort_output(self, order_by, then_by, is_asc, places):
        fields_to_order = ["avg_rating", "reviews_count"]
        if order_by != "" and order_by in fields_to_order:
            if is_asc:
                if then_by in fields_to_order:
                    places = places.order_by("-" + order_by, "-" + then_by)
                else:
                    places = places.order_by("-" + order_by)
            else:
                if then_by in fields_to_order:
                    places = places.order_by(order_by, then_by)
                else:
                    places = places.order_by(order_by)
        return places
# Create your views here.
