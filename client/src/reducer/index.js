const initialState = {
    dogs: [],
    dogsCopy: [],
    temperament: [],
    detail: {},
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                dogsCopy: action.payload,
            }
        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperament: action.payload
            }
        case 'FILTER_BY_TEMPERAMENT':
            const allDogs = state.dogsCopy;
            const filteredDogs = action.payload === 'all' ? allDogs :
                allDogs.filter(dog => dog.temperament?.includes(action.payload));
            return {
                ...state,
                dogs: filteredDogs
            }
        case 'FILTER_CREATED':
            const createdDogs = state.dogsCopy;
            const createdFilter = action.payload === 'created' ? createdDogs.filter(el => el.created_in_db) :
                createdDogs.filter(el => !el.created_in_db);
            return {
                ...state,
                dogs: action.payload === 'all' ? state.dogsCopy : createdFilter
            }
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload === "asc" ? state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) :
                state.dogs.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                })
            return {
                ...state,
                dogs: sortedArr
            }
        case 'ORDER_BY_WEIGHT':
            const sortedArr2 = action.payload === 'asc' ?
                state.dogs.sort((a, b) => {
                    const weightOne = Number(a.weight?.split(" - ")[0])
                    const weightTwo = Number(b.weight?.split(" - ")[0])
                    return weightOne - weightTwo
                }) :
                state.dogs.sort((a, b) => {
                    const weightOne = Number(a.weight?.split(" - ")[0])
                    const weightTwo = Number(b.weight?.split(" - ")[0])
                    return weightTwo - weightOne
                })
            return {
                ...state,
                dogs: sortedArr2
            }
        case 'GET_DOG_NAME':
            return {
                ...state,
                dogs: action.payload
            }
        case 'POST_DOG':
            return {
                ...state
            }
        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload
            }
        default:
            return state;
    }
}

export default rootReducer;