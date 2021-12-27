import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postDog } from '../../actions/index';
import styles from './CreateDog.module.css';
import perro from '../../fondos/create.jpg'

export default function CreateDog() {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperament);

    const [input, setInput] = useState({
        name: '',
        life_span: '',
        temperament: []
    });

    const [weight, setWeight] = useState([0, 0])
    const [height, setHeight] = useState([0, 0])
    console.log(weight);

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
        const finalObj = {
            ...input,
            weight: weight.join(' - '),
            height: height.join(' - ')
        }
        console.log(finalObj);
        dispatch(postDog(finalObj));
        alert("Raza creada con exito!");
        setInput({
            name: "",
            life_span: "",
            temperament: []
        })
        setHeight([0, 0])
        setWeight([0, 0])
    }

    function handleSelect(e) {
        /* console.log(e.target.value); */
        const foundTemperament = temperaments.find((t) => t.id === Number(e.target.value));
        console.log(foundTemperament);
        const temperamentObj = { name: foundTemperament.name, id: e.target.value };
        setInput({
            ...input,
            temperament: [...input.temperament, temperamentObj]
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
                    <Link to="/home"><button className={styles.recargar}>Home</button></Link>
                    <Link to="./dog" /* className={styles.recargar} */><button className={styles.recargar}>Create Breed</button></Link>
                </div>
            </div>
            <div className={styles.todo}>
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
                                    type="text"
                                    value={input.name}
                                    name="name"
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div>
                                <label>Life span:</label>
                                <input
                                    type="text"
                                    value={input.life_span}
                                    name="life_span"
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div>
                                <label>Min weight (kg):</label>
                                <input
                                    type="number"
                                    value={weight[0]}
                                    name="min-weight"
                                    onChange={handleWeight}
                                />
                            </div>
                            <div>
                                <label>Max weight (kg):</label>
                                <input
                                    type="number"
                                    value={weight[1]}
                                    name="max-weight"
                                    onChange={handleWeight}
                                />
                            </div>
                            <div>
                                <label>Min height (cm):</label>
                                <input
                                    type="number"
                                    value={height[0]}
                                    name="min-height"
                                    onChange={handleHeight}
                                />
                            </div>
                            <div>
                                <label>Max height (cm):</label>
                                <input
                                    type="number"
                                    value={height[1]}
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
                                <ul><p>{input.temperament.map(el => el.name + ", ")}</p></ul>
                            </div>
                            <div className={styles.btn}>
                                <button className={styles.crear} type="submit">
                                    Create Breed
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}