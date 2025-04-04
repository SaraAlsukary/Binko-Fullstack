from django.urls import path
from .views import update_note ,get_note ,book_likes
from .views import favorite_books , add_favorite_book ,get_books_by_category , get_all_books ,get_my_book
from .views import delete_book ,add_book ,get_all_books_to_accept, delete_book_fav ,accept_book,toggle_like
urlpatterns = [
    path('favorite-books/<int:user_id>/', favorite_books, name='favorite-books'),
    path('add-favorite/', add_favorite_book, name='add-favorite'),
    path('books/category/<int:category_id>/',get_books_by_category, name='get_books_by_category'),
    path('mybook/<int:user_id>/', get_my_book, name='get_my_book'),
    path('allbooks/', get_all_books, name='get_all_books'),
    path('allbooksforaccept/', get_all_books_to_accept, name='get_all_books_to_accept'),
    path('delete/books/<int:book_id>/', delete_book, name='delete_book'),
     path('books/add/<int:user_id>/', add_book, name='add_book'),
     path('book-favs/<int:user_id>/<int:book_id>/', delete_book_fav, name='delete_book_fav'),
     path('books/<int:pk>/accept/', accept_book, name='accept_book'),
     path('books/like/<int:user_id>/<int:book_id>/', toggle_like, name='toggle_like'),
     path('books/<int:book_id>/note/', update_note, name='update_note'),
    path('get/books/<int:book_id>/note/', get_note, name='get_note'),
    path('books/<int:book_id>/likes/', book_likes, name='book-likes'),
]