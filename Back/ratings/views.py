from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import Avg
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from .serializer import RatingSerializer  , BookWithRatingSerializer
from .models import Rating
from account.models import CustomUser
from books.models import Book
from rest_framework import status
@api_view(['POST'])
def rate_book(request, user_id, book_id):
    try:
        user = CustomUser.objects.get(id=user_id)
        book = Book.objects.get(id=book_id)
    except CustomUser.DoesNotExist:
        return Response({'error': 'المستخدم غير موجود'}, status=status.HTTP_404_NOT_FOUND)
    except Book.DoesNotExist:
        return Response({'error': 'الكتاب غير موجود'}, status=status.HTTP_404_NOT_FOUND)

    serializer = RatingSerializer(data=request.data)
    if serializer.is_valid():
        # احذف التقييم السابق (إن وجد)
        Rating.objects.filter(user=user, book=book).delete()
        # احفظ التقييم الجديد
        Rating.objects.create(user=user, book=book, value=serializer.validated_data['value'])
        return Response({'message': 'تم حفظ التقييم بنجاح'}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def top_books_rated_7_to_10(request):
    books = Book.objects.annotate(average_rating=Avg('ratings__value')) \
        .filter(average_rating__gte=7, average_rating__lte=10) \
        .order_by('-average_rating')

    serializer = BookWithRatingSerializer(books, many=True)
    return Response(serializer.data)
