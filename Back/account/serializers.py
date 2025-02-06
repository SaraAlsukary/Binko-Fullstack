from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    class Meta:
        model = CustomUser
        fields = ['name', 'username', 'password', 'confirm_password','is_admin', 'is_supervisor']
        extra_kwargs = {'password': {'write_only': True}}
    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"password": "كلمات المرور غير متطابقة."})
        return attrs   

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        user = CustomUser(
            name=validated_data['name'],
            username=validated_data['username'],
            is_admin=validated_data.get('is_admin', False),
            is_supervisor=validated_data.get('is_supervisor', False)
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    

class LoginSerializer(serializers.Serializer):
    username = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            
            user = authenticate(username=username, password=password)  
            
            if user:
                if not user.is_active:
                    raise serializers.ValidationError("الحساب معطل.")
                data['user'] = user
            else:
                raise serializers.ValidationError("بيانات تسجيل الدخول غير صحيحة.")
        else:
            raise serializers.ValidationError("يجب إدخال البريد الإلكتروني وكلمة المرور.")
        
        return data
    
class LogoutSerializer(serializers.Serializer):
    token = serializers.CharField()         



class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'name', 'image', 'discriptions']