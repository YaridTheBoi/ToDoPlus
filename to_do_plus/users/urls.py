from django.urls import path
from .views import LoginList, RegisterList

urlpatterns = [
    path('login/', LoginList.as_view()),
    path('register/', RegisterList.as_view())
]
