from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Book_Fav , Book ,Book_Category
from account.models import CustomUser
from account.models import CustomUser
from .serializers import BooksSerializer,AddBookSerializer,BookFavSerializer, FavoriteBookSerializer , BookCatSerializer ,BookDetailsSerializer
from account.models import CustomUser
from .serializers import BookSerializer
from categories.models import Category
@api_view(['GET'])
def favorite_books(request, user_id):
    try:
        favorite_books = Book_Fav.objects.filter(user_id=user_id).select_related('book')
        serializer = BooksSerializer([fav.book for fav in favorite_books], many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_book_fav(request, pk):
    try:
        book_fav = Book_Fav.objects.get(pk=pk)
    except Book_Fav.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    book_fav.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)    



@api_view(['POST'])
def add_favorite_book(request):
    serializer = FavoriteBookSerializer(data=request.data)
    
    if serializer.is_valid():
        user_id = request.data.get('user')
        book_id = request.data.get('book')
        
        try:
            user = CustomUser.objects.get(id=user_id)
            book = Book.objects.get(id=book_id)
            
            favorite_book = Book_Fav(user=user, book=book)
            favorite_book.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Book.DoesNotExist:
            return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    



def get_books_by_category(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
        book_ids = Book_Category.objects.filter(category=category).values_list('book_id', flat=True)
        books = Book.objects.filter(id__in=book_ids , is_accept=True )
        serializer = BooksSerializer(books, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Category.DoesNotExist:
        return JsonResponse({"error": "Category not found."}, status=404)
    

api_view(['GET'])
def get_all_books(request):
    books = Book.objects.filter(is_accept=True)
    serializer = BooksSerializer(books, many=True)
    return JsonResponse(serializer.data, safe=False)

api_view(['GET'])
def get_all_books_to_accept(request):
    books = Book.objects.filter(is_accept=False)
    serializer = BooksSerializer(books, many=True)
    return JsonResponse(serializer.data, safe=False)        

api_view(['GET'])
def get_my_book(request , user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    books = Book.objects.filter(user=user)
    serializer = BooksSerializer(books, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['DELETE'])
def delete_book(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def add_book(request, user_id):
    data = request.data.copy()
    data['user'] = user_id  

    serializer = AddBookSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    
    

@api_view(['PATCH'])
def accept_book(request, pk):
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    book.is_accept = True
    book.save()

    serializer = BookSerializer(book)
    return Response(serializer.data, status=status.HTTP_200_OK)
