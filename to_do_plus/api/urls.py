from django.urls import path
from .views import main, TaskList, TaskDetailed

urlpatterns = [
    path('', main),
    path('home', main),
    #path('api', TaskView.as_view()),
    path('myTasks', TaskList.as_view()),
    path('myTasks/<int:id>', TaskDetailed.as_view())

]
