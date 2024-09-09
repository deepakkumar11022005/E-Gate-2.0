import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2 = ({ API_URL, setLoggedEmail, setToken, setRole, onLogin }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleOAuth2Callback = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const encodedData = queryParams.get('data');  
      if (encodedData) {
        try {
   
          const decodedData = atob(encodedData);
          const parsedData = JSON.parse(decodedData);  

          console.log('Parsed Data:', parsedData); // Debugging line to see the parsed data

          // Extract role, token, and email from the parsed data
          const { role, token, email } = parsedData;

          // Set the email, token, and role using the passed props
          setLoggedEmail(email);
          setToken(token);
          setRole(role);

          // Call the onLogin function to set the login state
          onLogin(role, token, email);

          // Navigate to the appropriate page based on the role
          if (role === 'admin') {
            navigate('/admin/home');
          } else if (role === 'Entry') {
            navigate('/entry');
          }
        } catch (err) {
          console.error('Error decoding or parsing data:', err);
          // Handle the error by redirecting to a fallback page or showing an error message
          navigate('/error'); // Example of a fallback route
        }
      } else {
        // If no encoded data is found, redirect to the login page
        navigate('/login'); // Adjust the fallback page as needed
      }
    };

    handleOAuth2Callback();
  }, [navigate, setLoggedEmail, setToken, setRole, onLogin]);

  return <div>Loading...</div>; // Display a loading state while processing
};

export default OAuth2;
