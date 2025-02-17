from .models import BaseImage
from rest_framework import  generics
from rest_framework.response import Response
from rest_framework import status
from apps.UsersApp.permissions import OwnerOrModeratorOrReadonly
from .serializers import BaseImageSerializer

class ImageApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = BaseImage.objects.all()
    serializer_class = BaseImageSerializer
    permission_classes = OwnerOrModeratorOrReadonly
    lookup_field = "id"
    
    def perform_update(self, serializer):
        super().perform_update(serializer)
        Response({"message": "изображение успешно обновлено"}, status=status.HTTP_200_OK)

    def perform_destroy(self, instance):
        super().perform_destroy(instance)
        return Response({"message": "изображение успешно удалено"}, status=status.HTTP_200_OK)
    
# Create your views here.
