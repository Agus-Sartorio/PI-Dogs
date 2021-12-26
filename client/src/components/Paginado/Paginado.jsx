import React from 'react';
import styles from './Paginado.module.css'

export default function Paginado({ dogsPerPage, allDogs, paginado }){
    const pageNumbers = [];

    for( let i = 0; i <= allDogs/dogsPerPage; i++){
        pageNumbers.push(i + 1);
    }

    return (
        <nav className={styles.nav}>
            <ul>
                {pageNumbers && 
                pageNumbers.map(number => ( 
                    <p key = {number} className={styles.p}>
                    <a onClick={() => paginado(number)} className={styles.a}>{number}</a>
                    </p>
                ))
                }
            </ul>
        </nav>
    )
}