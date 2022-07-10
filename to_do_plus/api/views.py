from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer


# Create your views here.
def main(request):
    return HttpResponse("Main Page")

class TaskView (generics.CreateAPIView):
    queryset = Task.objects.all()
    serializer_class= TaskSerializer

@api_view(['GET'])
def getAllTasks(request):
    tasks= Task.objects.all()
    serializer=TaskSerializer(tasks, many=True)
    return(Response(serializer.data))

@api_view(['DELETE'])
def removeTaskById(request, id):
    try:
        task= Task.objects.get(id=id)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


    task.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def createTask(request):
    serializer=TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)