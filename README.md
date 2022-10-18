# WatCarPool

This is the group project for CS 348 Fall 2022 at University of Waterloo

## Overview

WatCarPool is a full stack web application that provides an affordable carpooling platform in the Ontario region. In WatCarPool, users are grouped to be drivers and passengers. Drivers can post their upcoming carpool trips on the home page, and passengers can choose and join different carpool trips.

### Contributor

- [Chengyu Jin](https://github.com/ChengyuJin)
- [Diana Shi](https://github.com/dianashi)
- [Kevin Jin](https://github.com/kevin21jin)
- [Kevin Ke](https://github.com/Fakevin0613)

## Technologies Used

- **Database:** MySQL
- **Backend:** Python, Flask
- **Frontend:** JavaScript, React

## Project Setup

### Install MySQL

Install MySQL on Mac: https://dev.mysql.com/downloads/mysql/

(Optional) If you want to visualize our database, please download MySQL Workbench: https://dev.mysql.com/downloads/workbench/

### Clone and Configure

Clone the repository to your local machine:

```
git clone https://github.com/Fakevin0613/WatCarPool.git
```

Navigate to the root directory:

```
cd WatCarPool
```

Change the fields in `mysqlConfig.json` to your own MySQL configuration:

```json
{
    "host": "localhost",
    "user": "root",
    "password": "12345678"
}
````

Install the required dependency:

```
bash setup.sh
```


### Setup/Update Database

Create the database (if it does not exist) and import/update sample data into the database:

```
bash importSample.sh
```

### Drop Database

Clean up the database:
```
bash cleanup.sh
```

## Running the Application

### Backend

Navigate to the backend directory

```
cd server
```

Activate the virtual environment:

```
source env/bin/activate
```

Start the server:

```
python3 server.py
```

Deactivate the virtual environment:

```
deactivate
```

### Frontend

Navigate to the frontend directory

```
cd client/my-app
```

Start the application:

```
npm start
```

Access and play with the application: [localhost:3000](http://localhost:3000/)
