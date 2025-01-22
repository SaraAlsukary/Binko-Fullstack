from rest_framework import serializers
from .models import Comment
from books.models import Book
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['user','book','comment']    

class UserCommentSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.name')
    class Meta:
        model = Comment
        fields = ['name', 'comment']