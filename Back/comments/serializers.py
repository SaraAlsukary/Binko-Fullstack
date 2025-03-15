from rest_framework import serializers
from .models import Comment
from account.models import CustomUser
from books.models import Book
"""class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = [ 'id','user','book','comment']    

class UserCommentSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.name')
    image=serializers.ImageField(source='user.image')
    
    class Meta:
        model = Comment
        fields = ['id','name', 'comment' , 'image']
"""

class GetCommentSerializer(serializers.ModelSerializer):

    name = serializers.CharField(source='user.name')
    image=serializers.ImageField(source='user.image')
    book=serializers.CharField(source='book.name')
    
    class Meta:
        model = Comment
        fields = ['id','name', 'comment' ,'user','image','book']



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'image']  

class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  

    class Meta:
        model = Comment
        fields = ['id', 'user', 'comment']        

class DeleteCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'