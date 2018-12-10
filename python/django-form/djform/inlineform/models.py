from __future__ import unicode_literals
from django.urls import reverse

from django.db import models
from django.utils import timezone


class Profile(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    created_date = models.DateTimeField(default=timezone.now)


    # def get_absolute_url(self):
    #     return reverse('profile-update', kwargs={'pk': self.pk})

    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name)

class FamilyMember(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    relationship = models.CharField(max_length=100)

    def __str__(self):
        return "%s %s" % (self.name, self.relationship)