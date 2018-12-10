from django.contrib import admin

# Register your models here.
from .models import Profile, FamilyMember

admin.site.register(Profile)
admin.site.register(FamilyMember)