from django.urls import path
from .views import create_user ,login_user ,LogoutView , update_custom_user , get_non_supervisor_users

urlpatterns = [
    path('create-user/', create_user, name='create_user'),
    path('login/', login_user, name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('update-user/<int:user_id>/', update_custom_user, name='update_custom_user'),
    path('non-supervisors/', get_non_supervisor_users, name='get_non_supervisor_users'),
]
