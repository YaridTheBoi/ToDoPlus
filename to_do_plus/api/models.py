from email.policy import default
from pickle import FALSE
from tkinter import CASCADE
from django.db import models
from django.forms import CharField
from django.contrib.auth.models import User

# Create your models here.
class Task(models.Model):
    title= models.CharField(max_length=25, default="")
    description=models.CharField(max_length=150, null=False)
    create_date=models.DateField(auto_now_add=True)
    author_id=models.ForeignKey(User, on_delete=models.CASCADE)
    is_done=models.BooleanField(null=False, default=False)