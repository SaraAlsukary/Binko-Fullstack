from django.urls import path
from .views import add_comment ,book_comments_with_replies ,get_book_comments ,get_all_comments ,delete_comment ,comments_with_replies

urlpatterns = [
    path('books/<int:book_id>/users/<int:user_id>/comments/', add_comment, name='add_comment'),
    #path('books/<int:book_id>/comments/', get_comments_for_book, name='get_comments_for_book'),
    path('books/<int:book_id>/comments', get_book_comments, name='get_book_comments'),
    path('getallcomment', get_all_comments, name='get_all_comments'),
    path('comments/<int:comment_id>/', delete_comment, name='delete_comment'),
    path('books/<int:book_id>/comments/', comments_with_replies),
    path('book/<int:book_id>/comments/', book_comments_with_replies),
]

