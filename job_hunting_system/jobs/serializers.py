from rest_framework import serializers
from .models import Job
from accounts.serializers import UserSerializer

class JobSerializer(serializers.ModelSerializer):
    company_detail = UserSerializer(source='company', read_only=True)

    class Meta:
        model = Job
        fields = '__all__'
        read_only_fields = ('company', 'created_at')