from logging import PlaceHolder
from wsgiref import validate
from django.contrib.auth.models import User
from rest_framework import serializers

class LoginSerializer(serializers.ModelSerializer):
    password=serializers.CharField(style={"input_type":"password", "placeholder":"Password"})
    class Meta:
        model=User
        fields=['id', 'username' , 'email', 'password']


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