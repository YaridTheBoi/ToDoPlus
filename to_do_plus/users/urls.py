from django.urls import path
from .views import LoginList, RegisterList, LogoutView, VerifyRegister, ResetPassword, ForgotPassword, SendVerification

urlpatterns = [
    path('login/', LoginList.as_view()),
    path('register/', RegisterList.as_view()),
    path('logout/<str:token>', LogoutView.as_view()),
    path('verify/<str:token>/<int:user_id>', VerifyRegister.as_view(), name='verify-register'),
    path('reset-password/<str:token>/<int:user_id>', ResetPassword.as_view(), name='reset-password'),
    path('forgot-password/', ForgotPassword.as_view(), name='forgot-password'),
    path('send-verification/<int:user_id>', SendVerification.as_view())
]
