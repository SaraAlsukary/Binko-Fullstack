from rest_framework import serializers
from .models import  Chapter
from books.models import Book


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