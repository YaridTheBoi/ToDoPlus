from django.urls import path
from .views import LoginList, RegisterList, LogoutView, VerifyRegister, ResetPassword, ForgotPassword

urlpatterns = [
    path('login/', LoginList.as_view()),
    path('register/', RegisterList.as_view()),
    path('logout/', LogoutView),
    path('verify/<str:token>/<int:user_id>', VerifyRegister.as_view(), name='verify-register'),
    path('reset-password/<str:token>/<int:user_id>', ResetPassword.as_view(), name='reset-password'),
    path('forgot-password/', ForgotPassword.as_view(), name='forgot-password')
]
