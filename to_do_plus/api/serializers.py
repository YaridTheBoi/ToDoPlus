from dataclasses import field
from statistics import mode
from rest_framework import serializers
from .models import Task

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



    def create(self, request):
        val_data=request.data
        try:
            task=Task.objects.create(title=val_data['title'],
                                    description=val_data['description'],
                                    author_id= request.user)
        except:
            return None
        task.save()
        return task