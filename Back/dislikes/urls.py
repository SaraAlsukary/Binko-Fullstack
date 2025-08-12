from django.urls import path
from .views import dislike_book ,remove_dislike

urlpatterns = [
    path('books/dislike/', dislike_book, name='dislike-book'),
    path('books/dislike/remove/', remove_dislike, name='remove-dislike'),
]