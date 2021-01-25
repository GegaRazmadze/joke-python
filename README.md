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

- `urls.py` - Contains all url paths for Project and Task control: for main page, for authentication, like login and sign up, for chuck and for other jokes, for favorite page etc.

- `forms.py` - form for selector by which  user can select which  type of joke user want to see.

- `views.py` - views.py is pretty big file in out procject. it contains all view functions for Project and Task: for authentication, like login and sign up, for
main page (index), for chuck jokes (chuck_jokes), for other jokes (other_jokes), for functionality to add jokes in favorites (add_delete_favorites), for favourite page to see all favorite jokes(favorite_jokes).

- `Templates` - Holds all html files with Django's template language in it.

- `static` - Holds all static files.
  - `img` - Holds all static images and icons.
  - `styles.css` - Holds all styles and animations for pages, for the layouts flex-box. with color i use css variables (--color-green-light-1 etc.), there are '@media only screen' - s for site to be Completely Mobile responsive.
  - `index.js` - Contains functions for Site to be flexible and more user friendly. for favorites page there is function 'setCssForFavoritePage' to display different chuckNorris and OtherJokes CSS (chuck_jokes_css_class, other_jokes_css_class ), there is functions for little animation when deleting joke from a page (to be more dynamic and nice). (clicking on X - which  is from HTML Unicode UTF-8). there are functions to  Query Rendom Chuck Joke and Rendom Other Jokes Joke from API-es ((API-Link : https://rapidapi.com/matchilling/api/chuck-norris?endpoint=57cfbe2de4b0504b4a8199b5 - Chuck,) (API-Link : https://rapidapi.com/LemmoTresto/api/joke3/endpoints - Other Joke.)).



- `END` - To run app you only need to install Django and type 'python manage.py runserver" in terminal.