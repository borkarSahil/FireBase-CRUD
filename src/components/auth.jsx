import React, { useState } from "react";
import { auth, googleProvider } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // Log Current User
  if (auth.currentUser) {
  console.log("current User",auth.currentUser.email);
  }else{
    console.log("No current User");
  }

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Successfully created user");
    } catch (error) {
      console.log("SignIn error " + error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log("SignIn error " + error);
    }
  };

  const logOut = async() => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("SignIn error " + error);
    }
  }

  return (
    <div>
      Login
      <div>
        <input
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          // type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}>Sign In</button>
      </div>
      <div>
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      </div>
      <div>
        <button onClick={logOut}>LogOut</button>
      </div>
    </div>
  );
};

export default Auth;
