import axios from "axios";

export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/dogs", {});
    return dispatch({
      type: "GET_DOGS",
      payload: json.data,
    });
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/temperament", {});
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
      let json = await axios.get("http://localhost:3001/dogs?name=" + name);
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
    const response = await axios.post("http://localhost:3001/dog", payload);
    return response;
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/dogs/" + id);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}
