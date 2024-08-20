# Token Refresh Example with Axios and Auth0

This project demonstrates handling token-based authentication and automatic token refreshing using Axios and Auth0 in a React + TypeScript application. Built with Vite, the setup ensures fast development cycles and smooth integration of the latest web technologies.

## Project Overview

The project provides a practical implementation of token management in a React application, including:

- **Token Authentication**: Automatically includes the Auth0 access token in API requests.
- **Automatic Token Refresh**: Seamlessly refreshes the token when it expires, ensuring uninterrupted API communication.
- **Efficient Error Handling**: Handles authentication errors by retrying requests with a new token.

## Project Structure

- **src/**

  - **api/**: Contains API-related code.
    - `api.ts`: Defines the API endpoints and handles API requests.
    - `auth.ts`: Manages authentication logic using Auth0.
    - `interceptors.ts`: Sets up Axios interceptors to handle authentication and token refreshing.
    - `refreshToken.ts`: Contains the logic to handle token refreshing, ensuring only one refresh request is processed at a time.
  - **assets/**: Holds static assets like images and other resources.
  - **components/**: Reusable React components.
    - `ProtectedRoute.tsx`: A component that guards routes requiring authentication.
    - `TestApiComponent.tsx`: Example component demonstrating an API call with authentication.
    - `index.ts`: Centralized exports for components.
  - **pages/**: Main application pages.
    - `HomePage.tsx`: The main homepage component.
    - `App.tsx`: Root component of the application.
    - `main.tsx`: Entry point for the React application.
  - **vite-env.d.ts**: TypeScript definitions for Vite environment variables.

## Installation and Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ali-noori-dev/token-refresh-example.git
   cd project-folder
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Run the development server**:

   ```bash
   npm run dev
   ```

4. **Build the project for production**:
   ```bash
   npm run build
   ```

## Usage

### Axios Interceptors

- **Request Interceptor**: The `addAuthToken` function in `interceptors.ts` adds the Auth0 access token to each API request's Authorization header.
- **Response Interceptor**: The `retryRequest` function handles 401 Unauthorized errors by invoking the `refreshToken` logic and retrying the original request with a new token.

### Token Refresh Logic

- The `refreshToken.ts` file ensures that only one token refresh request is made at a time. If a token refresh is in progress, subsequent requests wait for the token refresh to complete before proceeding.

## Contribution Guidelines

Contributions are welcome! Please open an issue or submit a pull request if you find any issues or have suggestions for improvements.
