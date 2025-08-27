from django.db import models
from account.models import CustomUser
from chapters .models import Chapter
from books.models import Book
class Notification(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notifications')
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE, related_name='notifications', null=True, blank=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='notifications', null=True, blank=True)
    message_ar = models.TextField()
    message_en = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        status = "مقروء" if self.is_read else "غير مقروء"
        return f"{self.user.username} - {status} - {self.message[:20]}"
