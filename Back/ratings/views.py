from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import Avg
from rest_framework.decorators import api_view 
from rest_framework.response import Response
from .serializer import RatingSerializer  , BookWithRatingSerializer , RatingCheckSerializer
from .models import Rating
from account.models import CustomUser
from books.models import Book
from rest_framework import status
@api_view(['POST'])
def add_rating(request, user_id, book_id):
    value = request.data.get('value')  # احصل على قيمة التقييم من جسم الطلب

    try:
        user = CustomUser.objects.get(id=user_id)  # استخدم user_pk للبحث عن المستخدم
        book = Book.objects.get(id=book_id)  # استخدم book_pk للبحث عن الكتاب
    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

    # تحقق مما إذا كان المستخدم قد قام بتقييم الكتاب بالفعل
    if Rating.objects.filter(user=user, book=book).exists():
        return Response({'error': 'You have already rated this book'}, status=status.HTTP_400_BAD_REQUEST)

    # إذا لم يكن قد قيم الكتاب، قم بإنشاء تقييم جديد
    rating = Rating(user=user, book=book, value=value)
    rating.save()

    serializer = RatingSerializer(rating)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def top_books_rated_7_to_10(request):
    books = Book.objects.annotate(average_rating=Avg('ratings__value')) \
        .filter(average_rating__gte=7, average_rating__lte=10) \
        .order_by('-average_rating')

    serializer = BookWithRatingSerializer(books, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def check_user_rating(request, user_id, book_id):
    try:
        rating = Rating.objects.get(user_id=user_id, book_id=book_id)
        data = {
            "rated": True,
            "rating_value": rating.value
        }
    except Rating.DoesNotExist:
        data = {
            "rated": False
        }

    serializer = RatingCheckSerializer(data)
    return Response(serializer.data, status=status.HTTP_200_OK)
