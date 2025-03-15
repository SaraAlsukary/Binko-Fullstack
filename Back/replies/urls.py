from django.urls import path
from .views import add_reply_to_comment , get_replies_for_comment,delete_reply

urlpatterns = [
    path('api/comments/<int:comment_id>/reply/<int:user_id>/', add_reply_to_comment),
    path('commentsget/<int:comment_id>/replies/', get_replies_for_comment, name='get_replies_for_comment'),
    path('replies/<int:reply_id>/', delete_reply, name='delete_reply'),
]
