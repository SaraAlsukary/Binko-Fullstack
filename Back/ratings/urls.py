from django.urls import path
from .views import rate_book , top_books_rated_7_to_10

urlpatterns =[
    path('rate/<int:user_id>/<int:book_id>/', rate_book, name='rate_book'),
    path('books/top-rated-range/', top_books_rated_7_to_10),
]