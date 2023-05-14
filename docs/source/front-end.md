# Front-End

## Purpose
Provide users with the ability to interact with the Snohomish County PUD transmission drawings database.  
## Getting Started
#### To run the application locally:
1. Clone the `tx_dwgs` repository if you haven't done so already.

2. Change into `front-end` directory.

    ```
    cd front-end
    ```

3. Install the npm packages.

    ```
    npm install
    ```

4. Start the application.

    ```
    npm run dev
    ```

## Project Structure & Design
### Tools
 - [React](https://react.dev/)
 - [NextJS](https://nextjs.org/)
 - [Ant Design](https://ant.design/)
 - [React Icons](https://github.com/react-icons/react-icons#readme)

 ### Design Choices
 We decided to create a React application via the NextJS framework.  We initialized the NextJS framework with the `app` directory.

## Views
### Search
The default view which allows any user to query the transmission drawing database and view the results.  See the API documentation **Response** section for details on what responses will be returned from different queries.

### Data
Provides insights and analysis of the transmission drawing data.

### Admin
Allows users with appropriate credentials to perform all CRUD actions on the transmission drawing database.

## GitHub Action Workflows
### ESLint

