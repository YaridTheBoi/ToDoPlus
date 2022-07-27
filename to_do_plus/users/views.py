from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404
from rest_framework import generics, status, mixins
from rest_framework.response import Response
from .serializers import LoginSerializer, RegisterSerializer, UserSerializer
from django.contrib.auth.models import User
from django.contrib.auth import login, logout

from django.conf import settings
from django.core.mail import send_mail

#from rest_framework.authtoken.models import Token
# Create your views here.



def LogoutView(request):
    
    if request.user.is_authenticated:
        logout(request)
        return redirect('/')
    return redirect('/login')

class LoginList(generics.GenericAPIView):
    queryset=User.objects.all()
    serializer_class=LoginSerializer

    def post(self, request):
        print("POST")
        serializer=LoginSerializer(data=request.data)
        if serializer.is_valid():
            user=serializer.log_in(request.data)
            if user is None:
                return Response(status.HTTP_404_NOT_FOUND)
            
            login(request, user)
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
            newUser=serializer.create(serializer.validate(request.data))
            #token, created=Token.objects.get_or_create(user=newUser)
            send_mail(
                subject='Register Confirmation',
                message='Token: ',              #+ str(token.key),
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[newUser.email]
            )
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)




