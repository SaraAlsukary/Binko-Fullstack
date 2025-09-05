from django.urls import path
from .views import add_reply_to_comment , get_replies_for_comment,delete_reply ,get_replies ,add_reply,get_reply ,reply_to_reply

urlpatterns = [
    path('api/comments/<int:comment_id>/reply/<int:user_id>/', add_reply_to_comment),
    path('commentsget/<int:comment_id>/replies/', get_replies_for_comment, name='get_replies_for_comment'),
    path('replies/<int:reply_id>/', delete_reply, name='delete_reply'),
    path('comments/<int:comment_id>/replies/', get_replies, name='get-replies'),
    path('getreplys/<int:comment_id>/', get_reply, name='get_reply'),
    path('addreply/<int:comment_id>/<int:user_id>/', add_reply),
    path('comments/<int:comment_id>/reply/<int:parent_reply_id>/user/<int:user_id>/', reply_to_reply, name='reply_to_reply'),
]
  
        