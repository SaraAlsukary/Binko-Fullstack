from django.db import models
from account.models import CustomUser
from books.models import Book

class Rating(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='ratings')
    value = models.FloatField() 

    class Meta:
        unique_together = ('user', 'book')
