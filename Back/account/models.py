from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    name=models.CharField(max_length=250)
    username=models.EmailField(unique=True)
    password=models.CharField(max_length=250)
    image = models.ImageField(upload_to='imgs/CustomUser', null=True, blank=True)
    is_admin = models.BooleanField(default=False)
    is_supervisor = models.BooleanField(default=False)
    discriptions=models.CharField(max_length=250 , null=True)


    def __str__(self):
        return self.username