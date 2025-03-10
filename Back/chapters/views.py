from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from account.models import CustomUser
from books.models import Book
from .models import Chapter
from .serializers import ChapterAcceptSerializer ,ChapterSerializer,ChaptersSerializer, ChapterDeleteSerializer
from django.http import JsonResponse

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
    # تمرير ID الشابتر إلى Serializer
    serializer = ChapterAcceptSerializer(data={'id': chapter_id})
    
    if serializer.is_valid():
        serializer.update()  # تحديث الحقل is_accept
        return Response({"message": "Chapter accepted successfully."}, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    