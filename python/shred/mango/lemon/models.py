from django.db import models

# created at 11.1 by `gbkim`

# Create your models here.
class Lemon(models.Model):
    created_on = models.DateTimeField("Created on", auto_now_add=True)
    message = models.CharField("Message", max_length=512)
    description = models.TextField("Description")

    def __str__ (self):
        return self.message

    class Meta:
        verbose_name = "Lemon"
        verbose_name_plural = "Lemons"
        # first, order by 'created_on', after that order by 'title'
        ordering = ['-created_on', 'message']
