from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import CommentSerializer ,UserCommentSerializer
from django.shortcuts import get_object_or_404
from books.models import Book
from account.models import CustomUser
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


"""@api_view(['GET'])
def get_comments_for_book(request, book_id):
    comments = Comment.objects.filter(book=book_id)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)
"""
@api_view(['GET'])
def get_comments_by_book(request, book_id):
    try:
    
        comments = Comment.objects.filter(book_id=book_id)  
    except comments.DoesNotExist:
        return Response({'error': 'comment not found.'}, status=status.HTTP_404_NOT_FOUND)    
    serializer = UserCommentSerializer(comments, many=True)  
    return Response(serializer.data)