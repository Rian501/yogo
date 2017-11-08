# Yogo

One Paragraph of project description goes here
Yogo is a searchable database of yoga poses that allows the user to view poses and their details regardless of login, and allows authenticated users to save personalize instructions for poses as well as sequences which they can build and re-arrange using drag and drop functionality.

### Prerequisites

PostgreSQL (http://www.postgresqltutorial.com/install-postgresql/)
Sequelize (http://docs.sequelizejs.com/manual/installation/getting-started.html#installation)

## Getting Started

To run the project locally, clone down the repo and then:
1. run npm install to get the necessary node modules.
1. you will need to move a few of these modules into the `public` directory in order for some files to access them correctly. The necessary directories to move are:
- jquery
- jquery-ui
- bootstrap (into the `public/styles` dir)
- tether
3. make sure you install sequelize if you do not have it globally installed on your machine
4. create a database with postgres, called "yogo_db" (you may also need to change the config file to fit your postgres username/pw or lack thereof)
5. run the migrations and seeding with sequelize in your terminal
6. `npm start` from the root in your terminal
7. navigate to your localhost:8080 or localhost of choice

### Try it out

Register a new account, and 



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
