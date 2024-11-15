
###  Project Setup Instructions

## Clone the Repository
git clone https://github.com/your-username/your-repo-name.git


## Navigate to the Project Directory
cd your-repo-name


## Install Dependencies
npm install


## Environment Variables Setup

## .env file create karein aur neeche diye gaye variables ko define karein -
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=rental_vehicle
PORT=5000
JWT_SECRET=your_secret_key



## Database Setup

## MySQL Database create karein -
## open terminal :
CREATE DATABASE - sequelize db:create 
Database models _migrate karein - sequelize db:migrate




## Start the Server
npm start