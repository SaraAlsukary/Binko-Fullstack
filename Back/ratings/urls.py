from django.urls import path
from .views import add_rating, top_books_rated_7_to_10 , check_user_rating

urlpatterns =[
    path('rate/<int:user_id>/<int:book_id>/', add_rating, name='add_rating'),
    path('books/top-rated-range/', top_books_rated_7_to_10),
     path('check-rating/<int:user_id>/<int:book_id>/', check_user_rating, name='check_user_rating'),
]