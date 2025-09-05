from rest_framework import serializers
from .models import Rating
from books.models import Book
class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['value']

class BookWithRatingSerializer(serializers.ModelSerializer):
    average_rating = serializers.FloatField()

    class Meta:
        model = Book
        fields = ['id', 'name', 'description', 'image','average_rating']        

class RatingCheckSerializer(serializers.Serializer):
    rated = serializers.BooleanField()
    rating_value = serializers.IntegerField(required=False)        