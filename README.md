<a name="readme-top"></a>

<div align="center">
<a href="https://alinafedoriv-todo.netlify.app/" target="_blank">
    <img src="https://github.com/afedoriv/TODO-backend/assets/99702784/6d6f56a4-6801-4c3a-b04b-36dae7c9a0bf" alt="Logo" width="80">
</a>
 
<br />
<br />

<h3 align="center">TODO Backend</h3>

<br />
<p align="center">
  
Welcome to the <strong>TODO Backend</strong> repository!

This repository serves as the backend implementation for the <strong>TODO app</strong>, functioning as a task management system tailored to streamline diverse task-related operations. For a comprehensive end-to-end experience of the TODO application, explore the corresponding [frontend](https://github.com/afedoriv/TODO-frontend) repository as well.

  <br />
  Explore the live demo or watch the video demo below.
  
<br />
<br />
<a href="https://alinafedoriv-todo.netlify.app/" target="_blank">View Live Demo</a>
</p>
</div>

<br />
<details>
  <summary>Table of Contents</summary>
  <ol>
     <li><a href="#about-the-project">About The Project</a></li>
    <li><a href="#overview">Overview</a></li>
     <li><a href="#built-with">Built with</a></li>
    <li><a href="#api-documentation">API Documentation</a></li>
     <li><a href="#endpoints">Endpoints</a></li>
     <li><a href="#error-handling">Error Handling</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
    <li><a href="#project-links">Project Links</a></li>
  </ol>
</details>

## About The Project

<br />

[![Typing SVG](https://readme-typing-svg.herokuapp.com?color=939bb4&lines=TODO+App+-+Backend)](https://git.io/typing-svg)

https://github.com/afedoriv/TODO-frontend/assets/99702784/ede8b736-07ec-44e5-905a-ec4337e04fdf

<br />
<details>
  <summary>Application Screenshots</summary>

<br />
<div align="center">
  <img src="https://github.com/afedoriv/TODO-frontend/assets/99702784/ac9a65cf-4f46-44c0-8d75-dccac8c395d8" width="100%"/>
</div>
</details>

<br />
  
## Overview

The <strong>TODO Backend</strong> repository serves as the backbone for the <strong>TODO app</strong>, employing Express, MongoDB, and Mongoose to create a robust task management system. Designed for efficient CRUD operations, this backend ensures a seamless experience in handling tasks. Explore the API documentation to gain insights into each endpoint, request formats, and responses. Dive into the codebase to understand the effective error-handling mechanisms, providing a reliable foundation for the TODO application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Built with

<div align="center">
  <img src="https://img.shields.io/badge/node.js-47A248?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose">
  <img src="https://img.shields.io/badge/Cors-FF914D?style=for-the-badge&logo=cors&logoColor=white" alt="Cors">
  <img src="https://img.shields.io/badge/Dotenv-07D8F5?style=for-the-badge&logo=dotenv&logoColor=white" alt="Dotenv">
  <img src="https://img.shields.io/badge/Hpp-05A1E6?style=for-the-badge&logo=npm&logoColor=white" alt="Hpp">
  <img src="https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD" alt="Nodemon">
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman">
</div> 
  
<br />
<br />

-   [Node.js](https://nodejs.org/) - A JavaScript runtime built on Chrome's V8 JavaScript engine.
-   [Express](https://expressjs.com/) - Web application framework for Node.js.
-   [MongoDB](https://www.mongodb.com/) - A NoSQL database.
-   [Mongoose](https://mongoosejs.com/) - An ODM (Object Data Modeling) library for MongoDB and Node.js.
-   [Cors](https://www.npmjs.com/package/cors) - Middleware for enabling Cross-Origin Resource Sharing.
-   [Dotenv](https://www.npmjs.com/package/dotenv) - A zero-dependency module that loads environment variables from a <strong>.env</strong> file.
-   [Hpp](https://www.npmjs.com/package/hpp) - Middleware to protect against HTTP Parameter Pollution attacks.
-   [Nodemon](https://nodemon.io/) - A utility that monitors for changes in your source code and restarts your server.
-   [Postman](https://www.postman.com/) - Collaboration platform for API development used for testing and documentation.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## API Documentation

<div align="center">
  
   [![API Documentation](https://img.shields.io/badge/API%20Documentation-FF6C37?style=for-the-badge&logo=postman&logoColor=white)](https://documenter.getpostman.com/view/28899413/2s9YJW4Qrt)

</div>

<br />

Explore the [API Documentation](https://documenter.getpostman.com/view/28899413/2s9YJW4Qrt) for the <strong>TODO app backend</strong> using Postman, offering insights into each endpoint.

It covers expected request formats, responses, and additional details for a comprehensive understanding.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Endpoints

The TODO backend provides a robust set of endpoints:

<br />

-   **GET /api/v1/tasks:** Retrieve all tasks.
-   **POST /api/v1/tasks:** Create a new task.
-   **DELETE /api/v1/tasks:** Remove all tasks.
-   **GET /api/v1/tasks/:id:** Retrieve a specific task by ID.
-   **PATCH /api/v1/tasks/:id:** Update a task by ID.
-   **DELETE /api/v1/tasks/:id:** Remove a task by ID.
-   **PUT /api/v1/tasks/:id1&:id2:** Swap tasks with specified IDs.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Error Handling

The application uses a custom error handling mechanism to manage various types of errors:

-   During _development_, detailed error messages assist in debugging, while in a _production_ environment, generic messages ensure a smooth end-user experience.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Installation

Follow these steps to set up the <strong>TODO Backend</strong> locally:

<br />

1. Clone this repository.

```bash
git clone https://github.com/afedoriv/TODO-backend.git
```

2. Install dependencies.

```bash
npm install
```

3. Configure environment variables.

<br />

-   Create a **.env** file in the root directory and add the following variables:

```bash
DATABASE_LINK=<your_actual_database_link>
DATABASE_PASSWORD=<your_database_password>
```

-   Replace **<your_actual_database_link>** with your actual MongoDB database link.

-   Replace **<your_database_password>** with your actual MongoDB database password.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

Start the application using the following command:

```bash
npm start
```

The server will commence, making the backend services available on the default port **3000**. If you wish to use a different port, you can customize it by updating the **.env** file. Locate the **PORT** variable and set it to your desired port number.

```bash
PORT=<your_desired_port>
```

-   Replace **<your_desired_port>** with the port number you want to use.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

The TODO Backend utilizes cutting-edge technologies and libraries to provide a robust and efficient task management system:

-   [Node.js](https://nodejs.org/)
-   [Express](https://expressjs.com/)
-   [MongoDB](https://www.mongodb.com/)
-   [Mongoose](https://mongoosejs.com/)
-   [Cors](https://www.npmjs.com/package/cors)
-   [Dotenv](https://www.npmjs.com/package/dotenv)
-   [Hpp](https://www.npmjs.com/package/hpp)
-   [Nodemon](https://nodemon.io/)
-   [Postman](https://www.postman.com/)
-   [Render](https://render.com/)

<br />

These technologies collectively contribute to the efficiency, scalability, and maintainability of the TODO Backend.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Project Links

-   **Live Demo:** [TODO App](https://alinafedoriv-todo.netlify.app)
-   **Frontend Repository:** - [TODO Frontend GitHub](https://github.com/afedoriv/TODO-frontend)
-   **Backend Repository:** - [TODO Backend GitHub](https://github.com/afedoriv/TODO-backend)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
