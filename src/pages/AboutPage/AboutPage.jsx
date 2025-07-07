import React from 'react';
import styles from './AboutPage.module.css';

function AboutPage() {
  return (
    <div className={styles.aboutContainer}>
      <h1 className={styles.title}>Quem Somos</h1>
      <p className={styles.description}>
        Somos um grupo de estudantes dedicados a criar uma ponte entre a academia e o mercado, 
        facilitando o financiamento de projetos universitários inovadores.
      </p>
      <h2 className={styles.subtitle}>Equipe do Projeto</h2>
      <ul className={styles.teamList}>
        <li>Berenice Comel</li>
        <li>Rafael Rosa</li>
        <li>Yasmin Inácio</li>
        <li>Bianca D.</li>
      </ul>
    </div>
  );
}

export default AboutPage;