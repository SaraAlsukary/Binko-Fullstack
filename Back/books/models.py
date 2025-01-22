from django.db import models
from account.models import CustomUser
from categories.models import Category
from account.models import CustomUser
from datetime import date

class Book(models.Model):
    user=models.ForeignKey(CustomUser ,on_delete=models.DO_NOTHING)
    name=models.CharField(max_length=250)
    image=models.ImageField(upload_to='imgs/Book' , null=True)
    description=models.CharField(max_length=2000)
    publication_date = models.DateField(null=True, blank=True, default=date.today)
    
    class Meta:
         db_table = 'books'


class Book_Category(models.Model):
     category=models.ForeignKey(Category , on_delete=models.DO_NOTHING)
     book=models.ForeignKey(Book, on_delete=models.DO_NOTHING)


class Book_Fav(models.Model):
     user=models.ForeignKey(CustomUser , on_delete=models.DO_NOTHING)
     book=models.ForeignKey(Book, on_delete=models.DO_NOTHING)