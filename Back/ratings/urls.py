from django.urls import path
from .views import add_rating , top_books_rated_7_to_10

urlpatterns =[
    path('books/rate/', add_rating),
    path('books/top-rated-range/', top_books_rated_7_to_10),
]