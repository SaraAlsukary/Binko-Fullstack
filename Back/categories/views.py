from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Category
from .serializers import CatrgorySerializer

@api_view(['GET'])
def getallcat(request):
    cat=Category.objects.all()
    serializer=CatrgorySerializer(cat , many=True)
    return Response(serializer.data)