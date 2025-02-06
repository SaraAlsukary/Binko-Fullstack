from django.urls import path
from .views import add_book_with_chapters ,get_book_chapters ,add_chapter

urlpatterns = [
    path('add-user-book/<int:user_id>/', add_book_with_chapters, name='add_user_book'),
    path('books/<int:book_id>/chapters/', get_book_chapters, name='get-book-chapters'),
    path('books/<int:book_id>/add-chapter/', add_chapter, name='add-chapter'),

]
