# Support Ticketing System
![](https://img.shields.io/github/stars/mcmfire/support-ticketing-system) ![](https://img.shields.io/github/forks/mcmfire/support-ticketing-system) ![](https://img.shields.io/github/issues/mcmfire/support-ticketing-system)
### Features
- Ticket creation, modification, and deletion for submitting support requests to technical supports.
- Ticket logs to keep finished tasks and review it's solution to help solve present problems.
- Real-time active user display to see available and unavailable respondents.
- Account creation, modification, and deletion for up-to-date user identification and data saving.

### Tech Stack
- ReactJS (Frontend)
- Flask (Backend)
- MongoDB (Database)
- Firebase (CDN)

### Requirements
- Python v3.11.4 and above
- Node.js v20.5.1 and above

### Installation and Setup
1. Navigate to the directory you want to save the files and open Command Prompt (cmd) there.

2.  Clone the repository to save the necessary files to your machine.

    `git clone https://github.com/mcmfire/support-ticketing-system.git`

3. Create a virtual environment inside the **server** folder by opening the Command Prompt (cmd) there.

    `python -m venv venv`

4. On the same directory, activate the virtual environment.

    `.\\venv\\Scripts\\activate`

5. Install the server dependencies on the very same location.

    `pip install -r requirements.txt`

6. Create a **.env** file on the same location to setup your configuration. Copy, Paste, and Replace the values that corresponds to the resources you have.
    ```
    SECRET_KEY = 'YOUR SECRET KEY'
    JWT_SECRET_KEY = 'YOUR JWT SECRET KEY'
    MONGO_URI = 'YOUR MONGO URI'
    FIREBASE_STORAGE_BUCKET = 'YOUR FIREBASE STORAGE BUCKET'
    ```
    **SECRET_KEY** - refers to the secret key for your Flask server. (e.g. SECRET)

    **JWT_SECRET_KEY** - refers to the secret key for JSON Web Token digital signature. (e.g. JWTSECRET)

    **MONGO_URI** - refers to the connection string of your [MongoDB](https://cloud.mongodb.com/ "MongoDB") cluster. (e.g. mongodb+srv://admin:password.mongodb.net/?retryWrites=true&w=majority)

    **FIREBASE_STORAGE_BUCKET** - refers to the connection string of your [Firebase](https://console.firebase.google.com/ "Firebase") storage bucket. (e.g. my-firebase-storage-bucket.appspot.com)

7. Create **key** folder inside the **config** folder and place your generated Firebase private key file inside. Name your private key file with **firebase-adminsdk.json**.

8. Start the server.

    `python app.py`

9. Navigate to the **client** folder and install client dependencies by opening the Command Prompt (cmd) there.

    `npm install`

10. Build the project on the same directory to start serving client files.

    `npm run build`

11. While the server is running, you can go to [http://localhost:5000/](http://localhost:5000/ "http://localhost:5000/") to start using the web application.

### Containerization \[Optional\]
1. Go to the root folder **support-ticketing-system** and build the Docker image for containerization. You can change the name of the image following this format (**name**:**version/tag**).

    `docker build -t support-ticketing-system:1.0`

2. Replace **IMAGE_ID** with the image id of the docker image to run the image and create a container.

    `docker run -p 5000:5000 IMAGE_ID`

3. While the container is running, you can go to the same URL [http://localhost:5000/](http://localhost:5000/ "http://localhost:5000/") to access the web application.