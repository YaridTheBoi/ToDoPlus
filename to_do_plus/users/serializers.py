import email
from logging import PlaceHolder
from wsgiref import validate
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import serializers

class LoginSerializer(serializers.Serializer):
    password=serializers.CharField(style={"input_type":"password", "placeholder":"Password"})
    login=serializers.CharField(style={'placeholder': 'Username or Password'})
    
    def log_in(self, data):
        
        user=authenticate(username=data['login'], password=data['password'])
        if user is None:

            try:
                user=User.objects.get(email=data['login'])
            except:
                return None
        
            if user.check_password(data['password']):
                return user
            return None
            
        
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
                                email=val_data['email'])

        user.set_password(val_data['password'])
        user.save()

        return user



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id', 'username', 'email']