from django.db import models
from comments.models import Comment
from account.models import CustomUser
from django.conf import settings
class Reply(models.Model):
    comment=models.ForeignKey(Comment , related_name='replies', on_delete=models.DO_NOTHING)
    user=models.ForeignKey(settings.AUTH_USER_MODEL , related_name='replies',on_delete=models.DO_NOTHING)
    reply=models.CharField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta:
        db_table='replies'
