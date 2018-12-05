"""Link Form App's Model

UserLink
 + anchor (char)
 + url (url)
"""
from django.db import models
from django.contrib.auth.models import User

class UserLink(models.Model):
    """
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    anchor = models.CharField(max_length=100)
    url = models.URLField()
    
    def __str__(self):
        return "{self.anchor} : {self.url}"