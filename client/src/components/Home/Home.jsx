import React from 'react';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import { getDogs, getTemperaments, filterDogsByTemperament, filterCreated, orderByName, orderByWeight } from '../../actions';
import Card from "../Card/Card"
import Paginado from '../Paginado/Paginado';
import SearchBar from '../SearchBar/SearchBar';
import dogError from '../../fondos/fire.png';
import loader from '../../fondos/loader.png'
import styles from './Home.module.css'

export default function Home() {

    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const allDogsCopy = useSelector((state) => state.dogsCopy)
    console.log(allDogs);
    const allTemperaments = useSelector((state) => state.temperament);
    const [orden, setOrden] = useState();
    const [page, setPage] = useState(0);
    const [name, setName] = useState("");
    const breedsPerPage = 10;
    const pagesVisited = page * breedsPerPage;
    const displayBreeds = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase())).slice(pagesVisited, pagesVisited + breedsPerPage).map(
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

    const pageCount = Math.ceil(allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase())).length / breedsPerPage);
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
                <SearchBar 
                name={name}
                setName={setName}
                />
                <div className={styles.fijo}>
                    <div className={styles.temperamentos}>
                        <p className={styles.filtro}>Filter By Origin</p>
                        <select className={styles.select} onChange={e => handleCreated(e)}>
                            <option value="All">All</option>
                            <option value="created">Created</option>
                            <option value="api">Existing</option>
                        </select>
                    </div>
                    <div className={styles.temperamentos}>
                        <p className={styles.filtro}>Sort By</p>
                        <select className={styles.select} onChange={e => handleSort(e)}>
                            <option value="asc">Name asc</option>
                            <option value="desc">name desc</option>
                        </select>
                        <select className={styles.select2} onChange={e => handleSortWeight(e)}>
                            <option value="asc">Weight asc</option>
                            <option value="desc">Weight desc</option>
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
                {
                    !allDogs.length && !allDogsCopy.length  && 
                    <div className={styles.load}>
                        <img src={loader} alt="" />
                        <p>Loading...</p>
                    </div>
                }
                {
                    !allDogs.length && allDogsCopy.length > 0 && 
                    <div>
                        <h2>There is no breed to show \ (o_o) / </h2>
                        <img className={styles.dogError} src={dogError} alt="" />
                    </div>
                }
                <div className={styles.perros}>
                    {allDogs.length > 0 && displayBreeds}
                </div>
            </div>
            {allDogs.length > 10 && 
            <div className={styles.pagination}>
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={styles.paginationButtons}
                    previousLinkClassName={styles.previousButton}
                    activeClassName={styles.paginationActive}
                />
            </div>}
        </div>
    )
}