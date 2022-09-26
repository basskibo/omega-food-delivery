# Omega Food Delivery

## Starting backend project

-  Clone project

       git clone git@github.com:basskibo/BojanJagetic_FoodDelivery_Omega.git

-  Change direction to the folder consisting **backend code**

       cd fd_be

-  Install modules

       npm i

-  Aggregate the output of each container, in this project redis and mongodb are dockerized. I recommend using -d _detached_ so we can run third party services in background.

       docker compose up -d

-  If docker containers are available you can run application with following command :

        npm run dev

-  If you do not want to use default settings, create dotenv configuration. **NOTE:** I will send google API key which is not uploaded due to security in this repository. Setup **.env** as you like , or just run , server will run on port **3000** by default

### Backend Project Structure

```
src\
 |--config\         # Enums, validators and configuration related things
 |--controllers\    # Route controllers (controller/bussiness layer)
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--utils\          # Utility classes and functions
app.js          # Express app
index.js        # App entry point
```

## Starting frontend project

-  Change direction to the folder consisting **backend code**

       cd fd_fe

-  Install modules

       npm i

-  In _package.json_ you can define which port to use, it is set to use 3001 by default.

-  To start next.js server run command

       npm run dev

-  Open browser on [port 3001]("http://localhost:3001") (if you did not change it)

### Frontend Project Structure

```
components\     # React Components
pages\          # Nextjs pages and routes
app.js          # Express app
index.js        # App entry point

