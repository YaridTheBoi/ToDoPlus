from django.urls import path
from .views import main, TaskView


urlpatterns = [
    path('', main),
    path('home', main),
    path('api', TaskView.as_view())
]
