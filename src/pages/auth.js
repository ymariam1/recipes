import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/signup.module.css';
import Navbar from '../components/navbar';
import { signIn } from 'next-auth/react';

export default function Auth() {
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [signinData, setSigninData] = useState({ username: '', password: '' });


  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add(styles.localRightPanelActive);
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove(styles.localRightPanelActive);
    });
  }, []);

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSigninChange = (e) => {
    const { name, value } = e.target;
    setSigninData({ ...signinData, [name]: value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signinData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  
  return (
    <>
      <Head>
        <title>AI Chef Mate - Login/Sign Up</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </Head>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div id="container" className={`${styles.localContainer} flex justify-center items-center`}>
          <div className={`${styles.localFormContainer} ${styles.localSignUpContainer} bg-white p-8`}>
            <form className="text-center" onSubmit={handleSignupSubmit}>
              <h1 className={`${styles.localH1} font-bold mb-4 text-indigo-500 text-2xl`}>Create Account</h1>
              <div className={`${styles.localSocialContainer} mb-4`}>
              <button className={`${styles.socialButton} ${styles.googleButton}`} onClick={() => signIn('google')}>
              <img src="/img/google.png" alt="Google Logo" className={styles.googleLogo} />
              Create an account with Google
            </button>
              </div>
              <span className={`${styles.localSpan} block text-sm text-gray-600 mb-4`}>or use your email for registration</span>
              <input 
                type="text"
                name= "username"
                autoComplete='off'
                placeholder="Username" 
                className={`${styles.localInput} block w-full mb-2 p-2 border border-gray-300 rounded text-gray-600`}
                value={signupData.username}
                onChange={handleSignupChange}
              />
              <input 
                type="email"
                name='email' 
                placeholder="Email" 
                autoComplete='off'
                className={`${styles.localInput} block w-full mb-2 p-2 border border-gray-300 rounded text-gray-600`} 
                value={signupData.email}
                onChange={handleSignupChange}
              />
              <input 
                type="password" 
                name='password'
                autoComplete='off'
                placeholder="Password" 
                className={`${styles.localInput} block w-full mb-2 p-2 border border-gray-300 rounded text-gray-600`} 
                value={signupData.password}
                onChange={handleSignupChange}
              />
              <button className={`${styles.localButton} text-white py-2 px-6 rounded mt-4 transition-transform duration-75 ease-in-out active:${styles.localButtonActive}`}>Sign Up</button>
            </form>
          </div>
          <div className={`${styles.localFormContainer} ${styles.localSignInContainer} bg-white p-8`}>
            <form onSubmit={handleSigninSubmit} className="text-center">
              <h1 className={`${styles.localH1} font-bold mb-4 text-indigo-500 text-2xl`}>Log In</h1>
              <div className={`${styles.localSocialContainer} mb-4`}>
              <button className={`${styles.socialButton} ${styles.googleButton}`} onClick={() => signIn('google')}>
              <img src="/img/google.png" alt="Google Logo" className={styles.googleLogo} />
              Log in with Google
            </button>
              </div>
              <span className={`${styles.localSpan} block text-sm text-gray-600 mb-4`}>or use your account</span>
              <input 
                type="username" 
                name='username'
                autoComplete='off'
                placeholder="Username" 
                className={`${styles.localInput} block w-full mb-2 p-2 border border-gray-300 rounded text-gray-600`} 
                value={signinData.username}
                onChange={handleSigninChange}
              />
              <input 
                type="password" 
                name='password'
                placeholder="Password" 
                autoComplete='off'
                className={`${styles.localInput} block w-full mb-2 p-2 border border-gray-300 rounded text-gray-600`} 
                value={signinData.password}
                onChange={handleSigninChange}
              />
              <a href="#" className={`${styles.localA} text-sm text-blue-500 mb-4 block`}>Forgot your password?</a>
              <button className={`${styles.localButton} bg-blue-500 text-white py-2 px-6 rounded mt-4 transition-transform duration-75 ease-in-out active:${styles.localButtonActive}`}>Sign In</button>
            </form>
          </div>
          <div className={styles.localOverlayContainer}>
            <div className={styles.localOverlay}>
              <div className={`${styles.localOverlayPanel} ${styles.localOverlayLeft}`}>
                <h1 className={`${styles.localH1} font-bold text-xl text-white`}>Welcome Back!</h1>
                <p className={`${styles.localP} text-white`}>If you already have an account click below to log in</p>
                <button className={`${styles.localButton} ${styles.localGhost}`} id="signIn">Log in</button>
              </div>
              <div className={`${styles.localOverlayPanel} ${styles.localOverlayRight}`}>
                <h1 className={`${styles.localH1} font-bold text-white text-xl`}>Hey Stranger!</h1>
                <p className={`${styles.localP} text-white`}>If you're new around here enter your information to join</p>
                <button className={`${styles.localButton} ${styles.localGhost}`} id="signUp">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
