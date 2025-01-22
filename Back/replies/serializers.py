from rest_framework import serializers
from .models import Reply

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ['id', 'comment', 'user', 'reply', 'created_at']
        read_only_fields = ['user', 'created_at' , 'comment']


class GetReplySerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.name')
    class Meta:
        model = Reply
        fields = ['reply' , 'name']  
