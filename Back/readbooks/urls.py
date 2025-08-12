from django.urls import path
from .views import add_book_read , most_read_books

urlpatterns = [
    path('books/read/', add_book_read, name='add-book-read'),
    path('books/most-read/', most_read_books, name='most-read-books'),
]