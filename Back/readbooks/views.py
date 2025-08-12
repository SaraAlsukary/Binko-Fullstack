from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import BookReadSerializer , MostReadBookSerializer
from books.models import Book
from django.db.models import Count
@api_view(['POST'])
def add_book_read(request):
    serializer = BookReadSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "تمت إضافة الكتاب إلى قائمة الكتب المقروءة."}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def most_read_books(request):
    books = (
        Book.objects.filter(is_accept=True) 
        .annotate(read_count=Count('reads'))
        .order_by('-read_count')
    )
    serializer = MostReadBookSerializer(books, many=True)
    return Response(serializer.data)
