from rest_framework import serializers
from .models import BookRead, Book
from account.models import CustomUser

class BookReadSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(required=False, allow_null=True)
    book_id = serializers.IntegerField()

    def validate(self, data):
        book_id = data['book_id']
        user_id = data.get('user_id')

        if not Book.objects.filter(id=book_id).exists():
            raise serializers.ValidationError("الكتاب غير موجود.")

        if user_id is not None and not CustomUser.objects.filter(id=user_id).exists():
            raise serializers.ValidationError("المستخدم غير موجود.")

        return data

    def save(self, **kwargs):
        user_id = self.validated_data.get('user_id')
        book_id = self.validated_data['book_id']

        return BookRead.objects.create(
            user_id=user_id if user_id else None,
            book_id=book_id
        )
class MostReadBookSerializer(serializers.ModelSerializer):
    read_count = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ['id', 'name', 'publication_date','image', 'read_count']

    def get_read_count(self, obj):
        return obj.reads.count()