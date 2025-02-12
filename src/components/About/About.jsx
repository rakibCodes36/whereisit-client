

const About = () => {
  return (
    <section className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
        About WhereIsIt
      </h1>
      <p className="text-gray-600 text-lg mb-4">
        <strong>WhereIsIt</strong> is a Lost and Found platform designed to connect individuals
        who have lost personal belongings with those who may have found them. The website
        enables users to report lost items, browse found items, and interact to recover
        their belongings efficiently.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">
        Project Overview
      </h2>
      <p className="text-gray-600 text-lg">
        This project offers a comprehensive experience in full-stack development, incorporating
        features such as user authentication, file uploads, database management, and API
        integration. It ensures a seamless experience for users by providing:
      </p>
      <ul className="list-disc list-inside text-gray-600 text-lg mt-2">
        <li>Secure user authentication using Firebase and JWT.</li>
        <li>Efficient lost and found item management with MongoDB.</li>
        <li>Fully responsive design optimized for mobile, tablet, and desktop.</li>
        <li>Seamless CRUD operations with real-time notifications.</li>
        <li>Search functionality to locate lost or found items quickly.</li>
      </ul>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">
        Deployment & Security
      </h2>
      <p className="text-gray-600 text-lg">
        To ensure a smooth user experience and data security, WhereIsIt follows best
        practices for deployment:
      </p>
      <ul className="list-disc list-inside text-gray-600 text-lg mt-2">
        <li>Secure environment variables for Firebase and MongoDB credentials.</li>
        <li>Server and client-side error handling to prevent CORS/404/504 issues.</li>
        <li>Proper authorization setup to protect private routes and user data.</li>
      </ul>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">
        Features & Functionality
      </h2>
      <ul className="list-disc list-inside text-gray-600 text-lg mt-2">
        <li>Home page with a dynamic slider showcasing recent lost & found items.</li>
        <li>Interactive Lost & Found Items page with filters and search.</li>
        <li>Users can add, update, manage, and delete their reported items.</li>
        <li>Recovered items section to track successfully returned belongings.</li>
        <li>Dynamic title updates for different routes for better UX.</li>
      </ul>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-2">
        Challenge Implementations
      </h2>
      <ul className="list-disc list-inside text-gray-600 text-lg mt-2">
        <li>JWT authentication for secure access control.</li>
        <li>Customizable layout for recovered items section (table and card view).</li>
        <li>Framer Motion animations for a modern and engaging UI.</li>
      </ul>
    </section>
  );
};

export default About;
