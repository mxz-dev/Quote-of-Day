from django.db import models

class Quote(models.Model):
    text = models.CharField(max_length=355)
    author = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f'{self.text} - {self.author}'
    