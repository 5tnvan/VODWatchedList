# VODWatchedList

The app is a Video On-Demand single-page application prototype. The app shows a list of movies, let users **watch movies** and **see history**.

The app is hosted and can be accessed at https://vodwatchedlist.herokuapp.com/

## Functionalities:

- On initial load, a list of movies in a horizontal carousel is displayed. This carousel is scrollable via mouse scroll a mouse drag. User can also select movies via keyboard (in Chrome is Tab and Shift + Tab and Enter)
- When a movie is selected/clicked, a video plays in full screen and autoplay mode. This movie is then saved as a user’s watched movie. The user can watch the movie till the end or pause or exit. After the movie finishes, full screen automatically closes.
- User link is displayed on the right corner of header area. User can click on it and display list of watched movies, ordered by the latest movie watched (watched x mins ago). This list does not contain duplication of movies.
- A user can delete watched history. The feature is only here for the convenience of your testing. In a real life scenario, a user should not be able to delete watched history in the database, instead the database should keep the data and note which movie not to show to user.
- Home link is display on the left corner of header area. It takes the user back to the horizontal carousel.
- The application is responsive. User can adjust browser width and the layout adapts to it.
- Authentication is not implemented. You are using the app as test user John Doe.

## Technology
The app was developed in HTML/CSS/Javascript using **MongoDB, Node.js, Express.js** and **jQuery**. This prototype works with latest versions of Chrome. Apart from the home page, you can also access APIs:

API	RESPONSE

>GET: /api/users/:username | Get a particular user

>GET: /api/movies | Get all movies

>PUT: /api/users/:username/watchedMovies | Update a user watched movies list

>DELETE: /api/users/:username/watchedMovies | Delete a user watched movies list


