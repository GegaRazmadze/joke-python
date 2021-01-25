from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, FavoriteJoke


class JokeAdmin(admin.ModelAdmin):
    list_display = ('joke_id', 'user_id', 'joke_type' , 'body', 'date')

# Register your models here.
admin.site.register(User, UserAdmin)
admin.site.register(FavoriteJoke)