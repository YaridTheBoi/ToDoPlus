from django.urls import path
from .views import main, TaskView, getAllTasks, removeTaskById, createTask


urlpatterns = [
    path('', main),
    path('home', main),
    path('api', TaskView.as_view()),
    path('allTasks', getAllTasks),
    path('removeTask/<int:id>', removeTaskById),
    path('newTask', createTask)
]
