from rest_framework import serializers
from .models import  Chapter
from books.models import Book
from categories.models import Category
import base64
from django.core.files.base import ContentFile


class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = ['id', 'title', 'content_text', 'audio']

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'name', 'image', 'description', 'publication_date']     

class ChaptersSerializer(serializers.ModelSerializer):
    name= serializers.CharField(source='book.name', read_only=True)  
    
    class Meta:
        model = Chapter
        fields = ['id', 'book', 'name', 'is_accept', 'title', 'content_text', 'audio']         



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
           

class ChapterDeleteSerializer(serializers.Serializer):
    id = serializers.IntegerField()

    def delete(self):
        chapter_id = self.validated_data['id']
        try:
            chapter = Chapter.objects.get(id=chapter_id)
            chapter.delete()
            return True
        except Chapter.DoesNotExist:
            raise serializers.ValidationError("Chapter not found.")      
        


class ChapterAcceptSerializer(serializers.Serializer):
    id = serializers.IntegerField()

    def update(self):
        chapter_id = self.validated_data['id']
        try:
            chapter = Chapter.objects.get(id=chapter_id)
            chapter.is_accept = True  
            chapter.save()
            return chapter
        except Chapter.DoesNotExist:
            raise serializers.ValidationError("Chapter not found.")        
        
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['id', 'note']

