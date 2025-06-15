from rest_framework import serializers
from .models import Category
from chapters.models import Chapter
from books.models import Book

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model= Category
        fields= '__all__'


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['id', 'title', 'note', 'content_text', 'is_accept']

class BookSerializer(serializers.ModelSerializer):
    chapters = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ['id', 'name', 'description','image', 'chapters']

    def get_chapters(self, obj):
        chapters = obj.chapters.filter(is_accept=False)
        return ChapterSerializer(chapters, many=True).data        