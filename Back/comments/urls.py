from django.urls import path
from .views import add_comment  ,get_comments_by_book

urlpatterns = [
    path('books/<int:book_id>/users/<int:user_id>/comments/', add_comment, name='add_comment'),
    #path('books/<int:book_id>/comments/', get_comments_for_book, name='get_comments_for_book'),
    path('books/<int:book_id>/comments', get_comments_by_book, name='get_comments_by_book')
]

