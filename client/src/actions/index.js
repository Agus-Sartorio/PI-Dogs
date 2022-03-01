import axios from "axios";
require("dotenv").config();
const { REACT_APP_SERVER } = process.env;

export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get(`${REACT_APP_SERVER}/dogs`, {});
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    var json = await axios.get(`${REACT_APP_SERVER}/temperament`, {});
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: json.data,
    });
  };
}

export function filterDogsByTemperament(payload) {
  return {
    type: "FILTER_BY_TEMPERAMENT",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByWeight(payload) {
  return {
    type: "ORDER_BY_WEIGHT",
    payload,
  };
}

export function getDogName(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`${REACT_APP_SERVER}/dogs?name=` + name);
      return dispatch({
        type: "GET_DOG_NAME",
        payload: json.data,
      });
    } catch (error) {
      return dispatch({
        type: "GET_DOG_NAME",
        payload: [],
      });
    }
  };
}

export function postDog(payload) {
  return async function (dispatch) {
    const response = await axios.post(`${REACT_APP_SERVER}/dog`, payload);
    return response;
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${REACT_APP_SERVER}/dogs/` + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}
