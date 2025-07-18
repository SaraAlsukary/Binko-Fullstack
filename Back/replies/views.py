# views.py
from rest_framework.decorators import api_view
from account.models import CustomUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response 
from django.http import JsonResponse
from rest_framework import status
from .models import Comment, Reply
from .serializers import ReplySerializer ,GetReplySerializer ,Repliesrializer ,ReplysSerializer ,ReplyToReplySerializer

@api_view(['GET'])
def get_replies_for_comment(request, comment_id):
    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return Response({'error': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)

    replies = Reply.objects.filter(comment=comment).select_related('user') 
    serializer = GetReplySerializer(replies, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def add_reply_to_comment(request, comment_id, user_id):
    try:
        comment = Comment.objects.get(id=comment_id)
        user = CustomUser.objects.get(id=user_id) 
    except Comment.DoesNotExist:
        return JsonResponse({"error": "Comment not found"}, status=status.HTTP_404_NOT_FOUND)
    except CustomUser.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    data = request.data.copy()
    data['comment'] = comment.id
    data['user'] = user.id 

    serializer = ReplySerializer(data=data)
    if serializer.is_valid():
        serializer.save(user=user) 
        return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)

    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_reply(request, reply_id):
    try:
        reply = Reply.objects.get(id=reply_id)
    except Reply.DoesNotExist:
        return Response({'error': 'Reply not found.'}, status=status.HTTP_404_NOT_FOUND)

    reply.delete()
    return Response({'message': 'Reply deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
@api_view(['GET'])
def get_replies(request, comment_id):
    try:
        # الحصول على التعليق باستخدام ID
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return Response({'error': 'Comment not found'}, status=status.HTTP_404_NOT_FOUND)

    # الحصول على الردود المرتبطة بالتعليق
    replies = comment.replies.all()  # استخدام related_name 'replies'
    
    # استخدام serializer لتحويل الردود إلى JSON
    serializer = Repliesrializer(replies, many=True)
    
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def add_reply(request, comment_id, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return Response({"error": "المستخدم غير موجود."}, status=status.HTTP_404_NOT_FOUND)

    try:
        comment = Comment.objects.get(id=comment_id)
    except Comment.DoesNotExist:
        return Response({"error": "التعليق غير موجود."}, status=status.HTTP_404_NOT_FOUND)

    parent_id = request.data.get('parent')  # رقم الرد الأب (اختياري)
    content = request.data.get('content')

    if not content:
        return Response({"error": "يجب إدخال نص الرد."}, status=status.HTTP_400_BAD_REQUEST)

    parent = None
    if parent_id:
        try:
            parent = Reply.objects.get(id=parent_id)
        except Reply.DoesNotExist:
            return Response({"error": "الرد الأب غير موجود."}, status=status.HTTP_404_NOT_FOUND)

    reply = Reply.objects.create(
        user=user,
        comment=comment,
        parent=parent,
        content=content
    )

    serializer = ReplysSerializer(reply)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
@api_view(['GET'])
def get_reply(request, comment_id):
    replies = Reply.objects.filter(comment_id=comment_id, parent=None)  # الردود الجذرية فقط
    serializer = ReplysSerializer(replies, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def reply_to_reply(request, user_id, comment_id, parent_reply_id):
    try:
        user = CustomUser.objects.get(id=user_id)
        comment = Comment.objects.get(id=comment_id)
        parent = Reply.objects.get(id=parent_reply_id)
    except CustomUser.DoesNotExist:
        return Response({'error': 'المستخدم غير موجود'}, status=status.HTTP_404_NOT_FOUND)
    except Comment.DoesNotExist:
        return Response({'error': 'التعليق غير موجود'}, status=status.HTTP_404_NOT_FOUND)
    except Reply.DoesNotExist:
        return Response({'error': 'الرد الأصلي غير موجود'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ReplyToReplySerializer(data=request.data)
    if serializer.is_valid():
        Reply.objects.create(
            user=user,
            comment=comment,
            parent=parent,
            content=serializer.validated_data['content']
        )
        return Response({'message': 'تم إضافة الرد بنجاح'}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)