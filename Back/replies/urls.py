from django.urls import path
from .views import add_reply , get_replies_for_comment

urlpatterns = [
    path('comments/<int:comment_id>/replies/', add_reply, name='add_reply'),
    path('commentsget/<int:comment_id>/replies/', get_replies_for_comment, name='get_replies_for_comment'),
]
