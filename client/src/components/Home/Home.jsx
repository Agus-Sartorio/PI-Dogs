import React from 'react';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { getDogs, getTemperaments, filterDogsByTemperament, filterCreated, orderByName, orderByWeight } from '../../actions';
import Card from "../Card/Card"
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Home.module.css'

export default function Home() {

    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    console.log(allDogs);
    const allTemperaments = useSelector((state) => state.temperament);
    const [orden, setOrden] = useState();
    const [page, setPage] = useState(0);
    const breedsPerPage = 10;
    const pagesVisited = page * breedsPerPage;
    const displayBreeds = allDogs.slice(pagesVisited, pagesVisited + breedsPerPage).map(
        (d) => {
            
            return <Card dogDetail={d} key={d.id} />
        }
    )

    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    function handleClick(e) {
        e.preventDefault();
        dispatch(getDogs());
    }

    function handleTemperament(e) {
        dispatch(filterDogsByTemperament(e.target.value));
    }

    function handleCreated(e) {
        dispatch(filterCreated(e.target.value));
    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setPage(0);
        setOrden(`Ordenado ${e.target.value}`);
    }

    function handleSortWeight(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setPage(0);
        setOrden(`Ordenado ${e.target.value}`);
    }

         const pageCount = Math.ceil(allDogs.length / breedsPerPage);
        const changePage = ({ selected }) => {
            setPage(selected)
        } 

    return (
        <div>
            <div className={styles.divFijo}>

                <h1 className={styles.dogi}>DOGIPEDIA🐾</h1>

                <div className={styles.divbotones}>
                    <button className={styles.recargar} onClick={handleClick}>Reload Dogs</button>
                    <Link to="./dog" /* className={styles.recargar} */><button className={styles.recargar}>Create Breed</button></Link>
                </div>
            </div>
            <div className={styles.div2}>
                <SearchBar />
                <div className={styles.fijo}>
                <div className={styles.temperamentos}>
                    <p className={styles.filtro}>Filter By Origin</p>
                    <select className={styles.select} onChange={e => handleCreated(e)}>
                        <option value="All">Todos</option>
                        <option value="created">Creados</option>
                        <option value="api">Existente</option>
                    </select>
                </div>
                <div className={styles.temperamentos}>
                    <p className={styles.filtro}>Sort By</p>
                    <select className={styles.select} onChange={e => handleSort(e)}>
                        <option value="asc">Ascendente</option>
                        <option value="desc">Descendente</option>
                    </select>
                    <select className={styles.select2} onChange={e => handleSortWeight(e)}>
                        <option value="asc">Peso ascendente</option>
                        <option value="desc">Peso descendente</option>
                    </select>
                    <button className={styles.clear} onClick={handleClick}>Clear</button>
                </div>

                <div className={styles.temperamentos}>
                    <p className={styles.filtro}>Filter By Temperament</p>
                    <select className={styles.select} onChange={e => handleTemperament(e)}>
                        <option value="all">Temperaments</option>
                        {allTemperaments && allTemperaments.map(el => {
                            return <option key={el.id} value={el.name}>{el.name}</option>
                        })}
                    </select>
                    <button className={styles.clear} onClick={handleClick}>Clear Temperament</button>
                </div>
                </div>
                <div className={styles.perros}>
                    {allDogs.length > 0 && displayBreeds}
                </div>
            </div>
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={changePage}
            />
        </div>
    )
}