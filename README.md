
# Hospital API

Hospital API is a Node.js and Express.js based web application that allows doctors to register, create sessions, register patients, and generate patient reports. Patients can view their own reports, while doctors can view patient reports based on status.


## Table of Contents

- Installation
- Usage
- Authentication
- API Endpoints
- Example Requests
- Response Format
- Database Schema
- Dependencies
## Installation

To run this project locally, follow these steps:

1. Clone the repository:

```bash
https://github.com/chaturvedi-anil/hospital-api.git
```
2. Install dependencies:
```bash
cd hospital-api
npm install
```

3. Configure environment variables:

Create a .env file in the project root and define the following variables:
```bash
MONGODB_CLOUD_SERVER_URL = "Your_CLOUD_SERVER_URL"
or
MONGODB_LOCAL_SERVER_URL = "Your_LOCAL_SERVER_URL"
JWT_KEY = "YOUR_JWT_KEY"
```
4. Start the server:
```bash
npm start
```

The API will be accessible at http://localhost:8000 (Change port accourding to your need)


    
## Usage
This API provides the following functionalities:

- Doctor Registration: Doctors can register using their credentials.

- Doctor Session Creation: Doctors can create sessions for themselves.

- Patient Registration: Doctors can register patients.

- Patient Report Generation: Doctors can generate patient reports after checkup.

- View Patient Reports: Doctors can view patient reports based on their status (e.g. Negative, Positive-Admit).

- View Own Reports: Patients can view their own reports.


## Authentication

Authentication in this API is implemented using Passport.js with JWT (JSON Web Tokens). To access most of the endpoints, you need to include a valid JWT token in the request header.

To obtain a token, you can use the `/doctors/create-session` endpoint to authenticate with your doctor credentials.
## API Endpoints

### Doctor Routes:
- POST /doctors/register: Register a new doctor.

- POST /doctors/create-session: Authenticate and get a JWT token.

### Patient Routes:
- POST /patients/register: Register a new patient. (only signedin doctor can register patient).
- GET /patients/:id/all-reports: View all patient reports for the logged-in patient.
### Report Routes:
- POST /patient/:id/create-report: Generate a patient report. (patient id);
- GET /reports/:status: View patient reports by status (e.g., Negative, Positive-Admit).
## Example Requests

You can use tools like `Postman` or `curl` to make requests to the API.

Here's an example of how to register a new doctor:


```bash
POST /doctors/register

{
    "name": "Dr. John Doe",
    "email": "john@example.com",
    "password": "password123"
}

```


## Response Format

All responses from the API are in JSON format and follow this structure:


```bash
{
   "status": "success",
   "message": "Request successful",
   "data": {}
}

```

In case of an error, the response will have "status": "error" and an error message in the "message" field.

## Database Schema

The MongoDB database for this project has the following collections:

- doctors.js: Stores doctor information.
- patients.js: Stores patient information.
- reports.js: Stores patient reports.
## Dependencies

The main dependencies used in this project are:

- Express.js: Web application framework.
- MongoDB: Database for storing data.
- Passport.js: Authentication middleware.
- JWT: JSON Web Token for authentication.
- Mongoose: MongoDB object modeling for Node.js.

For a complete list of dependencies, please refer to the package.json file.
## Authors

- [@chaturvedi-anil](https://github.com/chaturvedi-anil)

