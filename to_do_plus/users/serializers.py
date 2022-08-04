import email
from logging import PlaceHolder
from wsgiref import validate
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    login=serializers.CharField(style={'placeholder': 'Username or Email'})
    password=serializers.CharField(style={"input_type":"password", "placeholder":"Password"})
    
    
    def log_in(self, data):
        user=authenticate(username=data['login'], password=data['password'])
        if user is None:
            try:
                userFromMail=User.objects.get(email=data['login'])
            except:
                return None
            user=authenticate(username=userFromMail.username, password=data['password'])
    
        return user
        


class RegisterSerializer(serializers.Serializer):
    username=serializers.CharField(style={'placeholder': 'Username'})
    email=serializers.EmailField(style={'placeholder': 'Email'})
    password=serializers.CharField(style={'input_type':'password', 'placeholder': 'Password'})
    password2=serializers.CharField(style={'input_type':'password', 'placeholder': 'Repeat Password'})


    def validate(self, data):
        if(data['password']!= data['password2']):
            raise serializers.ValidationError({'password': "Passwords aren't the same"})

        return data


    def create(self, val_data):
        user=User.objects.create(username=val_data['username'],
                                email=val_data['email'],
                                is_active=False)

        user.set_password(val_data['password'])
        user.save()

        return user



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id', 'username', 'email']

class ForgotPasswordSerializer(serializers.Serializer):
    email=serializers.EmailField(style={'placeholder': 'Email'})
    def verify(self, data):
        user=User.objects.get(email=data['email'])
        return user

class ResetPasswordSerializer(serializers.Serializer):
    password=serializers.CharField(style={'input_type': 'password', 'placeholder': 'New Password'})
    password2=serializers.CharField(style={'input_type': 'password', 'placeholder': 'Repeat New Password'})

    def validate(self, data):
        if(data['password']!=data['password2']):
            raise serializers.ValidationError({'password': "Passwords aren't the same"})
        return data['password']

    
