from secrets import token_bytes
from tabnanny import check
from django.shortcuts import  redirect
from django.http import HttpResponse, Http404, HttpRequest
from rest_framework import generics, status, mixins
from rest_framework.response import Response
from .serializers import LoginSerializer, RegisterSerializer, UserSerializer, ForgotPasswordSerializer, ResetPasswordSerializer
from django.contrib.auth.models import User
from django.contrib.auth import login, logout

from django.conf import settings
from django.core.mail import send_mail
from rest_framework.views import APIView

from rest_framework.authtoken.models import Token

from django.urls import reverse

from django.contrib.sessions.models import Session
import json
# Create your views here.



class LogoutView(APIView):
    def get(self ,request, token, session):
        checkMe=User.objects.filter(auth_token=token).first()
        if(checkMe is None):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)
        

class LoginList(APIView):
    queryset=User.objects.all()
    serializer_class=LoginSerializer

    def post(self, request):
        print("POST\n")
    
        serializer=LoginSerializer(data=request.data)
        if serializer.is_valid():
            
            user=serializer.log_in(request.data)
            print(user)

            if (user is None):
                print("Nie ma typa")
                return Response(status=status.HTTP_404_NOT_FOUND)
            else:

                token, created=Token.objects.get_or_create(user=user)
                response={"token": token.key}
                return Response(response,status=status.HTTP_200_OK)
        
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
            token, created=Token.objects.get_or_create(user=newUser)
            link=request.META['HTTP_HOST']+reverse('verify-register', args=[token.key, newUser.id])
            send_mail(
                subject='Register Confirmation',
                message='Token: '+ link ,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[newUser.email]
            )
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class VerifyRegister(generics.GenericAPIView):
    def get(self, request, token, user_id):
        user=User.objects.get(id=user_id)
        tokenFromUser=Token.objects.get(user=user)
        if(token==tokenFromUser.key):
            user.is_active=True
            user.save()
            return Response(status=status.HTTP_200_OK)
        return Response(status.HTTP_404_NOT_FOUND)

class ForgotPassword(generics.GenericAPIView):
    queryset=User.objects.all()
    serializer_class=ForgotPasswordSerializer
    def post(self, request):
        serializer=ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            userForgotPassword=serializer.verify(serializer.data)
            if userForgotPassword is None:
                return Response(status.HTTP_404_NOT_FOUND)

            token, created=Token.objects.get_or_create(user=userForgotPassword)
            link=request.META['HTTP_HOST']+reverse('reset-password', args=[token.key, userForgotPassword.id])
            send_mail(
                subject='Reset Password',
                message='Token: '+ link ,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[userForgotPassword.email]
            )
            return Response(status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)
                

class ResetPassword(generics.GenericAPIView):
    queryset=User.objects.all()
    serializer_class=ResetPasswordSerializer
    def post(self,request, token, user_id):
        
        user=User.objects.get(id=user_id)
        if(user is None):
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        tokenOfUser=Token.objects.get(user=user)
        if(tokenOfUser.key!=token):
            return Response(status=status.HTTP_405)

        serializer=ResetPasswordSerializer(data=request.data)

        user.set_password(serializer.validate(request.data))


        
        user.save()
        return redirect('/users/login')

