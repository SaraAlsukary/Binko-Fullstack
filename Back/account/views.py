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
from .serializers import BookSerializer
from books.models import Book , Book_Category
from categories.models import Category
from rest_framework.authtoken.models import Token

@api_view(['POST'])
def create_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()  
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_user(request):
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.validated_data['user']
        login(request, user) 
        token, created = Token.objects.get_or_create(user=user)

    
        user_serializer = UserSerializer(user)

        return Response({
            'message': 'تم تسجيل الدخول بنجاح.',
            'token': token.key,
            'user': user_serializer.data,  
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

    serializer = CustomUserSerializer(user, data=request.data)
    if serializer.is_valid():
        serializer.save()

        # الحصول أو إنشاء التوكين
        token, _ = Token.objects.get_or_create(user=user)

        return Response({
            "user": serializer.data,
            "token": token.key
        }, status=status.HTTP_200_OK)

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
        return Response(status=status.HTTP_204_NO_CONTENT)  
    except CustomUser.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def create_supervisor(request):
    serializer = SupervisorUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def books_by_user_category(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return Response({'error': 'المستخدم غير موجود'}, status=status.HTTP_404_NOT_FOUND)

    user_category = user.category

    if not user_category:
        return Response({'message': 'المستخدم لا يملك فئة محددة'}, status=200)

    categories = Category.objects.filter(name=user_category)

    books = Book.objects.filter(
        id__in=Book_Category.objects.filter(category__in=categories).values_list('book_id', flat=True),
        is_accept=False  
    )

    serializer = BookSerializer(books, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def books_by_user_category_is_accept(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return Response({'error': 'المستخدم غير موجود'}, status=status.HTTP_404_NOT_FOUND)

    user_category = user.category

    if not user_category:
        return Response({'message': 'المستخدم لا يملك فئة محددة'}, status=200)

    
    categories = Category.objects.filter(name=user_category)

    
    books = Book.objects.filter(
        id__in=Book_Category.objects.filter(category__in=categories).values_list('book_id', flat=True),
        is_accept=True  
    )

    serializer = BookSerializer(books, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)