# Generated by Django 2.1.4 on 2018-12-05 04:18

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('lnkfrm', '0002_auto_20181205_1316'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userlink',
            name='user',
        ),
        migrations.AddField(
            model_name='userlink',
            name='user',
            field=models.ManyToManyField(default=None, to=settings.AUTH_USER_MODEL),
        ),
    ]