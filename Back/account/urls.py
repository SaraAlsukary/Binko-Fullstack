from django.urls import path
from .views import create_user ,login_user ,LogoutView

urlpatterns = [
    path('create-user/', create_user, name='create_user'),
    path('login/', login_user, name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
]
