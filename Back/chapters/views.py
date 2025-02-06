from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from account.models import CustomUser
from books.models import Book
from .models import Chapter
from .serializers import BookSerializer ,ChapterSerializer
from django.http import JsonResponse

@api_view(['POST'])
def add_book_with_chapters(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    data = request.data.copy()
    data['user'] = user.id
    serializer = BookSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=user)  
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
def get_book_chapters(request, book_id):
    # التحقق من وجود الكتاب بناءً على رقم الكتاب
    try:
        book = Book.objects.get(id=book_id)
    except Book.DoesNotExist:
        return JsonResponse({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

    # جلب جميع الفصول المرتبطة بالكتاب
    chapters = book.chapters.all()  # استخدام العلاقة العكسية related_name="chapters"
    
    # تمرير البيانات إلى السيريالايزر
    serializer = ChapterSerializer(chapters, many=True)
    
    # إرجاع الفصول في JSON
    return JsonResponse(serializer.data, safe=False)

@api_view(['POST'])
def add_chapter(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
    except Book.DoesNotExist:
        return Response({'error': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        serializer = ChapterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(book=book)  # ربط الفصل بالكتاب
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

    