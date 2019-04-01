# WebDevProjects
Projects for CMPSC421, Net-centric Computing


## Requirements:


## Problem Set 1

### hangman 
- Vanilla Javascript implementation of hangman using ES5. On screen load a word should randomly load. For the word, dashes should be shown. Allow the user to guess one letter at a time. If they guess correctly, replace the dashes with the correct letter. If they guess incorrectly, update the hangman image. If the user wins, display a win message, otherwise display a lose message.

### minesweeper 
- Vanilla Javascript implementation of minesweeper using ES5. Generate a grid of nxm cells for the user to click on. After the first click, randomly place the mines in the remaining cells. On each click, reveal the number of surrounding mines. The game ends when only spaces with mines are left or a mine is clicked.


## Problem Set 2

Use AJAX for all of the following projects.

### weather 
- Create a weather forecast screen similar to Bing's weather screen. Retrieve data using weather.gov API. Convert zip code into latitude and longitude using MapQuest API. Weather app must allow the user to change the zip code and show different images based on the predicted weather forecase.

### usermanagement 
- Create a user management system using Cards from either Materialize CSS or Bootstrap. Get random user data using randomuser.me API. Allow the user the ability to filter on card information.

### blogging 
- Create a fake blog with comments and posts populated by placeholder text from jsonplaceholder.typicode.com. Show the user a list of posts to start with and when they click a post, go to a page showing the post's comments.


## Problem Set 3

### 2048 
- Implement a playable version of 2048 using Vue.js and Google Cloud Firestore. Allow the user to play until completetion (all cells are filled). Ask the user for a name and store high score data. Display the high score list afterwards.


## Problem Set 4

### stream-app 
- Create a music player using Angular. Create a component for a home page and the music library. Allow users to click on a song to play, and click again to stop. Create a header for navigation and a fixed footer for music to play no matter which component is currently active. Use Howler.js for the audio.
