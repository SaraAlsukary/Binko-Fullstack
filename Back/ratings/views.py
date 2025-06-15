from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import Avg
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from .serializer import RatingSerializer  , BookWithRatingSerializer
from .models import Rating
from books.models import Book
@api_view(['POST'])
def add_rating(request):
    serializer = RatingSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.validated_data['user']
        book = serializer.validated_data['book']
        value = serializer.validated_data['value']

        rating, created = Rating.objects.update_or_create(
            user=user,
            book=book,
            defaults={'value': value}
        )

        return Response({
            'message': 'تم إضافة التقييم' if created else 'تم تحديث التقييم',
            'rating': RatingSerializer(rating).data
        }, status=200)
    return Response(serializer.errors, status=400)

@api_view(['GET'])
def top_books_rated_7_to_10(request):
    books = Book.objects.annotate(average_rating=Avg('ratings__value')) \
        .filter(average_rating__gte=7, average_rating__lte=10) \
        .order_by('-average_rating')

    serializer = BookWithRatingSerializer(books, many=True)
    return Response(serializer.data)
