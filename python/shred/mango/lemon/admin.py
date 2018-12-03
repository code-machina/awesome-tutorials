from django.contrib import admin

# Register your models here.

from lemon.models import Lemon

class LemonAdmin(admin.ModelAdmin):
    pass

admin.site.register(Lemon, LemonAdmin)