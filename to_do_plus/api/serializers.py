from dataclasses import field
from statistics import mode
from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model=Task
        fields=('id', 'title', 'description', 
                'create_date', 'author_id', 'is_done')