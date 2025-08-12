from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import BookDislikeSerializer,DeleteDislikeSerializer
from rest_framework import serializers

@api_view(['POST'])
def dislike_book(request):
    serializer = BookDislikeSerializer(data=request.data)
    if serializer.is_valid():
        try:
            serializer.save()
            return Response(
                {"message": "تم تسجيل عدم الإعجاب وحذف الإعجاب إن وُجد."},
                status=status.HTTP_201_CREATED
            )
        except serializers.ValidationError as e:
            return Response({"error": str(e.detail[0])}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])  # نستخدم POST بدل DELETE لأنه يحتوي على body
def remove_dislike(request):
    serializer = DeleteDislikeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.delete()
        return Response({"message": "تم حذف عدم الإعجاب بنجاح."}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
