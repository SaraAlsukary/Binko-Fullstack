from django.urls import path
from .views import getallcat

urlpatterns = [
    path('getallcat', getallcat, name='getallcat'),
]