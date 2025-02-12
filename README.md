# WhereIsIt - A Lost and Found Items Website

## Project Purpose
WhereIsIt is a web platform designed to help people connect with others who have found or lost personal items. The website allows users to report lost belongings, browse found items, and interact to reunite owners with their possessions. The platform features secure authentication, a fully responsive design, and dynamic item management.

## Live URL
https://whereisit-bd.netlify.app

## Key Features
- **User Authentication**: Login and registration with email/password and social login options (Google or GitHub).
- **Add Lost/Found Items**: Users can submit details of lost or found items, including image uploads.
- **Interactive Item Pages**: View detailed item posts and interact by marking items as "Found" or "Mine" to facilitate recovery.
- **Manage My Items**: Users can update, delete, or view the posts they have added.
- **Search Functionality**: Search for lost and found items by title or location.
- **Responsive Design**: Fully responsive website optimized for mobile, tablet, and desktop views.
- **JWT Authentication**: Secure user authentication using JSON Web Tokens (JWT) for private routes.
- **Dynamic Page Titles**: The title of the website dynamically changes based on the route.
- **sweetalert2 alert and Toast Notifications**: Display SweetAlert2 notifications and toast messages for user actions such as login, item submission, or post updates.
- **Error Handling**: Custom 404 page and loading spinners to improve user experience.



---

## NPM Packages Used
- **express**: Fast, unopinionated web framework for Node.js.
- **mongodb**: MongoDB native driver for interacting with the database.
- **cookie-parser**: Middleware to parse cookies in HTTP requests.
- **cors**: Middleware to enable Cross-Origin Resource Sharing (CORS).
- **jsonwebtoken**: For JWT-based user authentication.
- **react-router-dom**: For handling routing in the React frontend.
- **axios**: For making HTTP requests to the server.
- **react-toastify**: For displaying toast notifications.
- **react-datepicker**: A date picker component for selecting dates (lost/found).
- **react-icons**: For adding icons to the UI.
- **sweetalert2**: For custom alert pop-ups and notifications.
- **dotenv**: For managing environment variables.
- **react-dropzone**: For file uploads (handling item images).
- **framer-motion**: For animations and transitions on the homepage.
- **firebase**: For social login (Google/GitHub) and user authentication.
- **react-tooltip**: For displaying tooltips on hover, providing helpful hints and additional information to users.
- **headlessui**: A set of completely unstyled, fully accessible UI components designed to integrate with Tailwind CSS, providing features like modals, dialogs, and dropdowns without predefined styles.


