from django.urls import path
from .views import dislike_book ,remove_dislike , get_dis_like_status , get_dislike_count

urlpatterns = [
    path('books/dislike/', dislike_book, name='dislike-book'),
    path('books/dislike/remove/', remove_dislike, name='remove-dislike'),
    path('dislike-status/<int:user_id>/<int:book_id>/', get_dis_like_status, name='get_dis_like_status'),
    path('books/<int:book_id>/dislikes/', get_dislike_count, name='get_dislike_count'),
]