import React from 'react';
import styles from './ObjectivePage.module.css';

function ObjectivePage() {
  return (
    <div className={styles.objectiveContainer}>
      <h1 className={styles.title}>Nosso Objetivo</h1>
      <p className={styles.text}>
        O sistema centraliza informações sobre projetos universitários, destacando áreas, 
        necessidades e metas, com uma interface intuitiva para investidores encontrarem 
        projetos alinhados aos seus interesses, incentivando investimentos em pesquisa e inovação.
      </p>
    </div>
  );
}

export default ObjectivePage;