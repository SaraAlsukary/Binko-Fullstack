from rest_framework import serializers
from .models import Notification
from chapters.models import Chapter


"""class NotificationSerializer(serializers.ModelSerializer):
    chapter_title = serializers.CharField(source='chapter.title', read_only=True)
    book_image = serializers.ImageField(source='chapter.book.image', read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'chapter_title', 'message_ar' , 'is_read', 'created_at','message_en','book_image']
"""

class NotificationSerializer(serializers.ModelSerializer):
    chapter_title = serializers.SerializerMethodField()
    book_title = serializers.SerializerMethodField()
    book_image = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = [
            "id",
            "chapter_title",
            "book_title",
            "chapter_id",
            "book_id",
            "book_image",
            "is_read",
            "created_at",
            "message_en",
            "message_ar"
        ]

    def get_chapter_title(self, obj):
        return obj.chapter.title if obj.chapter else ""

    def get_book_title(self, obj):
        return obj.book.name if obj.book else ""

    def get_book_image(self, obj):
        return obj.book.image.url if obj.book and obj.book.image else ""
