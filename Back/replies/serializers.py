from rest_framework import serializers
from .models import Reply
from account.models import CustomUser
from comments.models import Comment

class GetReplySerializer(serializers.ModelSerializer):
    name = serializers.CharField(source='user.name')
    image=serializers.ImageField(source='user.image')
    class Meta:
        model = Reply
        fields = ['content' , 'name' ,'image']  

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'image']

class ReplySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # إرجاع بيانات المستخدم مع الرد

    class Meta:
        model = Reply
        fields = ['id', 'comment','user', 'content', 'created_at']


class DeleteReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = '__all__'        

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser  # تأكد من استيراد النموذج الخاص بك
        fields = ['id', 'username','name']  # أو أي حقول أخرى تريدها

class Repliesrializer(serializers.ModelSerializer):
    user = UserSerializer()  # تضمين بيانات المستخدم

    class Meta:
        model = Reply
        fields = ['id', 'content', 'user', 'created_at']  
    

class RecursiveField(serializers.Serializer):
    def to_representation(self, value):
        serializer = self.parent.parent.__class__(value, context=self.context)
        return serializer.data

class ReplysSerializer(serializers.ModelSerializer):
    children = RecursiveField(many=True, read_only=True)

    class Meta:
        model = Reply
        fields = ['id', 'user', 'content', 'created_at', 'parent', 'children']    