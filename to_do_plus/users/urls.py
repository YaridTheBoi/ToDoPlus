from django.urls import path
from .views import LoginList, RegisterList, LogoutView, VerifyRegister

urlpatterns = [
    path('login/', LoginList.as_view()),
    path('register/', RegisterList.as_view()),
    path('logout/', LogoutView),
    path('verify/<str:token>/<int:user_id>', VerifyRegister.as_view(), name='verify-register')
]
