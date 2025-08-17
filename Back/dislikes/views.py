from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import BookDislikeSerializer,DeleteDislikeSerializer ,BookDisLikeSerializer , DislikeCountSerializer
from rest_framework import serializers
from books.models import Book
from .models import Dislike
from django.shortcuts import get_object_or_404
@api_view(['POST'])
def dislike_book(request):
    serializer = BookDislikeSerializer(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save()
            return Response(
                {"message": "تم تسجيل عدم الإعجاب وحذف الإعجاب إن وُجد."},
                status=status.HTTP_201_CREATED
            )
        except serializers.ValidationError as e:
            return Response({"error": str(e.detail[0])}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])  # نستخدم POST بدل DELETE لأنه يحتوي على body
def remove_dislike(request):
    serializer = DeleteDislikeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.delete()
        return Response({"message": "تم حذف عدم الإعجاب بنجاح."}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_dis_like_status(request, user_id, book_id):
    try:
        book = Book.objects.get(id=book_id) 
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = BookDisLikeSerializer(book, context={'user_id': user_id}) 
    return Response(serializer.data)

@api_view(['GET'])
def get_dislike_count(request, book_id):
    # تحقق من وجود الكتاب
    book = get_object_or_404(Book, id=book_id)
    
    # احسب عدد الـ dislikes للكتاب
    dislike_count = Dislike.objects.filter(book=book).count()
    
    # إعداد البيانات للرد
    data = {
        'book_id': book_id,
        'dislike_count': dislike_count
    }
    
    serializer = DislikeCountSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    
    return Response(serializer.data)