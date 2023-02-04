# Dockerized Laravel & React.js application

Complete Dockerized laravel, React & mysql Kanban Project




<p align="center">This is the complete dockerized Laravel & React.js kanban application  </p>




## Basic Features

- Manage users, Tasks 
- Use MUI
- Laravel API
- Login and registe with OAuth2 and passport

## Server Requirements

- PHP >= 8.1.0
- Node >= 18.x
- React >= 17.x



## Install

### 1. Clone the source code or create new project.

```shell
git clone https://github.com/mj-mousaei/kanban-react-laravel.git
```

### 2. Set the basic config

```shell
cp .env.example .env
```

Edit the `.env` file and set the `database` and other config for the system after you copy the `.env`.example file.

### 2. Run the below command

// in laravel folder 

docker compose up -d

your api run in http://localhost:8000

// in react folder 

docker compose up -d

your frontend run in http://localhost:3000



## Thanks

- MJ Mousaei


