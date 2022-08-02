from django.shortcuts import render
from django.http import HttpResponse, Http404, HttpResponseRedirect

from rest_framework import generics, status, mixins
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Task
from .serializers import TaskSerializer, CreateTaskSerializer


# Create your views here. 
def main(request):
    return render(request, 'api/index.html')

class TaskList (APIView):
    
    serializer_class=CreateTaskSerializer
    queryset=Task.objects.all()


    def get(self, request):
        """
        if request.user.is_authenticated:
            tasks= self.queryset
            tasks=tasks.filter(author_id__id=request.user.id)
            serializer=TaskSerializer(tasks, many=True)
            return Response( serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)
        """
        tasks= self.queryset
        tasks=tasks.filter(author_id__id=1)
        serializer=TaskSerializer(tasks, many=True)
        return Response( serializer.data)

    #https://stackoverflow.com/questions/42346200/django-rest-add-data-to-serializer-when-saving przyda sie przy tworzeniu posta
    def post(self, request):
        serializer=CreateTaskSerializer(data=request.data)
        if serializer.is_valid():
            data=serializer.create(request)
            if(data==None):
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return HttpResponseRedirect('/myTasks')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TaskDetailed(generics.GenericAPIView):
    queryset=Task.objects.all()
    serializer_class=TaskSerializer


    def get_task_by_id(self, id):
        try:
            return Task.objects.get(id=id)
        except Task.DoesNotExist:
            raise Http404

    def get(self, request, id, format=None):
        tasks= self.get_task_by_id(id)
        serializer=TaskSerializer(tasks)
        return Response(serializer.data)

    def delete(self, request, id, format=None):
        task=self.get_task_by_id(id)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, id, format=None):
        task=self.get_task_by_id(id)
        serializer=TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
