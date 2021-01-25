from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),

    path("chuck_jokes", views.chuck_jokes, name="chuck_jokes"),
    path("other_jokes", views.other_jokes, name="other_jokes"),

    path("add_delete_favorites/", views.add_delete_favorites, name="add_delete_favorites"),
    path("favorite_jokes/", views.favorite_jokes, name="favorite_jokes"),
]