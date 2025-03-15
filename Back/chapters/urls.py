from django.urls import path
from .views import get_book_chapters_if_accept ,add_chapter,unaccepted_chapters ,delete_chapter,accept_chapter
from .views import manage_note

urlpatterns = [
    path('books/<int:book_id>/chapters/', get_book_chapters_if_accept, name='get_book_chapters_if_accept'),
    path('books/<int:book_id>/add-chapter/', add_chapter, name='add-chapter'),
    path('unaccepted-chapters/', unaccepted_chapters, name='unaccepted-chapters'),
    path('delete-chapter/<int:chapter_id>/', delete_chapter, name='delete-chapter'),
    path('accept-chapter/<int:chapter_id>/', accept_chapter, name='accept-chapter'),
    path('chapters/<int:chapter_id>/note/', manage_note, name='manage_note'),

]
