from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse

from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator

from .models import FavoriteJoke, User
from .forms import TypeChoiceForm


def index(request):
    return render(request, "joke/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "joke/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "joke/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "joke/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "joke/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "joke/register.html")


def chuck_jokes(request):
    if request.user.id:
        user_id = int(request.user.id)
    else:
        user_id = None
    jokes_id = list(FavoriteJoke.objects.filter(user_id_id=user_id).values('joke_id'))
    return render(request, "joke/chuck_jokes.html", {
        'jokes_id':jokes_id
    })

def other_jokes(request):
    if request.user.id:
        user_id = int(request.user.id)
    else:
        user_id = None
    jokes_id = list(FavoriteJoke.objects.filter(user_id_id=user_id).values('joke_id'))
    return render(request, "joke/other_jokes.html", {
        'jokes_id':jokes_id
    })

@login_required
@csrf_exempt
def add_delete_favorites(request):
    # to add in Table
    user_id = int(request.user.id)
    if request.method == 'POST':
        joke_id = request.POST.get('joke_id')
        joke_type = request.POST.get('joke_type')
        body = request.POST.get('body')

        joke_obj = FavoriteJoke.objects.filter(joke_id=joke_id, user_id_id=user_id, joke_type=joke_type).exists()
        if joke_obj is False:
            f_joke = FavoriteJoke(joke_id=joke_id, user_id_id=user_id, joke_type=joke_type, body=body)
            f_joke.save()
        else:      
            FavoriteJoke.objects.filter(joke_id=joke_id, user_id_id=user_id, joke_type=joke_type).delete()

# to Check see :
        data = {
            'joke_id': joke_id,
            'user_id': user_id,
            'joke_type': joke_type,
            'body': body,
        }

        return JsonResponse(data, safe=False)

    else:
        return HttpResponseRedirect(reverse('index'))


# // favorite Jokes page
@login_required
def favorite_jokes(request):
    user_id = int(request.user.id)

    type_choice_form = TypeChoiceForm()
    # select Joke Types (CHUCK oR OTHERs)
    if request.method == "POST":
        form = TypeChoiceForm(request.POST or None)
        joke_type = form['type_field'].value()

        if joke_type == 'All':
            jokes_obj =  FavoriteJoke.objects.filter(user_id_id=user_id).all().order_by('date').reverse()
        else:
            jokes_obj =  FavoriteJoke.objects.filter(user_id_id=user_id, joke_type=joke_type).all().order_by('date').reverse()
        
    else:
        jokes_obj =  FavoriteJoke.objects.filter(user_id_id=user_id).all().order_by('date').reverse()
    
    page_number = request.GET.get('page')
    paginator = Paginator(jokes_obj, 10)
    page_obj = paginator.get_page(page_number)

    return render(request, "joke/favorite_jokes.html", {
        'type_choice_form':type_choice_form,
        'jokes_obj': page_obj,
    })