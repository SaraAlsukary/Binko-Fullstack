from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view , parser_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Book_Fav , Book ,Book_Category ,Like
from account.models import CustomUser
from account.models import CustomUser
from .serializers import BooksSerializer,AddBookSerializer,BookFavSerializer,LikeSerializer,FavoriteBookSerializer , BookCatSerializer ,BookDetailsSerializer
from account.models import CustomUser
from .serializers import BookSerializer ,BookLikesSerializer ,AddBookCatSerializer,BookLikeSerializer
from categories.models import Category
from .serializers import  NoteSerializer ,BookUpdateSerializer ,BookLikedSerializer , LatestBookSerializer
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.parsers import MultiPartParser, FormParser ,JSONParser
from .utils import recommend_books_simple , recommend_books_same_categories

@api_view(['GET'])
def recommended_books(request, user_id):
    books = recommend_books_simple(user_id, limit=10)
    serializer = BookSerializer(books, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def favorite_books(request, user_id):
    try:
        favorite_books = Book_Fav.objects.filter(user_id=user_id).select_related('book')
        serializer = BooksSerializer([fav.book for fav in favorite_books], many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def delete_book_fav(request, user_id, book_id) :
    user = get_object_or_404(CustomUser, id=user_id)  
    book = get_object_or_404(Book, id=book_id) 

    favorite = Book_Fav.objects.filter(user=user, book=book).first()  

    if favorite:
        favorite.delete()
        return Response({"message": "تم حذف الكتاب من المفضلة "}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "هذا الكتاب غير موجود في المفضلة"}, status=status.HTTP_404_NOT_FOUND)  



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



@api_view(['GET'])
def get_books_by_category(request, category_id):
    try:
        category = Category.objects.get(id=category_id)
        book_ids = Book_Category.objects.filter(category=category).values_list('book_id', flat=True)
        books = Book.objects.filter(id__in=book_ids, is_accept=True).prefetch_related('ratings')
        serializer = BooksSerializer(books, many=True)
        return JsonResponse(serializer.data, safe=False)
    except Category.DoesNotExist:
        return JsonResponse({"error": "Category not found."}, status=404)
    
api_view(['GET'])
def get_all_books(request):
    books = Book.objects.filter(is_accept=True)
    serializer = BooksSerializer(books, many=True)
    return JsonResponse(serializer.data, safe=False)
@api_view(['GET'])
def get_book_by_id(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
        serializer = BookSerializer(book)
        return JsonResponse(serializer.data, safe=False)
    except Book.DoesNotExist:
        return JsonResponse({'error': 'Book not found'}, status=404)

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


@api_view(['POST'])
def toggle_like(request, user_id, book_id):
    user = get_object_or_404(CustomUser, id=user_id)  
    book = get_object_or_404(Book, id=book_id) 

    like, created = Like.objects.get_or_create(user=user, book=book)

    if created:
        return Response({"message": "تم تسجيل الإعجاب بالكتاب "}, status=status.HTTP_201_CREATED)
    else:
        like.delete()  
        return Response({"message": "تم إلغاء الإعجاب بالكتاب "}, status=status.HTTP_200_OK)
    


@api_view(['PATCH']) 
def update_note(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = NoteSerializer(book, data=request.data, partial=True) 
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET']) 
def get_note(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = NoteSerializer(book)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def book_likes(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = BookLikesSerializer(book)
    return Response(serializer.data, status=status.HTTP_200_OK)

#add
@api_view(['POST'])
def add_book_by_cat(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)  
    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    data = request.data.copy()  
    data['user'] = user.id   

    serializer = AddBookCatSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def get_like_status(request, user_id, book_id):
    try:
        book = Book.objects.get(id=book_id) 
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = BookLikeSerializer(book, context={'user_id': user_id}) 
    return Response(serializer.data)


@api_view(['POST'])
def reject_book_with_note(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
    except Book.DoesNotExist:
        return JsonResponse({'error': 'الكتاب غير موجود'}, status=404)

   
    book.is_accept = False
    book.note = request.data.get('note', 'لم يتم تحديد ملاحظة.')
    book.save()
    user_email = book.user.username  
    subject = f'رفض كتابك: {book.name}'
    message = f"""مرحباً {book.user.name}،\n\n
نأسف لإبلاغك بأنه تم رفض كتابك "{book.name}".\n
الملاحظة: {book.note}\n
يرجى مراجعة الملاحظات وإعادة رفع الكتاب بعد التعديل.\n\n
شكراً لتفهمك.
"""
    try:
        send_mail(subject, message, settings.EMAIL_HOST_USER, [user_email], fail_silently=False)
    except Exception as e:
        return JsonResponse({'error': f'فشل إرسال الإيميل: {str(e)}'}, status=500)
    book.delete()

    return JsonResponse({'message': 'تم رفض الكتاب وإرسال الملاحظة بنجاح.'}, status=200)



@api_view(['PUT'])
@parser_classes([JSONParser])
def update_books(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
    except Book.DoesNotExist:
        return Response({'error': 'الكتاب غير موجود'}, status=status.HTTP_404_NOT_FOUND)

    serializer = BookUpdateSerializer(book, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'تم تحديث الكتاب والفئات والشباتر، وتم رفضه تلقائيًا'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def like_book(request, user_id, book_id):
    try:
        book = Book.objects.get(id=book_id)
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    
    like, created = Like.objects.get_or_create(user=user, book=book)

    if created:
        return Response({'message': 'Book liked successfully'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'message': 'You already liked this book'}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['DELETE'])
def unlike_book(request, user_id, book_id):
    try:

        like = Like.objects.get(user_id=user_id, book_id=book_id)
        like.delete()
        return Response({'message': 'Like removed successfully'}, status=status.HTTP_204_NO_CONTENT)
    except Like.DoesNotExist:
        return Response({'error': 'Like not found'}, status=status.HTTP_404_NOT_FOUND)    
    


@api_view(['GET'])
def liked_books(request, user_id):
    try:
        likes = Like.objects.filter(user_id=user_id)
        books = Book.objects.filter(like__in=likes)
        serializer = BookLikedSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
def update_book(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = BookUpdateSerializer(book, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Book updated successfully'})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)        
    
@api_view(['GET'])
def recommended_books_for_book(request, book_id):
    # تحقّق أن الكتاب موجود
    if not Book.objects.filter(id=book_id).exists():
        return Response({'detail': 'الكتاب غير موجود'}, status=status.HTTP_404_NOT_FOUND)

    books = recommend_books_same_categories(book_id, limit=5)
    data = BookSerializer(books, many=True).data
    return Response(data)

@api_view(['GET'])
def latest_books(request):
    books = (
        Book.objects.filter(is_accept=True)
        .order_by('-publication_date')  # ترتيب تنازلي بالأحدث
    )
    serializer = LatestBookSerializer(books, many=True)
    return Response(serializer.data)    
    