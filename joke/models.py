from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    def __str__(self):     
        return f"{self.username} ({self.id})"

# this method will be treated fild
    @property
    def favorite_jokes(self):
        return self.favorites.all()



JOKE_TYPE_CHOICES = (
    ('Chuck', 'Chuck'),
    ('OtherJoke', 'OtherJoke')
)

class FavoriteJoke(models.Model):
    joke_id = models.CharField(max_length=255, blank=False)
    user_id =  models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_fav_post")
    joke_type = models.CharField(choices=JOKE_TYPE_CHOICES, default='Chuck', max_length=20)
    body = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        # to be unique cuple / To Like only Once.
        unique_together = [['user_id', 'joke_id']]

    def __str__(self):       
        return f"{self.joke_id} : {self.user_id} ({self.joke_type}) \ Date ({self.date}) : text: {self.body}."