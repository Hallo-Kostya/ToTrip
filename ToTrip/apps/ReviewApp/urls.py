from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('create/', AddReviewApiView.as_view(), name = 'add_review_api'),
    path('delete/<int:review_id>/', DeleteReviewApiView.as_view(), name = 'delete_review_api')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
