from django.shortcuts import render
from chapters.models import Chapter
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Notification
from books.models import Book_Fav , Book ,Like
from comments.models import Comment
from django.shortcuts import get_object_or_404
from .serializers import NotificationSerializer
from account.models import CustomUser
from dislikes.models import Dislike
@api_view(['PATCH'])
def accept_chapter(request, chapter_id):
    try:
        chapter = Chapter.objects.get(pk=chapter_id)
    except Chapter.DoesNotExist:
        return Response({"error": "الفصل غير موجود"}, status=status.HTTP_404_NOT_FOUND)

    if chapter.is_accept:
        return Response({"message": "تم قبول هذا الفصل مسبقًا."}, status=status.HTTP_400_BAD_REQUEST)

    # تحديث حالة الفصل ليصبح مقبولاً
    chapter.is_accept = True
    chapter.save()

    # جلب المستخدمين الذين أضافوا الكتاب إلى المفضلة
    favorites = Book_Fav.objects.filter(book=chapter.book)

    # إنشاء الإشعارات
    notifications = [
        Notification(
            user=fav.user,
            book=chapter.book,
            chapter=chapter,
            message_ar=f"تمت إضافة فصل جديد '{chapter.title}' في كتاب '{chapter.book.name}'",
            message_en=f"A new chapter '{chapter.title}' has been added to the book '{chapter.book.name}'"
        )
        for fav in favorites
    ]
    Notification.objects.bulk_create(notifications)

    return Response(
        {"message": f"تم قبول الفصل '{chapter.title}' وإرسال الإشعارات."},
        status=status.HTTP_200_OK
    )


@api_view(['GET'])
def list_notifications(request, user_id):
    notifications = Notification.objects.filter(user_id=user_id).order_by('-created_at')
    serializer = NotificationSerializer(notifications, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['PATCH'])
def mark_all_notifications_as_read(request, user_id):
    # تحديث جميع الإشعارات الخاصة بالمستخدم
    updated = Notification.objects.filter(user_id=user_id, is_read=False).update(is_read=True)

    return Response(
        {"message": f"تم تعليم {updated} إشعار/إشعارات كمقروءة."},
        status=status.HTTP_200_OK
    )
@api_view(['GET'])
def unread_notifications_count(request, user_id):
    count = Notification.objects.filter(user_id=user_id, is_read=False).count()
    return Response(
        {"unread_count": count},
        status=status.HTTP_200_OK
    )
@api_view(['POST'])
def like_book(request, user_id, book_id):
    user = get_object_or_404(CustomUser, pk=user_id)
    book = get_object_or_404(Book, pk=book_id)

    # إذا كان المستخدم قد وضع عدم إعجاب سابقاً، احذفه
    Dislike.objects.filter(user=user, book=book).delete()

    # تحقق إذا كان الإعجاب موجودًا مسبقًا
    like, created = Like.objects.get_or_create(user=user, book=book)
    if not created:
        return Response({"message": "لقد أعجبت بهذا الكتاب مسبقاً."}, status=status.HTTP_400_BAD_REQUEST)

    # إنشاء الإشعار لصاحب الكتاب
    Notification.objects.create(
        user=book.user,
        book=book,
        message_ar=f"قام {user.name} بالإعجاب بكتابك '{book.name}'",
        message_en=f"{user.name} liked your book '{book.name}'"
    )

    return Response({"message": "تم الإعجاب وإرسال الإشعار."}, status=status.HTTP_201_CREATED)


    return Response({"message": "تم الإعجاب وإرسال الإشعار."}, status=status.HTTP_201_CREATED)
@api_view(['POST'])
def comment_book(request, user_id, book_id):
    user = get_object_or_404(CustomUser, pk=user_id)
    book = get_object_or_404(Book, pk=book_id)

    comment_text = request.data.get('comment', '').strip()
    if not comment_text:
        return Response({"error": "التعليق مطلوب"}, status=status.HTTP_400_BAD_REQUEST)

    # حفظ التعليق
    comment = Comment.objects.create(user=user, book=book, comment=comment_text)

    # إنشاء الإشعار لصاحب الكتاب
    Notification.objects.create(
        user=book.user,
        book=book,
        message_ar=f"قام {user.name} بالتعليق على كتابك '{book.name}': {comment_text}",
        message_en=f"{user.name} commented on your book '{book.name}': {comment_text}"
    )

    # إعادة تفاصيل التعليق
    return Response({
        "id": comment.id,
        "user_name": user.name,
        "user_image": user.image.url if user.image else None,
        "comment": comment.comment
    }, status=status.HTTP_201_CREATED)

    return Response({"message": "تم إضافة التعليق وإرسال الإشعار."}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def dislike_book(request, user_id, book_id):
    user = get_object_or_404(CustomUser, pk=user_id)
    book = get_object_or_404(Book, pk=book_id)

    # التحقق إذا كان المستخدم وضع عدم إعجاب مسبقاً
    if Dislike.objects.filter(user=user, book=book).exists():
        return Response({"message": "لقد وضعت عدم إعجاب مسبقاً."}, status=status.HTTP_400_BAD_REQUEST)

    # حذف الإعجاب إن وجد
    Like.objects.filter(user=user, book=book).delete()

    # إنشاء عدم الإعجاب
    Dislike.objects.create(user=user, book=book)

    # إنشاء الإشعار لصاحب الكتاب
    Notification.objects.create(
        user=book.user,
        book=book,
        message_ar=f"قام {user.name} بعدم الإعجاب بكتابك '{book.name}'",
        message_en=f"{user.name} disliked your book '{book.name}'"
    )

    return Response({"message": "تم تسجيل عدم الإعجاب وإرسال الإشعار."}, status=status.HTTP_201_CREATED)

