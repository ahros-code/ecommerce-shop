import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const ActivateAccountPage = () => {
  const { code } = useParams();

  const [isActivated, setIsActivated] = useState(false);

  const navigate = useNavigate()

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const activation = await axios.get(
            `${import.meta.env.VITE_BACK_URL}/api/auth/activate/${code}`
        );
        if(activation.statusText === "OK") {
          setTimeout(() => {
            setIsActivated(true)
          }, 700)
          setTimeout(() => {
            navigate("/")
          }, 1500)
        }
      } catch (error) {
        console.error('Error activating account:', error);
      }
    };

    activateAccount(); // Call the activateAccount function

  }, [code]); // Include the 'code' variable as a dependency

  return (
      <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            background: '#f9f9f9',
          }}
      >
        <div
            style={{
              width: '400px',
              padding: '20px',
              background: '#fff',
              boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
          <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
            Account Activation
          </h1>
          <p style={{ textAlign: 'center', marginBottom: '20px' }}>
            {!isActivated ? 'Activating your account...' : 'Account activated successfully ✅'}
          </p>
        </div>
      </div>
  );
};

export default ActivateAccountPage;