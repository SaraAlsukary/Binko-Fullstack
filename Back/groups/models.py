from django.db import models
from account.models import CustomUser
from chats.models import Chat


class Group(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="groups")  
    created_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_now=True) 

    class Meta:
        db_table='groups'
   