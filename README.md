# Polling System API

# Description

- This is just an API, where you can create a question (Any kind of you want) and also can create alternative options for a particular question.
- Question will contain "id", "title" and an array of "options".
- Option will contain "id", "title" and "votes", "link_to_vote".
- Technologies I have used to create this API :
  - Frontend : JavaScript
  - Backend : NodeJS, ExpressJS, MongoDB (DB)
  - API Testing Tool : Postman
  - Database UI : MongoDB Compass

# Requirements

- Node.js installed on your local system
- A database, I'm using NoSQL Database (MongoDB)
- An API testing tool (e.g. Postman, Insomnia) for testing the API endpoints

# Install & Run

1. Clone the repository
2. Install dependencies using `npm install` or `npm i`
3. Set all the environment variables to your `.env` file

- .env
- PORT (e.g. 5000)
- SESSION_SECRET (e.g. anythingyouwant)
- MONGO_DB_URI (e.g. mongdb://127.0.0.1:27017/poll_api_db)
- APP_URL (e.g. http://localhost:5000)

4. start the server using `npm run dev`

# How to use (Guide)

- POST /questions/create (To create a question)

  - e.g. http://localhost:5000/api/v1/questions/create

- POST /questions/:id/options/create (To add options to a specific question)
- e.g. http://localhost:5000/api/v1/questions/<questionID>/options/create

- DELETE /questions/:id/delete (To delete a question)
- e.g. http://localhost:5000/api/v1/questions/<questionID>/delete

- DELETE /options/:id/delete (To delete an option)
- e.g. http://localhost:5000/api/v1/options/<optionID>/delete

- POST /options/:id/add_vote (To increment the count of votes)
- e.g. http://localhost:5000/api/v1/options/<optionID>/add_vote

- GET /questions/:id (To view a question and its options)
- e.g. http://localhost:5000/api/v1/questions/<questionID>

# Libraries Used

- dotenv
- express
- express-session
- mongoose

# Future Improvements

- Add authentication for managing questions
- Implement pagination for viewing questions and their options
- Add sorting and filtering options for viewing questions and their options
- Implement caching for faster access to frequently accessed data
