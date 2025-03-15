from django.urls import path
from .views import create_user ,login_user ,LogoutView ,get_supervisor_users, update_custom_user ,create_supervisor , get_non_supervisor_users
from .views import delete_user 
urlpatterns = [
    path('create-user/', create_user, name='create_user'),
    path('login/', login_user, name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('update-user/<int:user_id>/', update_custom_user, name='update_custom_user'),
    path('non-supervisors/', get_non_supervisor_users, name='get_non_supervisor_users'),
    path('supervisors/', get_supervisor_users, name='get_non_supervisor_users'),
    path('delete-user/<int:user_id>/', delete_user, name='delete-user'),
    path('create-supervisor/', create_supervisor, name='create-supervisor'),
    
]
