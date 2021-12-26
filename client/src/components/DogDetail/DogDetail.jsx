import React, { useRef, useEffect } from 'react';
import styles from './DogDetail.module.css'

export default function DogDetail({ dogDetail, temperament, setShow }) {
    const { name, image, weight, height, life_span } = dogDetail;

    const overlay = useRef();
    const event = (e) => {
        if (e.key === 'Escape') {
            setShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', event)
        return () => {
            window.removeEventListener('keydown', event)
        }
    }, [])

    const handleClick = () => {
        setShow(false);
    }

    const handleOverlayClick = (e) => {
        if (e.target === overlay.current) {
            setShow(false);
        }
    }

    return (
        <div ref={overlay} onClick={handleOverlayClick} className={styles.overlay}>
            <div className={styles.modal}>
                <button onClick={handleClick} className={styles.close}>❌</button>
                <div className={styles.img}>
                    <img src={image} alt={name} width="500px" height="700px" />
                </div>
                <div className={styles.info}>
                    <h1>{name}</h1>
                    <h2>Temperaments:</h2>
                    <p>{temperament.map(t => <span>{t.trim()}</span>)}</p>

                    <h2>Life span: </h2>
                    <p>{life_span} years</p>

                    <h2>Weight: </h2>
                    <p>{weight} kg</p>

                    <h2>Height: </h2>
                    <p>{height} cm</p>
                </div>
            </div>
        </div>
    )
}