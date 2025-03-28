from django.db import models
from books.models import Book

class Chapter(models.Model):
    book=models.ForeignKey( Book,related_name="chapters" ,on_delete=models.CASCADE )
    is_accept=models.BooleanField(default=False)
    title=models.CharField(max_length=250)
    content_text=models.TextField()
    audio=models.FileField(upload_to='audio/', null=True, blank=True)
    note=models.CharField(max_length=250,null=True)
    class Meta:
        db_table='chapters'