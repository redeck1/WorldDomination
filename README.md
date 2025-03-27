# Prerequisites:

1.Node.js: Node.js is a JavaScript runtime environment that is used for building server-side applications. It is also required for running React projects. You can download the latest version of Node.js from their official website.

2. npm (Node Package Manager): npm is a package manager for Node.js that allows you to download and install packages and dependencies that are required for your React project. npm is included with Node.js, so you don’t have to install it separately.
   
3. Git: Git is a version control system that is used for tracking changes in source code. You’ll need to have Git installed in order to download the React project from GitHub. You can download the latest version of Git from their official website.

Once you have these prerequisites installed, you can follow these steps to download a React project from Github and run it on your computer:

## 1. Clone the repository:
Here are the steps to clone a GitHub repository for a React app:

Open your web browser and navigate to the GitHub repository page for the React app.
On the right-hand side of the page, click on the “Code” button.
In the drop-down menu, select HTTPS to clone the repository.
Click the “Copy” button to copy the URL of the repository to your clipboard.

Now Open the terminal or command prompt and navigate to the directory where you want to store the React project. Then, run the following command to clone the repository:
`git clone https://github.com/redeck1/WorldDomination.git`

## 2. Run express app:
After the repository is cloned, navigate to the project directory and run the following commands:

`cd WorldDomination/backend`
`npm i`
And run command `npm run dev`
this will start the server

## 3. Navigate to the frontend project directory:
open another terminal and go to WorldDomination/frontend
`cd WorldDomination/frontend`

## 4. Install dependencies:
Once you’re inside the project directory, run the following command to install the dependencies required for the project:

`npm i`

This command will read the package.json file in the repository and download all of the dependencies listed there.

## 5. Start the development server:
Use this command in the terminal

`npm start`

This command will start a local development server and run the React project in your web browser. You can access the project by navigating to http://localhost:3000 in your web browser.

