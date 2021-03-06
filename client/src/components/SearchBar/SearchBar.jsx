import React from "react";
import { useDispatch } from "react-redux";
import { getDogName } from "../../actions";
import styles from "./SearchBar.module.css";

export default function SearchBar({ name, setName }) {
  const dispatch = useDispatch();

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getDogName(name));
    setName("");
  }

  return (
    <div className={styles.cont}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search breed"
          onChange={(e) => handleInputChange(e)}
          value={name}
        />
        <button className={styles.lupa} type="submit">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
}
