import {createStore} from 'redux'
import throttle from 'lodash/throttle' //import only the specific file
import {loadState, saveState} from './localStorage.jsx';
import todoApp from './reducers/index.jsx'

const addLogginToDispatch = (store) => {
    const rawDispatch = store.dispatch;

    if (!console.group) {
        return rawDispatch;
    }

    return (action) => {
        console.group(action.type);
        console.log('%c prev stat', 'color: gray', store.getState());
        console.log('%c action', 'color: blue', action);
        const returnValue = rawDispatch(action);
        console.log('%c next stat', 'color: green', store.getState());
        console.groupEnd(action.type);
        return returnValue;
    }
};

const configureStore = () => {

    const persistedState = loadState();
    const store = createStore(todoApp, persistedState);

    if (process.env.NODE_ENV !== 'production') {
        store.dispatch = addLogginToDispatch(store);
    }

    store.subscribe(throttle(() => { //update local storage max every second
        saveState(store.getState())
    }, 1000));

    return store;
};

export default configureStore;