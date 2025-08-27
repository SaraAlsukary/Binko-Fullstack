from django.urls import path
from .views import accept_chapter , list_notifications , mark_all_notifications_as_read , unread_notifications_count
from .views import like_book , comment_book ,dislike_book
urlpatterns = [
    
    path('chapters/<int:chapter_id>/accept/', accept_chapter, name='accept_chapter'),
    path('users/<int:user_id>/notifications/', list_notifications, name='list_notifications'),
    path('users/<int:user_id>/notifications/unread-count/', unread_notifications_count, name='unread_notifications_count'),
    path('users/<int:user_id>/notifications/read-all/', mark_all_notifications_as_read, name='mark_all_notifications_as_read'),
    path('users/<int:user_id>/books/<int:book_id>/like/', like_book, name='like_book'),
    path('users/<int:user_id>/books/<int:book_id>/comment/', comment_book, name='comment_book'),
    path('users/<int:user_id>/books/<int:book_id>/dislike/', dislike_book, name='dislike_book'),
]