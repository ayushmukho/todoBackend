
# API for Task Manger

Here are all the API that are used in the making of the task manager you can find the API which are used here in the below [Swagger UI](https://jellyfish-app-vzwiq.ondigitalocean.app/)



## API Reference

#### Get all POST

```http
  POST /v2/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | **Required**. Your API key |
| `email` | `string` | **Required**. Your API key |
| `password` | `string` | **Required**. Your API key |


```http
  POST /v2/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. Your API key |
| `password` | `string` | **Required**. Your API key |

```http
  POST /v2/todo-task
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `priority` | `number` | **Required**. Your API key |
| `description` | `string` | **Required**. Your API key |
| `title` | `string` | **Required**. Your API key |
| `taskId` | `string` | **Required**. Your API key |
| `dueDate` | `string` | **Required**. Your API key |

```http
  POST /v2/pending-task
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `taskId` | `string` | **Required**. Your API key |

```http
  POST /v2/complete-task
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `taskId` | `string` | **Required**. Your API key |


#### All GET Rquest

```http
  GET /v2/todo-task
```

```http
  GET /v2/pending-task
```
```http
  GET /v2/complete-task
```

## Tech Stack

**Server:** Node, Express, Swagger.yaml, bcrypt.js, mongoDb, mongoose, jsonwebtoken


## Run Locally

Clone the project

```bash
  git clone https://github.com/ayushmukho/todoBackend.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

