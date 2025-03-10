from django.db import models
from account.models import CustomUser
from books.models import Book

class Comment(models.Model):
    user=models.ForeignKey(CustomUser , on_delete=models.CASCADE)
    book=models.ForeignKey(Book ,related_name='comments', on_delete=models.CASCADE)
    comment=models.CharField(max_length=250)

