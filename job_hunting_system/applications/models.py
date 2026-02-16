from django.db import models
from django.conf import settings
from django.core.validators import FileExtensionValidator

class Application(models.Model):
    job = models.ForeignKey('jobs.Job', on_delete=models.CASCADE, related_name='applications')
    applicant = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='applications')
    message = models.TextField(blank=True)
    cv = models.FileField(upload_to='cvs/', validators=[FileExtensionValidator(['pdf', 'doc', 'docx'])])
    applied_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('job', 'applicant')  # 防止重复申请

    def __str__(self):
        return f"{self.applicant.username} applied for {self.job.title}"
