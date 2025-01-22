from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from .serializers import UserSerializer , LoginSerializer ,LogoutSerializer
from django.contrib.auth import login
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    serializer = LoginSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.validated_data['user']
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        user_type = 'regular'
        if user.is_supervisor:
            user_type = 'superuser'
        elif user.is_admin:
            user_type = 'admin'
        
        return Response({
            'message': f'تم تسجيل الدخول بنجاح كـ {user_type}.',
            'user_type': user_type,
            'token': token.key,
            'username': user.username
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class LogoutView(APIView): 
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            token = request.auth
            token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)