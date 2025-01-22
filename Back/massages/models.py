from django.db import models
from groups.models import Group
class Message(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name="messages")  
    text = models.CharField(max_length=255)  
    is_seen = models.BooleanField(default=False)  
    created_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_now=True) 

    class Meta:
        db_table='massages' 

