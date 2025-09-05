from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import send_mail
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


"""@api_view(['POST'])
def login_user(request):
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.validated_data['user']

        # تحقق من قبول المستخدم
        if not user.is_accept:
            return Response({
                'message': 'لم يتم قبول حسابك بعد من الإدارة.'
            }, status=status.HTTP_403_FORBIDDEN)

        # تسجيل الدخول وإنشاء التوكن
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)

        return Response({
            'message': 'تم تسجيل الدخول بنجاح.',
            'token': token.key,
            'user': user_serializer.data,
        }, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)"""
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
        return Response({'error': 'المستخدم غير موجود'}, status=status.HTTP_404_NOT_FOUND)
    
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

@api_view(['GET'])
def accepted_users(request):
    users = CustomUser.objects.filter(is_accept=True)
    serializer = UserSerializer(users, many=True)
    return JsonResponse(serializer.data, safe=False)

@api_view(['GET'])
def unaccepted_users(request):
    users = CustomUser.objects.filter(is_accept=False)
    serializer = UserSerializer(users, many=True)
    return JsonResponse(serializer.data, safe=False)


@api_view(['POST'])
def accept_user(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return Response({"error": "المستخدم غير موجود."}, status=status.HTTP_404_NOT_FOUND)

    # تحديث حالة القبول
    user.is_accept = True
    user.save()

    # إرسال البريد الإلكتروني
    subject = "تم قبولك في موقع القراء والكتاب"
    message = f"مرحباً {user.name},\n\nتم قبولك بنجاح في موقع القراء والكتاب! يمكنك الآن تسجيل الدخول والاستفادة من جميع المزايا.\n\nتحياتنا،\nفريق موقع القراء والكتاب"
    from_email = "noreply@readers-writers.com"
    recipient_list = [user.username]  # لأن username هو البريد

    try:
        send_mail(subject, message, from_email, recipient_list)
    except Exception as e:
        return Response({"error": f"تم تحديث حالة القبول لكن فشل إرسال البريد: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


    return Response({"message": "تم قبول المستخدم وإرسال بريد تأكيد."}, status=status.HTTP_200_OK) 

@api_view(['GET'])
def get_all_readers(request):
    readers = CustomUser.objects.filter(is_reader=True, is_accept=True)
    serializer = CustomrUserSerializer(readers, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_all_writers(request):
    writer = CustomUser.objects.filter(is_reader=False , is_accept=True)
    serializer = CustomrUserSerializer(writer, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def login_user(request):
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.validated_data['user']

        # تحقق من قبول المستخدم
        if not user.is_accept:
            return Response({
                'message': 'لم يتم قبول حسابك بعد من الإدارة.'
            }, status=status.HTTP_403_FORBIDDEN)

        # تسجيل الدخول وإنشاء التوكن
        login(request, user)
        token, created = Token.objects.get_or_create(user=user)
        user_serializer = UserSerializer(user)

        return Response({
            'message': 'تم تسجيل الدخول بنجاح.',
            'token': token.key,
            'user': user_serializer.data,  # يعرض الحقول المطلوبة الآن
        }, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def reject_user(request, user_id):
    
    try:
        user = CustomUser.objects.get(id=user_id)
        user_email = user.username   # عندك الـ username هو EmailField
        user_name = user.name

        subject = "رفض تسجيلك في الموقع"
        message = f"""
        عزيزي {user_name}،

        نأسف لإبلاغك بأن طلب تسجيلك في موقعنا قد تم رفضه.

        

        مع التحية،
        فريق الموقع
        """

        # إرسال الإيميل
        send_mail(subject, message, None, [user_email])

        # حذف المستخدم بعد إرسال الإيميل
        user.delete()

        return Response(
            {"message": "تم رفض المستخدم وإرسال الملاحظة عبر الإيميل."},
            status=status.HTTP_200_OK
        )

    except CustomUser.DoesNotExist:
        return Response(
            {"error": "المستخدم غير موجود."},
            status=status.HTTP_404_NOT_FOUND
        )
    except Exception as e:
        return Response(
            {"error": f"فشل إرسال الإيميل: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )