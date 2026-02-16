from rest_framework import serializers
from .models import Application
from jobs.serializers import JobSerializer
from accounts.serializers import UserSerializer

class ApplicationSerializer(serializers.ModelSerializer):
    job_detail = JobSerializer(source='job', read_only=True)
    applicant_detail = UserSerializer(source='applicant', read_only=True)

    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ('job', 'applicant', 'applied_at')