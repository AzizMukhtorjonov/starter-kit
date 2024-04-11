# Project Structure

This project is organized by architectural layers, with the following directories:

- **api**: This directory contains the API layer of the application, including controllers, use cases, and presenters for handling business logic and formatting responses.
- **architecture**: This directory contains the architectural layers of the application, including services, factories for creating entities, and repositories for working with the database. These layers are closely related to each other.
- **domain**: This directory contains the domain layer of the application, including entities and data transfer objects (DTOs) for transferring data between services or wrapping incoming data from other services.
- **components**: This directory contains components for working with the application, including configuration, utilities, and databases.

## Flow of Data

When a request is received from outside the application, it first enters the controller in the `api` directory. From there, it goes to the use case, then to the service, and finally to the repository. On the return path, the entity is sent for processing to the presenter and then returned as a response. This flow ensures a clear separation of concerns and allows for easy testing and maintenance of the application.

By organizing the project in this way, we can ensure that the application is well-structured, easy to understand, and maintainable. Each directory has a specific purpose and contains only the necessary files and folders. This makes it easy to navigate the project and find the code you need.
