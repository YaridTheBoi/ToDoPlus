from django.shortcuts import render
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.contrib.auth.models import User

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


    def get(self, request, token):
        """
        users=User.objects.filter(id__gte=2)
        print("deleting: "+ str(users.count))
        users.delete()
        """
        checkMe=User.objects.filter(auth_token=token).first()
        if(checkMe is None):
            return Response(status=status.HTTP_404_NOT_FOUND)
        if checkMe.is_authenticated:
            tasks= self.queryset
            tasks=tasks.filter(author_id__id=checkMe.id)
            serializer=TaskSerializer(tasks, many=True)
            return Response( serializer.data)
        return Response(status=status.HTTP_401_UNAUTHORIZED)

  
    def post(self, request, token):
        serializer=CreateTaskSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            data=serializer.create(request, token)
            print('\n serializer is valid\n')
            if(data==None):
                print('\n data is none\n')
                return Response(serializer.errors, status=status.HTTP_403_FORBIDDEN)

            return HttpResponseRedirect('/myTasks/'+str(token))
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TaskDetailed(generics.GenericAPIView):
    queryset=Task.objects.all()
    serializer_class=TaskSerializer


    def get_task_by_id(self, id,token):
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
