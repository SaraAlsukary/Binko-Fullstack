from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import CustomUser
from .serializers import UserSerializer , LoginSerializer ,CustomrUserSerializer,LogoutSerializer ,CustomUserSerializer  ,SupervisorUserSerializer
from django.contrib.auth import login
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()  # احفظ المستخدم
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.validated_data['user']
        login(request, user)  # تسجيل دخول المستخدم
        token, created = Token.objects.get_or_create(user=user)

        # استخدام UserSerializer لإرجاع جميع بيانات المستخدم
        user_serializer = UserSerializer(user)

        return Response({
            'message': 'تم تسجيل الدخول بنجاح.',
            'token': token.key,
            'user': user_serializer.data,  # جميع بيانات المستخدم
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
        

@api_view(['PUT'])
def update_custom_user(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = CustomUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
def get_non_supervisor_users(request):
    users = CustomUser.objects.filter(is_supervisor=False)
    serializer = CustomUserSerializer(users, many=True)
    return Response(serializer.data)    

@api_view(['GET'])
def get_supervisor_users(request):
    users = CustomUser.objects.filter(is_supervisor=True)
    serializer = CustomUserSerializer(users, many=True)
    return Response(serializer.data)    


@api_view(['DELETE'])
def delete_user(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)  # استجابة بنجاح بدون محتوى
    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def create_supervisor(request):
    serializer = SupervisorUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


