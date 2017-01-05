# Example using variables with CSS modules and react

Hi! This is how I handled variables in one of my latest side projects.

The global styles are inside `styles/app.css` which are then imported in the app component,
which is the wrapper of the whole app.

Inside `styles` there are other files that store common variables, like colors, fonts, etc.

To see how I use those variables see `article-hero`'s styles. I basically use [ICSS's import/export system](https://github.com/css-modules/icss#specification).
