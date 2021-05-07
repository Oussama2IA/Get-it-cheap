# Get it cheap

> This project was part of my academic projects, its main goal was to build a price comparison website using scraping.
> The main idea of the project is to get the product at the best price you can without losing time searching.

# Project's features

- [x] **General search**: Our website provides a general search from the most popular websites like amazon.
- [x] **Search by category**: To optimize results you can search by category, which allows you to get a result from the best websites for this category.
- [x] **Change currency**: You can also change the currency of the result with high accuracy (currencies are updated every hour).

# Main development tools

## Scraping
- Scrapy
- Scrapyd
- Scheduler

## Frontend
- React
- Bootstrap
- Material ui

## Backend
- Django
- Django REST framework

# Setup project environment

## Install dependecies
- You should have python3 installed
- Clone this repository in your local machine (**git clone https://github.com/Oussama2IA/Get-it-cheap**)
- Open your terminal and cd to the project directory (**cd project_dir**)
- You can set up a virtual environment (it's recommended):
  - **python -m venv venv** (**python3 -m venv venv**)
  - **venv/scripts/activate** (for mac & linux: **source venv/bin/activate**)
  
- Now let's start by installing python packages we need:
  - **python -m pip install --upgrade pip** (upgrade pip)
  - **pip install -r requirements.txt** (install all python requirements packages)
  
- Now let's move on to npm packages we need:
  - **cd frontend\display** (frontend directory)
  - **npm install** (install npm packages we need)
  - **npm run build** (deploy project to production)
  
## Open project
- Open the terminal (in the project directory) and run the command **scrapyd** (don't close this terminal)
- Open a new terminal and run the following commands:
  - **python manage.py migrate** (to apply migrations to database)
  - **python manage.py update** (to update currencies every hour) (don't close this terminal)

- Now open the last terminal and run the command **python manage.py runserver** to run the project in your localhost
- Open the localhost in your browser: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
