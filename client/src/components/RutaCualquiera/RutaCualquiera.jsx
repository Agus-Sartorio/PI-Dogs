import React from 'react';
import { Link } from "react-router-dom";
import styles from "./RutaCualquiera.module.css";
import dogError from '../../fondos/fire.png';

export default function RutaCualquiera() {
    return (
        <div>
            <div className={styles.divFijo}>
                <h1 className={styles.dogi}>DOGIPEDIA🐾</h1>
                <div className={styles.divbotones}>
                    <Link to="/home"><button className={styles.recargar}>Home</button></Link>
                    <Link to="./dog"><button className={styles.recargar}>Create Breed</button></Link>
                </div>
            </div>
            <div className={styles.dogError}>
                <p>There is no path with this name</p>
                <img src={dogError} alt="img not found" />
            </div>
        </div>
    )
}