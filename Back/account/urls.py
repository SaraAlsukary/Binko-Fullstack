from django.urls import path
from .views import unaccepted_users , accept_user , get_all_readers ,get_all_writers
from .views import  reject_user
from .views import create_user ,login_user ,LogoutView ,get_supervisor_users, update_custom_user ,create_supervisor , get_non_supervisor_users
from .views import delete_user  ,books_by_user_category ,books_by_user_category_is_accept,accepted_users
urlpatterns = [
    path('create-user/', create_user, name='create_user'),
    path('login/', login_user, name='login'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('update-user/<int:user_id>/', update_custom_user, name='update_custom_user'),
    path('non-supervisors/', get_non_supervisor_users, name='get_non_supervisor_users'),
    path('supervisors/', get_supervisor_users, name='get_non_supervisor_users'),
    path('delete-user/<int:user_id>/', delete_user, name='delete-user'),
    path('create-supervisor/', create_supervisor, name='create-supervisor'),
    path('books/by_user_category/<int:user_id>/', books_by_user_category),
    path('books/by_user_category/is_accept/<int:user_id>/', books_by_user_category_is_accept),
    path('users/accepted/', accepted_users, name='accepted_users'),
    path('users/unaccepted/', unaccepted_users, name='accepted_users'),
    path('users/<int:user_id>/accept/', accept_user, name='accept_user'),
    path('users/readers/', get_all_readers, name='get_all_readers'),
    path('users/writers/', get_all_writers, name='get_all_writers'),
    path('reject-user/<int:user_id>/', reject_user, name='reject_user')]