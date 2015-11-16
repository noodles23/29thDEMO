from django.db import models

# Create your models here.
class projectlist(models.Model):
	project_name = models.CharField(max_length=120, blank=True, null=True)
	project_description = models.CharField(max_length=600, blank=True, null=True)
	timestamp = models.DateTimeField(auto_now_add=True, auto_now=False)
	views = models.BigIntegerField()

	def __unicode__(self): #Python 3.3 is __str__
		return self.project_name