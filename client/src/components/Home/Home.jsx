import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";
import {
  getDogs,
  getTemperaments,
  filterDogsByTemperament,
  filterCreated,
  orderByName,
  orderByWeight,
} from "../../actions";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import dogError from "../../fondos/fire.png";
import loader from "../../fondos/loader.png";
import styles from "./Home.module.css";
import { motion } from "framer-motion";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allDogsCopy = useSelector((state) => state.dogsCopy);
  const allTemperaments = useSelector((state) => state.temperament);
  const [, setOrden] = useState();
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [showMenu, setShowMenu] = useState(true);
  const breedsPerPage = 10;
  const pagesVisited = page * breedsPerPage;
  const displayBreeds = allDogs
    .filter((d) => d.name.toLowerCase().includes(name.toLowerCase()))
    .slice(pagesVisited, pagesVisited + breedsPerPage)
    .map((d) => {
      return <Card dogDetail={d} key={d.id} />;
    });

  const checkSize = () => {
    if (window.innerWidth <= 860) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  };

  useEffect(() => {
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  console.log(showMenu);

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

  const pageCount = Math.ceil(
    allDogs.filter((d) => d.name.toLowerCase().includes(name.toLowerCase()))
      .length / breedsPerPage
  );
  const changePage = ({ selected }) => {
    setPage(selected);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <div className={styles.divFijo}>
        <h1 className={styles.dogi}>
          <span>DOGIPEDIA</span>????
        </h1>

        <div className={styles.divbotones}>
          <button className={styles.recargar} onClick={handleClick}>
            Reload Dogs
          </button>
          <NavLink to="./dog" /* className={styles.recargar} */>
            <button className={styles.recargar}>Create Breed</button>
          </NavLink>
        </div>
      </div>
      <div className={styles.div2}>
        <SearchBar name={name} setName={setName} />
        <button
          onClick={toggleMenu}
          className={`${styles.menuBtn} ${showMenu && styles.open}`}
        >
          <span className={styles.icon1} />
          <span className={styles.icon2} />
        </button>
        <div className={`${styles.fijo} ${!showMenu && styles.hidden}`}>
          <div className={styles.temperamentos}>
            <p className={styles.filtro}>Filter By Origin</p>
            <select
              className={styles.select}
              onChange={(e) => handleCreated(e)}
            >
              <option value="All">All</option>
              <option value="created">Created</option>
              <option value="api">Existing</option>
            </select>
          </div>
          <div className={styles.temperamentos}>
            <p className={styles.filtro}>Sort By</p>
            <select className={styles.select} onChange={(e) => handleSort(e)}>
              <option value="asc">Name asc</option>
              <option value="desc">name desc</option>
            </select>
            <select
              className={styles.select2}
              onChange={(e) => handleSortWeight(e)}
            >
              <option value="asc">Weight asc</option>
              <option value="desc">Weight desc</option>
            </select>
            <button className={styles.clear} onClick={handleClick}>
              Clear
            </button>
          </div>

          <div className={styles.temperamentos}>
            <p className={styles.filtro}>Filter By Temperament</p>
            <select
              className={styles.select}
              onChange={(e) => handleTemperament(e)}
            >
              <option value="all">Temperaments</option>
              {allTemperaments &&
                allTemperaments.map((el) => {
                  return (
                    <option key={el.id} value={el.name}>
                      {el.name}
                    </option>
                  );
                })}
            </select>
            <button className={styles.clear} onClick={handleClick}>
              Clear Temperament
            </button>
          </div>
        </div>
        {!allDogs.length && !allDogsCopy.length && (
          <div className={styles.load}>
            <img src={loader} alt="" />
            <p>Loading...</p>
          </div>
        )}
        {allDogs.length > 0 && !displayBreeds.length && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={styles.nada}
          >
            <h2>There is no breed to show \ (o_o) / </h2>
            <img className={styles.dogError} src={dogError} alt="" />
          </motion.div>
        )}
        <div className={styles.perros}>
          {allDogs.length > 0 && displayBreeds}
        </div>
      </div>
      {allDogs.length > 10 && displayBreeds.length > 0 && (
        <div className={styles.pagination}>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={styles.paginationButtons}
            previousLinkClassName={styles.previousButton}
            activeClassName={styles.paginationActive}
          />
        </div>
      )}
    </div>
  );
}
