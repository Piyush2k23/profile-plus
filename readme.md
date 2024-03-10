# Profile Plus

Profile Plus is a basic social networking API developed using Node.js and MongoDB.

## Setup Instructions

### Prerequisites
- Node.js installed on your machine
- MongoDB installed and running locally or remotely

### Installation
1. Clone the repository to your local machine:
git clone <https://github.com/Piyush2k23/profile-plus.git>


2. Navigate to the project directory:
cd profile-plus

3. Install dependencies:
npm install


### Environment Variables
Create a `.env` file in the root directory of the project and add the following environment variables:

PORT=5000
MONGO_URL = mongodb+srv://profileplus:profileplusmongopassword@cluster0.vgzvk.mongodb.net/profile?retryWrites=true&w=majority
JWT_SECRET = profileplusjwtsecretkey345456@456vhf

### Running the Application
- Start the server:
npm start

- The API will be available at `http://localhost:5000`. 
- Also available at `https://profile-plus.onrender.com`

### API Documentation
- Refer to the API documentation for information on available endpoints and their usage.

### Deployment
- For production deployment, set the `NODE_ENV` environment variable to `production` and configure a MongoDB instance suitable for production use.

## Contributors
- [Piyush Rathore](https://github.com/Piyush2k23)
