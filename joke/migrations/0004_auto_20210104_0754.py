# Generated by Django 3.1.4 on 2021-01-04 15:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('joke', '0003_auto_20210104_0716'),
    ]

    operations = [
        migrations.AlterField(
            model_name='favoritejoke',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_fav_post', to=settings.AUTH_USER_MODEL),
        ),
    ]