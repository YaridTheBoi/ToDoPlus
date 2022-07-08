from email.policy import default
from pickle import FALSE
from django.db import models
from django.forms import CharField

# Create your models here.
class Task(models.Model):
    title= models.CharField(max_length=25, default="")
    description=models.CharField(max_length=150, null=False)
    create_date=models.DateField(auto_now_add=True)
    author_id=models.IntegerField(null=False)
    is_done=models.BooleanField(null=False, default=False)