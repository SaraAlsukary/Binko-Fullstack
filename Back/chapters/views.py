from rest_framework.decorators import api_view
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework import status
from account.models import CustomUser
from books.models import Book
from .models import Chapter
from .serializers import ChapterAcceptSerializer ,ChapterSerializer,ChaptersSerializer, ChapterDeleteSerializer
from django.http import JsonResponse
from .serializers import NoteSerializer , BooksSerializer
from django.db.models import Q


@api_view(['GET'])
def get_book_chapters_if_accept(request, book_id):
    try:
        book = Book.objects.get(id=book_id)
    except Book.DoesNotExist:
        return JsonResponse({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)
    chapters = book.chapters.filter(is_accept=True) 
    serializer = ChapterSerializer(chapters, many=True)
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
    
@api_view(['GET'])
def unaccepted_chapters(request):
    chapters = Chapter.objects.filter(is_accept=False)
    serializer = ChaptersSerializer(chapters, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
def delete_chapter(request, chapter_id):
    
    serializer = ChapterDeleteSerializer(data={'id': chapter_id})
    
    if serializer.is_valid():
        serializer.delete()
        return Response({"message": "Chapter deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['PATCH'])
def accept_chapter(request, chapter_id):
    serializer = ChapterAcceptSerializer(data={'id': chapter_id})
    
    if serializer.is_valid():
        serializer.update() 
        return Response({"message": "Chapter accepted successfully."}, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    

@api_view(['GET', 'PATCH'])  # نستخدم GET لاسترجاع و PATCH لتحديث الملاحظة
def manage_note(request, chapter_id):
    try:
        chapter = Chapter.objects.get(id=chapter_id)
    except Chapter.DoesNotExist:
        return Response({'error': 'Chapter not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NoteSerializer(chapter)
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == 'PATCH':
        serializer = NoteSerializer(chapter, data=request.data, partial=True)  # استخدام partial=True لتحديث فقط الحقول المحددة
        if serializer.is_valid():
            serializer.save()  # حفظ التغييرات
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def reject_chapter(request, chapter_id):
    note = request.data.get('note', 'تم رفض الشابتر دون تحديد سبب.')
    
    try:
        chapter = Chapter.objects.get(id=chapter_id)
        chapter.is_accept = False
        chapter.note = note
        chapter.save()
        # جلب إيميل المستخدم
        user_email = chapter.book.user.username  # حسب ما ذكرت username هو الإيميل
        user_name = chapter.book.user.name

        subject = "رفض الشابتر: " + chapter.title
        message = f"""
        عزيزي {user_name}،

        نأسف لإبلاغك بأن الشابتر بعنوان: "{chapter.title}" قد تم رفضه.

        السبب: {note}

        يمكنك تعديل الشابتر وإعادة رفعه للمراجعة.

        مع التحية،
        فريق الموقع
        """
        send_mail(subject, message, None, [user_email])
        chapter.delete()

        return Response({"message": "تم رفض الشابتر وإرسال الملاحظة عبر الإيميل."}, status=status.HTTP_200_OK)
              
    except Chapter.DoesNotExist:
        return Response({"error": "الشابتر غير موجود."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": f"فشل إرسال الإيميل: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)        
    

@api_view(['GET'])
def search_books(request):
    query = request.GET.get('q', '')

    books = Book.objects.filter(
        Q(name__icontains=query) |
        Q(user__name__icontains=query) |
        Q(publication_date__icontains=query) |
        Q(book_category__category__name__icontains=query)
    ).distinct()

    serializer = BooksSerializer(books, many=True)
    return Response(serializer.data)