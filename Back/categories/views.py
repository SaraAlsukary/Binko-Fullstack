from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Category
from books.models import Book
from chapters.models import  Chapter
from account.models import CustomUser
from .serializers import CategorySerializer , BookSerializer

@api_view(['GET'])
def getallcat(request):
    cat=Category.objects.all()
    serializer=CategorySerializer(cat , many=True)
    return Response(serializer.data)


@api_view(['POST'])
def add_category(request):
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_category(request, pk):
    try:
        category = Category.objects.get(pk=pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    


@api_view(['PUT'])
def update_category(request, pk):
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = CategorySerializer(category, data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    


@api_view(['GET'])
def books_with_rejected_chapters_by_user_category_match(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return Response({'error': 'المستخدم غير موجود'}, status=404)

    books = Book.objects.filter(
        book_category__category__name=user.category,
        chapters__is_accept=False
    ).distinct()

    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)