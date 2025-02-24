from django.urls import path
from .views import getallcat , add_category ,delete_category ,update_category

urlpatterns = [
    path('getallcat', getallcat, name='getallcat'),
    path('add-category/', add_category, name='add_category'),
    path('categories/<int:pk>/', delete_category, name='delete_category'),
    path('update/categories/<int:pk>/', update_category, name='update_category'),
]