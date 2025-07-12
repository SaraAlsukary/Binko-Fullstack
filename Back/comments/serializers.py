from rest_framework import serializers
from .models import Comment
from account.models import CustomUser
from books.models import Book
from replies.models import Reply
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

class ReplySerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()
    name = serializers.CharField(source='user.name')
    image=serializers.ImageField(source='user.image')
    

    class Meta:
        model = Reply
        fields = ['id', 'name','image', 'user', 'content', 'created_at', 'parent', 'children']

    def get_children(self, obj):
        children = obj.children.all()
        return ReplySerializer(children, many=True).data     
class CommentsSerializer(serializers.ModelSerializer):
    replies = ReplySerializer(many=True, read_only=True)
    name = serializers.CharField(source='user.name')
    image=serializers.ImageField(source='user.image')
    book=serializers.CharField(source='book.name')

    class Meta:
        model = Comment
        fields = ['id', 'name','image','book','user', 'book', 'comment', 'replies']       



class CommentRepliesCountSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)
    user_image = serializers.ImageField(source='user.image', read_only=True)
    reply_count = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'comment', 'user_name', 'user_image', 'reply_count']

    def get_reply_count(self, obj):
        return obj.replies.count()       