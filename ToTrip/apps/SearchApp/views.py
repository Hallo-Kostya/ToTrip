from apps.PlaceApp.models import Place
from .serializers import   SearchPlaceSerializer
from rest_framework.pagination import PageNumberPagination      
from rest_framework import generics, filters 

class CustomSearchPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class SearchApiView(generics.ListAPIView):
    queryset = Place.objects.all().prefetch_related("categories")
    serializer_class = SearchPlaceSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['^name', '^categories__name', '^city__name']
    ordering_fields = ['avg_rating', 'reviews_count']
    ordering = ['-avg_rating', '-reviews_count']
    pagination_class = CustomSearchPagination


