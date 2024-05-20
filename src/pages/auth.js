import React, { useEffect } from 'react';
import Head from 'next/head';
import styles from '../styles/signup.module.css';
import Navbar from '../components/navbar';

export default function Auth() {
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
            <form action="#" className="text-center">
              <h1 className={`${styles.localH1} font-bold mb-4 text-indigo-500 text-2xl`}>Create Account</h1>
              <div className={`${styles.localSocialContainer} mb-4`}>
              <button className={`${styles.socialButton} ${styles.googleButton}`}>
              <img src="/img/google.png" alt="Google Logo" className={styles.googleLogo} />
              Create an account with Google
            </button>
              </div>
              <span className={`${styles.localSpan} block text-sm text-gray-600 mb-4`}>or use your email for registration</span>
              <input type="text" placeholder="Name" className={`${styles.localInput} block w-full mb-2 p-2 border border-gray-300 rounded`} />
              <input type="email" placeholder="Email" className={`${styles.localInput} block w-full mb-2 p-2 border border-gray-300 rounded`} />
              <input type="password" placeholder="Password" className={`${styles.localInput} block w-full mb-2 p-2 border border-gray-300 rounded`} />
              <button className={`${styles.localButton} text-white py-2 px-6 rounded mt-4 transition-transform duration-75 ease-in-out active:${styles.localButtonActive}`}>Sign Up</button>
            </form>
          </div>
          <div className={`${styles.localFormContainer} ${styles.localSignInContainer} bg-white p-8`}>
            <form action="#" className="text-center">
              <h1 className={`${styles.localH1} font-bold mb-4 text-indigo-500 text-2xl`}>Log In</h1>
              <div className={`${styles.localSocialContainer} mb-4`}>
              <button className={`${styles.socialButton} ${styles.googleButton}`}>
              <img src="/img/google.png" alt="Google Logo" className={styles.googleLogo} />
              Log in with Google
            </button>
              </div>
              <span className={`${styles.localSpan} block text-sm text-gray-600 mb-4`}>or use your account</span>
              <input type="email" placeholder="Email" className={`${styles.localInput} block w-full mb-2 p-2 border border-gray-300 rounded`} />
              <input type="password" placeholder="Password" className={`${styles.localInput} block w-full mb-2 p-2 border border-gray-300 rounded`} />
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
                <p className={`${styles.localP} text-white`}>If you're new around here enter your information to join the family</p>
                <button className={`${styles.localButton} ${styles.localGhost}`} id="signUp">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
