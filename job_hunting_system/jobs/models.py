from django.db import models
from django.conf import settings

class Job(models.Model):
    company = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='jobs')
    title = models.CharField(max_length=200)
    requirement = models.TextField()
    duty = models.TextField()
    salary = models.CharField(max_length=100)  # 简单字符串，如 "20k-30k"
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.company.username}"