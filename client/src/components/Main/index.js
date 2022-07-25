import styles from "./styles.module.css";
import React from "react";

export const Main = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Home</h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div className="text-center mt-5 border p-2">
        <h3>Welcome to Home Page</h3>
        <h4>User Authentication Successfully</h4>
      </div>
    </div>
  );
};
