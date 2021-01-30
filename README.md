# Final Project

## Welcome to Joke.

#### Introduction

   **Joke-Web-App** I made this site to make world little bit funnier. on this side user can go and have little fun. user have 2 choices, user can select joke about Chuck Norris or another Jokes. if user likes joke, user can save it to favorites and if user don't want it anymore user can remove joke, for it user need to register and log in. For View I used pastel colors. For site to be nicer.

#### Features

1. Chuck Norris Jokes.
2. Other Jokes.
3. Log In - Register.
4. Remove/Add  Jokes to Favorites.
5. Favorites Page.
6. Joke Type Selector.
7. Delete Joke From Favorites Page.
8. Paginator.
9. User Friendly.

:fast_forward:<a href="https://www.youtube.com/watch?v=UfpXXSko9zo">Site-screencast: Watch the videos in youtube</a>

#### Justification

This project is distinct from all previous projects so far. Why?

- Cool Css styling.
- Nice Site Title.
- fetch data without reloading the page.
- Site uses API-es.
- 2 different path for users.
- User Can select Favorite type of jokes with selector.
- Completely Mobile responsive.

#### Let's go Through the Files
Inside the main folder 'Joke', we have main folders and files: static, templates, forms.py, models.py, urls.py, views.py...

- `models.py` - there are User's' (AbstractUser) for registered Users info and FavoriteJoke model for saved favorite jokes (user can't do this if user is not loged in).
  - class `User(AbstractUser)` is model that represents each user of the application. It inherits from AbstractUser, that is why it has fields for a username, email, password, etc.
  - class `FavoriteJoke(models.Model)` is model that represents Favorite Jokes witch user select: joke_id, user_id, joke_type, body, date - time when joke was selected it helps us to sort jokes correctly. It inherits from Model. In FavoriteJoke(models.Model) there is Meta class 'unique_together' witch controls that row with this ['user_id', 'joke_id'] to be unique and does not repeat in DB. joke_type has "choices" (Model field reference) to select Chuck and OtherJoke which helps us to select what type of joke user want to display.   
  
- `urls.py` - Contains all url paths for Project and Task control: for main page, for authentication, like login and sign up, for chuck and for other jokes, for favorite page etc.

- `forms.py` - form for selector by which  user can select which  type of joke user want to see.
  - class `TypeChoiceForm(forms.Form)` - selector form witch has 3 fields: All, Chuck, OtherJoke.

- `views.py` - views.py is pretty big file in our project. it contains all view functions for Project and Task: for authentication, like login and sign up, for
main page (index), for chuck jokes (chuck_jokes), for other jokes (other_jokes), for functionality to add jokes in favorites (add_delete_favorites), for favourite page to see all favorite jokes(favorite_jokes).
  - `index` function renders main page - index.html
  - `login_view` function - if request method is get renders login page - login.html. if req. method id post it takes username and password, and authenticate. if user exists its log in end renders main page, if not gives to user Alert message -("message": "Invalid username and/or password.").
  - `logout_view` - log USer Out and renders main page.
  - `register` function - if request method is get renders register page -register.html. If req. method id post it takes username, email, password, confirmation - check it and if it is valid it creates User ("with - user.save()") object if not gives Alert Message -("message": "Username already taken." or  "message": "Passwords must match.").
  - `chuck_jokes` function - It renders chuck jokes page - chuck_jokes.html. If user is loged in it takes all jokes_id from favoriteJoke and pass it to html file and then to js file for checking rendom joke if it is already added in favorites or not.
  - `other_jokes` function - It is very similar to "chuck_jokes".  It renders other jokes page - other_jokes.html. If user is loged in it takes all jokes_id from favoriteJoke and pass it to html file and then to js file for checking rendom joke if it is already added in favorites or not.
  - `add_delete_favorites` function - this function if for button to add or if its already added remove joke from favorite table. To access this path user need to be loged in and for it I use @login_required - inherited from "django.contrib.auth.decorators" and I use csrf_exempt to disable csrf inherited from "django.views.decorators.csrf". if request method is get renders main page -index.html. If req. method is POST it takes joke_id, joke_type and body, chech if it allready exist or not in table. if not it addes init f_joke.save(), if joke exists id deletes it "FavoriteJoke.objects.filter(joke_id=joke_id, user_id_id=user_id, joke_type=joke_type).delete()" and then returns JsonRespose with data in it wich contains: joke_id, user_id, joke_type, body.
  - `favorite_jokes` function - To access this path user need to be loged in. - It gives all info witch need to Display Favodite page, it also contains Paginator inherited from "django.core.paginator" witch displayes 10 joke pere page. - first function takes loged In users user.id and convers to -int()- integer  then if request is post it itakes type of Joke from "TypeChoiceForm" witch gives selected type of joke by use, and then filters table by joke_type and user_id, sorted it bu date and gives all necessary info.  and then displayes favorite jokes page - favorite_jokes.html.
  

- `Templates` - Holds all html files with Django's template language in it.
  - `layout.html` - Is main html file witch contains: main container, header (user navigation), navigation bar and script tag for linking JS file (index.js).
  - `index.html` - contains main page images and buttons to navigate.
  - `login.html` - contains forms for username and password, Login button and button for navigat to Register.
  - `register.html` - contains forms for username , email, password and concfirm password. register button and button for navigate to Log in.
  - `chuck_jokes.html` - contains form for rendom button, container for joke and form for saving or removig joke from Favorites.
  - `other)joke.html` - contains form for rendom button, container for joke and form for saving or removig joke from Favorites.
  - `favourite_jokes.html` - form for joke selector and button, favoritejokes main container joke container in init - rendering with "for" - loop, Paginator To divide pages.
  

- `static` - Holds all static files.
  - `img` - Holds all static images and icons: 2 .jpg and 1 .png files.
  - `styles.css` - Holds all styles and animations for pages, for the layouts flex-box. with color i use css variables (--color-green-light-1 etc.), there are '@media only screen' - s for site to be Completely Mobile responsive. To select the elements I used: Simple selectors, Combinator selectors, Pseudo-class selectors, Pseudo-elements selectors, Attribute slectors.
  - `index.js` - Contains functions for Site to be flexible and more user friendly. for favorites page there is function 'setCssForFavoritePage' to display different chuckNorris and OtherJokes CSS (chuck_jokes_css_class, other_jokes_css_class ), there is functions for little animation when deleting joke from a page (to be more dynamic and nice). (clicking on X - which  is from HTML Unicode UTF-8). there are functions to  Query Rendom Chuck Joke and Rendom Other Jokes Joke from API-es ((API-Link : https://rapidapi.com/matchilling/api/chuck-norris?endpoint=57cfbe2de4b0504b4a8199b5 - Chuck,) (API-Link : https://rapidapi.com/LemmoTresto/api/joke3/endpoints - Other Joke.)).
    - `document.addEventListener('DOMContentLoaded', function() {])` - When the page is rendered to run the following functions, in it there is if check function for cheching if document querySelector exist and than if starts function.
    - `queryRendomChuckJoke` function - fetches Data from API and pass it to "rendomChuckJoke" function. if something goes wrong it catchs Error message.
    - `queryRendomOtherJoke` function - fetches Data from API and pass it to "rendomOtherJokesJoke" function. if something goes wrong it catchs Error message.
    - `rendomChuckJoke` - it takes Data from queryRendomChuckJoke and displayes. It checks if joke has already added or not in favorites joke and based on this displayes 'Remove From Favorites' or 'Add To Favorites' button.
    - `rendomOtherJokesJoke` - it takes Data from queryRendomOtherJoke and displayes. It checks if joke has already added or not in favorites joke and based on this displayes 'Remove From Favorites' or 'Add To Favorites' button.
    - `sendAddDeleteFavoritesRequest` - (For main page) - it takes infro from joke and then send post request to server for saving or deleting joke from Users Table . It checks if joke has already added or not in favorites joke and based on this displayes 'Remove From Favorites' or 'Add To Favorites' button.
    - `deleteJokeFromFavoritesPage` - (For Favorites page) - it takes infro from joke and then send post request to server for deleting joke from Users Table.
    - `setCssForFavoritePage` - Takes Jokes type and based on this Sets Relevant CSS-Class.



- `END` - To run app you only need to install Django and type 'python manage.py runserver" in terminal.
