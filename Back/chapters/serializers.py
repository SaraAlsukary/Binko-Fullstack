from rest_framework import serializers
from .models import  Chapter
from books.models import Book
import base64
from django.core.files.base import ContentFile


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['id', 'title', 'content_text', 'audio']

class BookSerializer(serializers.ModelSerializer):
    chapters = ChapterSerializer(many=True)  # ربط الفصول بالكتاب

    class Meta:
        model = Book
        fields = ['id', 'name', 'image', 'description', 'publication_date', 'chapters']

    def create(self, validated_data):
        chapters_data = validated_data.pop('chapters')  # استخراج بيانات الفصول
        user = validated_data.pop('user')  # استخراج المستخدم
        book = Book.objects.create(user=user, **validated_data)  # إنشاء الكتاب وربطه بالمستخدم
        for chapter_data in chapters_data:
            Chapter.objects.create(book=book, **chapter_data)  # إنشاء الفصول وربطها بالكتاب
        return book

class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['id', 'title', 'content_text', 'audio']
        def create(self, validated_data):
           audio_data = validated_data.pop('audio', None)
           if audio_data:
            format, audio_str = audio_data.split(';base64,')
            ext = format.split('/')[-1]
            validated_data['audio'] = ContentFile(base64.b64decode(audio_str), name=f"uploaded.{ext}")
            return super().create(validated_data)