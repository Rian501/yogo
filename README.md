# Yogo

This is my back-end capstone project for Nashville Software School, and is intended to demonstrate a grasp of full-stack skills learning in a 6 month bootcamp learning environment.
  
Yogo is a searchable database of yoga poses that allows the user to view poses and their details regardless of login, and allows authenticated users to save personalize instructions for poses as well as sequences which they can build and re-arrange using drag and drop functionality.

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL for mac](https://www.postgresql.org/)
- [PostgreSQL for Windows](http://www.postgresqltutorial.com/install-postgresql/)  


## Getting Started

To run the project locally, clone down the repo and then:

## <p style="color: green;">How to Install?</p>

1. Clone the project to the desired folder in your directory,
```git clone https://github.com/Rian501/yogo```
1. run ```npm install``` at the root folder to get the necessary node modules.
1. you will need to move a few of these modules into the `public` directory in order for some files to access them correctly. The necessary directories to move are:
- `jquery`
- `jquery-ui`
- `bootstrap` (into the `public/styles` dir)
- `tether`
3. create a database with postgres, called "yogo_db" 
- Once you have postgreSQL setup, type ```psql``` in your terminal
- Then, create a new database ```CREATE DATABASE yogo_db;```
- And, connect to the Database ```\c yogo_db```

4. Once you are inside the project folder:
- Install all dependencies. Run `npm install` at the root folder.
- Next, make the config file: run `sequelize init` in your terminal at the root.
- Change the config file to fit your postgres username/pw or lack thereof, and change the database name in the config file to 'yogo_db"
5. run the migrations and seeding with sequelize in your terminal
- Create the tables and seed them with some starter data using ```sequelize db:migrate``` and then ```sequelize db:seed:all```
5. `npm start` from the root in your terminal
6. navigate to your localhost:8080 or localhost of choice

### Try it out

Register a new account, which you use to sign in each time.
Search for poses by title in the nav bar search field.
Click on a pose card to see the full details including video clip (where available) and full description.
Click on `My Sequences` where you can open the side bar to search for poses to add to a sequence.
Once a pose is added to a sequence, it is automatically added to "My Poses" - which you can access and edit (or delete) by clicking `My Poses` in the nav.
You can rearrange poses in a sequence, and add cards multiple times to create whatever sequence you like.
Click on "Play Sequence" to see the slideshow of your sequence.

## Built With

- [Express](https://expressjs.com)
- [jQuery](https://jquery.com/)
- [Sequelize-ORM](http://docs.sequelizejs.com/)
- [Bootstrap 4](http://blog.getbootstrap.com/2017/08/10/bootstrap-4-alpha/)
- [Passport js](http://www.passportjs.org/)
- [Pug](https://pugjs.org/api/getting-started.html)
- [jQuery-ui](https://jqueryui.com/) (sortable)

#### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
