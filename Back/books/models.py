from django.db import models
from account.models import CustomUser
from categories.models import Category
from account.models import CustomUser
from datetime import date

class Book(models.Model):
    user=models.ForeignKey(CustomUser ,on_delete=models.CASCADE )
    name=models.CharField(max_length=250 )
    image=models.ImageField(upload_to='imgs/Book' , null=True)
    is_accept=models.BooleanField(default=False)
    description=models.CharField(max_length=2000)
    publication_date = models.DateField(null=True, blank=True, default=date.today)
    note=models.CharField(max_length=250 ,null=True)
    
    class Meta:
         db_table = 'books'


class Book_Category(models.Model):
     category=models.ForeignKey(Category , on_delete=models.CASCADE)
     book=models.ForeignKey(Book, on_delete=models.CASCADE )


class Book_Fav(models.Model):
     user=models.ForeignKey(CustomUser , on_delete=models.CASCADE )
     book=models.ForeignKey(Book, on_delete=models.CASCADE )

     class Meta:
        unique_together = ('user', 'book')

class Like(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'book')


