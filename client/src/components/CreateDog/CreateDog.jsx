import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postDog } from '../../actions/index';
import styles from './CreateDog.module.css';
import perro from '../../fondos/create.jpg';
import { motion } from "framer-motion"

export default function CreateDog() {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperament);
    const [temperamentError, setErrors] = useState(false);

    const [input, setInput] = useState({
        name: '',
        life_span: '',
        temperament: []
    });

    const [weight, setWeight] = useState([null, null])
    const [height, setHeight] = useState([null, null])

    const handleHeight = (e) => {
        if (e.target.name === 'min-height') {
            setHeight((prev) => [e.target.value, prev[1]])
        } else {
            setHeight((prev) => [prev[0], e.target.value])
        }
    }

    const handleWeight = (e) => {
        if (e.target.name === 'min-weight') {
            setWeight((prev) => [e.target.value, prev[1]])
        } else {
            setWeight((prev) => [prev[0], e.target.value])
        }
    }

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (input.temperament.length === 0) {
            setErrors(true);
        }
        else {
            const finalObj = {
                ...input,
                weight: weight.join(' - '),
                height: height.join(' - ')
            }
            dispatch(postDog(finalObj));
            alert("Raza creada con exito!");
            setInput({
                name: "",
                life_span: "",
                temperament: []
            })
            setHeight([null, null])
            setWeight([null, null])
        }
    }

    function handleSelect(e) {
        if (input.temperament.find(t => t.id === e.target.value)) return
        const foundTemperament = temperaments.find((t) => t.id === Number(e.target.value));
        const temperamentObj = { name: foundTemperament.name, id: e.target.value };
        setInput({
            ...input,
            temperament: [...input.temperament, temperamentObj]
        })
    }

    const deleteTemp = (id) => {
        console.log(typeof id)
        setInput({
            ...input,
            temperament: input.temperament.filter(t => t.id !== id)
        })
    }

    useEffect(() => {
        dispatch(getTemperaments());
    }, []);

    return (
        <div>
            <div className={styles.divFijo}>

                <h1 className={styles.dogi}>DOGIPEDIA🐾</h1>

                <div className={styles.divbotones}>
                    <NavLink to="/home"><button className={styles.recargar}>Home</button></NavLink>
                    <NavLink to="./dog" /* className={styles.recargar} */><button className={styles.recargar}>Create Breed</button></NavLink>
                </div>
            </div>
            <motion.div className={styles.todo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            >
                <div className={styles.formulario}>
                    <div className={styles.image}>
                        <img src={perro} alt='img' />
                    </div>
                    <div className={styles.formulario2}>
                        <h1>Create your own breed!</h1>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div>
                                <label>Name:</label>
                                <input
                                    required
                                    type="text"
                                    value={input.name}
                                    name="name"
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div>
                                <label>Life span:</label>
                                <input
                                    required
                                    type="number"
                                    value={input.life_span}
                                    min='1'
                                    name="life_span"
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div>
                                <label>Min weight (kg):</label>
                                <input
                                    required
                                    type="number"
                                    value={weight[0]}
                                    min='1'
                                    name="min-weight"
                                    onChange={handleWeight}
                                />
                            </div>
                            <div>
                                <label>Max weight (kg):</label>
                                <input
                                    required
                                    type="number"
                                    value={weight[1]}
                                    min='1'
                                    name="max-weight"
                                    onChange={handleWeight}
                                />
                            </div>
                            <div>
                                <label>Min height (cm):</label>
                                <input
                                    required
                                    type="number"
                                    value={height[0]}
                                    min='1'
                                    name="min-height"
                                    onChange={handleHeight}
                                />
                            </div>
                            <div>
                                <label>Max height (cm):</label>
                                <input
                                    required
                                    type="number"
                                    value={height[1]}
                                    min='1'
                                    name="max-height"
                                    onChange={handleHeight}
                                />
                            </div>
                            <div>
                                <label>Temperaments: </label>
                                <select onChange={(e) => handleSelect(e)}>
                                    {temperaments.map((t) => {
                                        return <option value={t.id}>{t.name}</option>
                                    })}
                                </select>
                                {temperamentError && input.temperament.length === 0 &&
                                    <p>At least one temperament is required!</p>
                                }
                                <ul className={styles.ul}>{input.temperament.map((el) => {
                                    return <li>{el.name}<button className={styles.close} onClick={() => deleteTemp(el.id)}><i class="fas fa-times"></i></button></li>;
                                })}</ul>
                            </div>
                            <div className={styles.btn}>
                                <button className={styles.crear} type="submit">
                                    Create Breed
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}