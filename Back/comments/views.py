from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import CommentSerializer  ,GetCommentSerializer,DeleteCommentSerializer
from django.shortcuts import get_object_or_404
from books.models import Book
from account.models import CustomUser
from django.http import JsonResponse
from .models import Comment
@api_view(['POST'])
def add_comment(request, book_id, user_id): 
    book = get_object_or_404(Book, id=book_id)
    user = get_object_or_404(CustomUser, id=user_id)
    serializer = CommentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(book=book, user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_book_comments(request, book_id):
    try:
        book = Book.objects.get(id=book_id)  # البحث عن الكتاب
    except Book.DoesNotExist:
        return JsonResponse({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

    comments = Comment.objects.filter(book=book)  # جلب جميع التعليقات الخاصة بالكتاب
    serializer = CommentSerializer(comments, many=True)  # تحويل البيانات إلى JSON

    return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_all_comments(request):
    comments = Comment.objects.select_related('user', 'book').all()  
    serializer = GetCommentSerializer(comments, many=True)
    return JsonResponse(serializer.data, safe=False, status=200)


@api_view(['DELETE'])
def delete_comment(request, comment_id):
    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return Response({'error': 'Comment not found.'}, status=status.HTTP_404_NOT_FOUND)

    comment.delete()
    return Response({'message': 'Comment deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)