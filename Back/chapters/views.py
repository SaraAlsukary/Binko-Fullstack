from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from account.models import CustomUser
from books.models import Book
from .serializers import BookSerializer ,ChapterSerializer
from django.http import JsonResponse

@api_view(['POST'])
def add_book_with_chapters(request, user_id):
    # التحقق من وجود المستخدم بناءً على user_id في الرابط
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    # إضافة المستخدم إلى البيانات القادمة من الطلب
    data = request.data.copy()
    data['user'] = user.id

    # التحقق من البيانات باستخدام السيريالايزر
    serializer = BookSerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=user)  # إنشاء الكتاب وربطه بالمستخدم
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
    
    # إرجاع الأخطاء إذا كانت البيانات غير صالحة
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