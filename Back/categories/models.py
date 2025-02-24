from django.db import models

class Category(models.Model):
    name=models.CharField(max_length=250)
    name_arabic=models.CharField(max_length=250)
    file=models.FileField(upload_to='uploads/' , null=True)

    class Meta:
        db_table = 'categories'
