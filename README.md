# Sequelized Burgers

## Overview
This is a full-stack web application using MVC architecture and node.js,express,sequelize,handlebars wherein users can keep a track of their favorite burgers. They can enter the burger names they wish to eat. Once they eat, they can either like or dislike the restuarant. At any time, a user can see/edit all burgers that they haven't tried, liked or disliked by him. User can also view the wish list of all users in ascending order of their names and burger names.
   
## Live Site
https://sequelize-da-burger-sdb.herokuapp.com/

![burger_screenshot](https://user-images.githubusercontent.com/28829258/54067028-45d0e380-4208-11e9-9d69-9ca0cbcc152f.png)

## Description
- Eat-Da-Burger is an app that lets users input the names of burgers they'd like to eat.
- Whenever a user submits a burger's name, the app will add the burger to the Wanna Try list.
- When the user clicks the like button, the burger will move to the left side of the page.
- When the user clicks the dislike button, the burger will move to the right side of the page.
- If a burger is added to the like list or dislike list, user can delete the burger from the list by clicking the trash icon next to the burger.
- Once the user deletes the burger name, user will have to add the name again to the list to see the same burger's name on the Wanna Try list.

## Directory Structure
```
.
├── config
│   ├── connection.js
│   └── orm.js
│ 
├── controllers
│   └── burgers_controller.js
│
├── db
│   ├── schema.sql
│   └── seeds.sql
│
├── models
│   └── burger.js
│ 
├── node_modules
│ 
├── package.json
│
├── public
│   └── assets
│       ├── css
│       │   └── burger_style.css
│       └── img
│       │   └── burger_theme.png
        ├── js
│           └── burgers.js 
|
├── server.js
│
└── views
|   ├── index.handlebars
|   └── layouts
|   |    └── main.handlebars
|   └── partials
|   |    └── burgers
|   |        └── disliked-block.handlebars
|   |        └── liked-block.handlebars
|   |        └── new-block.handlebars
|   |          
```

## Technologies Used

- Node.js
- Express.js
- Express Handlebars
- MySQL
- ORM 
