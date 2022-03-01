import React, { useState, useRef, useEffect } from "react";
import styles from './Card.module.css';
import DogDetail from '../DogDetail/DogDetail'
import { motion } from "framer-motion"

export default function Card({ dogDetail }) {

    const div = useRef();

    const [show, setShow] = useState(false);

    const handleClick = () => {
        setShow(!show)
    }

    let temperament = dogDetail.temperament ? dogDetail.temperament.split(',') : dogDetail.Temperaments?.map(e => e.name)
    const { name, image, weight } = dogDetail;

    useEffect(() => {
        div.current.style.backgroundImage = `url(${image})`;
    }, [image])

    return (
        <>
            <motion.div onClick={handleClick} ref={div} className={styles.card}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
            >
                <div className={styles.info}>
                    <div>
                        <h2 className={styles.dogName}>
                            {name}
                        </h2>
                    </div>
                    <div className={styles.cont}>
                        <h5 className={styles.temperament}>Temperaments {/* <i className="far fa-heart"></i> */}</h5>
                        {
                            temperament?.map(el => {
                                return <p key={el} className={styles.temperaments}>{el + ' '}</p>
                            })
                        }
                        <div className={styles.peso}>
                            <h5 className={styles.h5}>Weight: </h5>
                            <p className={styles.w}>{weight} kg</p>
                        </div>
                    </div>
                </div>
            </motion.div>

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