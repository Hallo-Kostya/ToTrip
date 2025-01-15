from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('create/', AddReviewApiView.as_view(), name = 'add_review_api'),
    path('delete/<int:review_id>/', ReviewApiView.as_view(), name = 'delete_review_api'),
    path('edit/<int:review_id>/', ReviewApiView.as_view(), name ='edit_review_api'),
    path('detail/<int:review_id>/', ReviewApiView.as_view(), name ='review_detail_api')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
