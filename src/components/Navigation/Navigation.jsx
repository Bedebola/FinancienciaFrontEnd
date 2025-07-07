import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  const location = useLocation();

  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navList}>
        <li>
          <NavLink 
            to="/HomePage" 
            className={({ isActive }) => 
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            HomePage
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/ObjectivePage" 
            className={({ isActive }) => 
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Objetivo
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/AboutPage" 
            className={({ isActive }) => 
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Quem Somos
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;