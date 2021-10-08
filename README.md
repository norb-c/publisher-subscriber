
# [Pangaea Test API Documentation](https://linkshortner-starter.herokuapp.com/9gXY)

Some of the patterns applied are: 
* Publisher Subscriber Pattern
* Dependency Control and Inversion of Control
* Service Repository Pattern

This service built with Nodejs running on `Typescript` with  `RabbitMQ` as message broker and `MYSQL` as the database.
  
## Documentation
The API documentation is hosted on [API Documentation](https://linkshortner-starter.herokuapp.com/9gXY)

## Configuration
  

* Configure Database credentials and RabitMQ (You can visit [Here](https://api.cloudamqp.com/) For a free version of RabbitMQ)

```env
SUBSCRIBER_PORT=9000
PUBLISHER_PORT=8000
NODE_ENV=development
DB_USER=root
DB_PASSWORD=password
DB_HOST=localhost
DB_NAME=pang
DB_PORT=3306
RABBITMQ_URL=<Rabbitmq Url>
```

* Run locally by running the following command.
```bash
sh ./start-server.sh
```

* To run all test cases

```bash

npm test

```

## Possible Improvements
* Package the application with docker
* Increase the test coverage to at least 95% from 80%