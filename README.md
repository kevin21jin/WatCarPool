# WatCarPool

This is the group project for CS 348 Fall 2022 at University of Waterloo

## Overview

WatCarPool is a Web application that provides an affordable carpooling platform in the Ontario region. In WatCarPool, drivers can post their availability on the dashboard, so that passengers can choose their best travelling option. On the other side, passengers can post carpool requests so that drivers can contact them directly and schedule the service.

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
Navigate into the root directory:

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

Install the required dependency by running the following command:
```
bash setup.sh
```


### Setup/Update Database
Create the database (if it does not exist) and import/update sample data into the database by running the following command:
```
bash importSample.sh
```

### Drop Database
Clean up the database by running the following command:
```
bash cleanup.sh
```
