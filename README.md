# Hapi-Server

Experimenting with how [Hapi](https://hapijs.com/) works, so writing some simple server functionality that makes calls to [mongoDB](https://www.mongodb.com/).

Check out [issues](https://github.com/deeheber/hapi-server/issues) to see any planned features or open bugs.

### Directions to use
1. Download or clone the repo
2. Install [mongoDB](https://www.mongodb.com/)
3. In a terminal window type `npm install`
4. `npm start` will start the server 
5. Start your local mongoDB
5. Navigate to `http://localhost:3000/` in a web browser or use an application like [Postman](https://www.getpostman.com/) to make calls to the server.

### Data Model
Book
  - title: required String
  - author: String
  - purchaseDate: date (defaults to current date if none is provided)
  - complete: boolean (defaults to false if value is not provided)
