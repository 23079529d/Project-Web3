from django.urls import path
from . import views

urlpatterns = [
    path('jobs/<int:job_id>/apply/', views.ApplicationCreate.as_view(), name='apply-job'),
    path('my/', views.CompanyApplicationList.as_view(), name='my-applications'),
    path('<int:pk>/', views.ApplicationDetail.as_view(), name='application-detail'),
]