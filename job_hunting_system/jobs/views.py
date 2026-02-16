from rest_framework import generics, permissions
from .models import Job
from .serializers import JobSerializer

class IsCompanyUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'company'

class JobListCreate(generics.ListCreateAPIView):
    queryset = Job.objects.all().order_by('-created_at')
    serializer_class = JobSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [IsCompanyUser()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        serializer.save(company=self.request.user)

class JobDetail(generics.RetrieveAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    permission_classes = [permissions.IsAuthenticated]
