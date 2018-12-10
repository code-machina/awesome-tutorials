"""Link Form App's Model

UserLink
 + anchor (char)
 + url (url)
"""
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.conf import settings
from datetime import timezone

def get_sentinel_user():
    return get_user_model().objects.get_or_create(username='deleted')[0]

class UserLink(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    anchor = models.CharField(max_length=100)
    url = models.URLField()
    
    def __str__(self):
        return "{self.anchor} : {self.url}"


class Profile(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    created_date = models.DateTimeField(default=timezone.now)

class FamilyMember(models.Model):
    profile = models.ForeignKey(Profile)
    name = models.CharField(max_length=100)
    relationship = models.CharField(max_length=100)