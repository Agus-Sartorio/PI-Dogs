import React, { useState } from "react";
import { Link } from "react-router-dom"
import styles from './Card.module.css';
import DogDetail from '../DogDetail/DogDetail'

export default function Card({ dogDetail }) {

    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(!show)
    }

    let temperament = dogDetail.temperament ? dogDetail.temperament.split(',') : dogDetail.Temperaments?.map(e => e.name)
    const { name, image, weight } = dogDetail;
    return (
        <>
        <div onClick={handleClick} className={styles.card}>
            <div className={styles.divImg}>
                <img className={styles.cardImg} src={image} alt={name} width="400px" height="250px" />
            </div>
            <div className={styles.info}>
                <div>
                    <h2 className={styles.dogName}>
                        {name}
                    </h2>
                </div>
                <div className={styles.cont}>
                    <h5 className={styles.temperament}>Temperaments</h5>
                    {
                        temperament?.map(el => {
                            return <p className={styles.temperaments}>{el + ' '}</p>
                        })
                    }
                    <div className={styles.peso}>
                        <h5 className={styles.h5}>Weight: </h5>
                        <p className={styles.w}>{weight} kg</p>
                    </div>
                </div>
            </div>
        </div>
        
            {
                show &&
                <DogDetail
                    dogDetail={dogDetail}
                    temperament={temperament}
                    setShow={setShow}
                />
            }
            </>
    );
}