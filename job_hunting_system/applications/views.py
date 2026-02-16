from rest_framework import generics, permissions, status
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from .models import Application
from .serializers import ApplicationSerializer
from jobs.models import Job

class IsIndividualUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'individual'

class IsJobOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.job.company == request.user

class ApplicationCreate(generics.CreateAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [IsIndividualUser]

    def perform_create(self, serializer):
        job_id = self.kwargs.get('job_id')
        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            raise PermissionDenied("Job not found.")
        
        if Application.objects.filter(job=job, applicant=self.request.user).exists():
            raise PermissionDenied("You have already applied for this job.")
        serializer.save(job=job, applicant=self.request.user)

class CompanyApplicationList(generics.ListAPIView):
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.user_type != 'company':
            return Application.objects.none()
        return Application.objects.filter(job__company=user).order_by('-applied_at')

class ApplicationDetail(generics.RetrieveAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [permissions.IsAuthenticated, IsJobOwner]