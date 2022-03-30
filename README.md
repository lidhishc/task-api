## Getting Started

Getting up and running is as easy as 1, 2, 3, 4.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    npm install
    ```

3. Configure Database
    1. setup [PostgreSQL](https://www.postgresql.org/download/)
    2. update `config.json` file in the config folder
    3. example:
        ```
        {
            "development": {
            "username": "postgres",
            "password": "postgres",
            "database": "postgres",
            "host": "127.0.0.1",
            "dialect": "postgresql",
            "logging": false
            }
        }
        ```
4. Start your app

    ```
    npm start
    ```

## Database Migration

1. Install Sequlize-CLI globally.

    ```
    npm install --save -g sequelize-cli
    ```

2. run migration command
    ```
    npx sequelize db:migrate
    ```

## API - Pre-Requisites

1. Change the PORT by adding `PORT`variable in `.env ` file

2. Make sure pass `roleid ` in ` request header`

    ```
    roleid=1 // admin
    roleid=2 // client
    ```

## API Routes

Base_URL: (http://localhost:3030)

1. Blog Create

    ```
    POST : /blog/

    body:{
        "title":"Test Title",
        "body":"Test Body"
    }
    ```

2. Listing Blogs

    ```
    GET : /blog/list
    ```

3. Get details of a single blog

    ```
     GET : /blog/:blog_id
    ```

4. Update Blog

    ```
    PATCH : /blog/:blog_id

    body:{
        "title":"Test Title",
        "body":"Test Body"
    }

    ```

5. Delete Blog

    ```
    DELETE : /blog/:blog_id
    ```

#

#

6. Comment Create

    ```
    POST : /comment/

    body:{
    "blog_id":1,
    "comment":"Test Comment"
    }
    ```

7. Listing comment of a blog - SQL QUERY

    ```
    GET : /comment/:blog_id/blog
    ```

8. Listing comment of a blog - ORM

    ```
    GET : /comment/:blog_id/blog-orm
    ```

9. Create a Comment replay

    To create N'th level of replay just pass the parent comment id ad `comment_id` in the api request

    ```
    POST : /comment/replay

    body:{
        "comment_id":1,
        "comment":"Test Comment"
    }
    ```

10. Get list of replays of comment

    ```
    GET : /comment/:comment_id/replay
    ```
