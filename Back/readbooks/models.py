from django.db import models
from books.models import Book
from account.models import CustomUser
class BookRead(models.Model):
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='reads')
    user = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True)  # ممكن يكون None إذا القراءة بدون تسجيل دخول
    timestamp = models.DateTimeField(auto_now_add=True)



    class Meta:
        unique_together = ('user', 'book')

 
