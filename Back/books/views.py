from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Book_Fav , Book ,Book_Category
from account.models import CustomUser
from account.models import CustomUser
from .serializers import BookSerializer , FavoriteBookSerializer , BookCatSerializer ,BookDetailsSerializer
from account.models import CustomUser
from categories.models import Category
@api_view(['GET'])
def favorite_books(request, user_id):
    try:
        favorite_books = Book_Fav.objects.filter(user_id=user_id).select_related('book')
        serializer = BookSerializer([fav.book for fav in favorite_books], many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
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
        # التحقق من وجود الفئة
        category = Category.objects.get(id=category_id)
        # جلب الكتب المرتبطة بالفئة عبر BookCategory
        book_ids = Book_Category.objects.filter(category=category).values_list('book_id', flat=True)
        books = Book.objects.filter(id__in=book_ids)
        serializer = BookSerializer(books, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Category.DoesNotExist:
        return JsonResponse({"error": "Category not found."}, status=404)
    

api_view(['GET'])
def get_all_books(request):
    books = Book.objects.all()
    serializer = BookSerializer(books, many=True)
    return JsonResponse(serializer.data, safe=False)    

api_view(['GET'])
def get_my_book(request , user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    # جلب جميع الكتب التي أضافها المستخدم
    books = Book.objects.filter(user=user)
    
    # تمرير البيانات إلى السيريالايزر
    serializer = BookSerializer(books, many=True)
    
    # إرجاع البيانات في JSON
    return JsonResponse(serializer.data, safe=False)


@api_view(['GET'])
def gets_all_books(request):
    # استعلام للحصول على جميع الكتب
    books = Book.objects.select_related('user').all()

    # تسلسل البيانات باستخدام السيريالايزر
    serializer = BookDetailsSerializer(books, many=True)
    return JsonResponse(serializer.data, safe=False, status=200)