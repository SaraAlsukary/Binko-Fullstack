from django.db import models

class Chat(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)  
    type = models.CharField(max_length=255) 
    last_message = models.CharField(max_length=255, null=True, blank=True) 
    created_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_now=True)

   
    class Meta:
         db_table = 'chats'