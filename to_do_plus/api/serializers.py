from dataclasses import field
from statistics import mode
from rest_framework import serializers
from .models import Task
from django.contrib.auth.models import User
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model=Task
        fields=('id', 'title', 'description', 
                'create_date', 'author_id', 'is_done')



class CreateTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model=Task
        fields=('title', 'description')
        extra_kwargs = {'title': {'required': True},
                        'description': {'required': True}} 



    def create(self, request, token):
        val_data=request.data
        author= User.objects.filter(auth_token=token).first()
        try:
            task=Task.objects.create(title=val_data['title'],
                                    description=val_data['description'],
                                    author_id= author)
        except:
            return None
        task.save()
        return task