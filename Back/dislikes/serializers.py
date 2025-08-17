from rest_framework import serializers
from .models import Dislike
from account.models import CustomUser
from books.models import Book ,Like


class BookDislikeSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    book_id = serializers.IntegerField()

    def validate(self, data):
        user_id = data['user_id']
        book_id = data['book_id']

        if not CustomUser.objects.filter(id=user_id).exists():
            raise serializers.ValidationError("المستخدم غير موجود.")
        if not Book.objects.filter(id=book_id).exists():
            raise serializers.ValidationError("الكتاب غير موجود.")

        if Dislike.objects.filter(user_id=user_id, book_id=book_id).exists():
            raise serializers.ValidationError("تم تسجيل عدم إعجاب مسبقًا لهذا الكتاب.")

        return data
    
    def save(self, **kwargs):
        user_id = self.validated_data['user_id']
        book_id = self.validated_data['book_id']

        # حذف الإعجاب إن وُجد
        Like.objects.filter(user_id=user_id, book_id=book_id).delete()

        # تسجيل عدم الإعجاب
        dislike = Dislike.objects.create(user_id=user_id, book_id=book_id)
        return dislike
    


class DeleteDislikeSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
    book_id = serializers.IntegerField()

    def validate(self, data):
        user_id = data['user_id']
        book_id = data['book_id']

        if not CustomUser.objects.filter(id=user_id).exists():
            raise serializers.ValidationError("المستخدم غير موجود.")
        if not Book.objects.filter(id=book_id).exists():
            raise serializers.ValidationError("الكتاب غير موجود.")
        if not Dislike.objects.filter(user_id=user_id, book_id=book_id).exists():
            raise serializers.ValidationError("لا يوجد عدم إعجاب مسجل لهذا المستخدم على هذا الكتاب.")
        
        return data

    def delete(self):
        user_id = self.validated_data['user_id']
        book_id = self.validated_data['book_id']
        Dislike.objects.filter(user_id=user_id, book_id=book_id).delete()


class DisLikeStatusSerializer(serializers.Serializer):
      dis_like = serializers.BooleanField()

class BookDisLikeSerializer(serializers.ModelSerializer):
    dis_liked = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ['id', 'name', 'image', 'description', 'publication_date', 'dis_liked','content']

    def get_dis_liked(self, obj):
        user_id = self.context['user_id']  
        return Dislike.objects.filter(user_id=user_id, book=obj).exists() 
    


class DislikeCountSerializer(serializers.Serializer):
    book_id = serializers.IntegerField()
    dislike_count = serializers.IntegerField()