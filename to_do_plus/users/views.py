from django.shortcuts import render
from django.http import HttpResponse, Http404
from rest_framework import generics, status, mixins
from rest_framework.response import Response
from .serializers import LoginSerializer, RegisterSerializer, UserSerializer
from django.contrib.auth.models import User

# Create your views here.


'''def login(request):
    return HttpResponse("Login Page")
'''

'''def register(request):
    return HttpResponse("Register Page")'''


class LoginList(generics.GenericAPIView):
    queryset=User.objects.all()
    serializer_class=LoginSerializer

    def post(self, request):
        print("POST")
        serializer=LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RegisterList(generics.GenericAPIView, mixins.ListModelMixin):
    queryset=User.objects.all()
    serializer_class=RegisterSerializer


    def get(self, request):
        users= User.objects.all()
        serializer=UserSerializer(users, many=True)
        return Response(serializer.data)
       



    def post(self, request):
        serializer=RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.create(serializer.validate(request.data))
            
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
