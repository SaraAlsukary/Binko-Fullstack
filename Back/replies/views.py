# views.py
from rest_framework.decorators import api_view
from account.models import CustomUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response 
from django.http import JsonResponse
from rest_framework import status
from .models import Comment, Reply
from .serializers import ReplySerializer ,GetReplySerializer

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




