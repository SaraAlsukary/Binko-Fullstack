from django.urls import path
from .views import getallcat , add_category ,delete_category ,update_category ,books_with_rejected_chapters_by_user_category_match

urlpatterns = [
    path('getallcat', getallcat, name='getallcat'),
    path('add-category/', add_category, name='add_category'),
    path('categories/<int:pk>/', delete_category, name='delete_category'),
    path('update/categories/<int:pk>/', update_category, name='update_category'),
    path('books/matching-user-category/<int:user_id>/', books_with_rejected_chapters_by_user_category_match),
]