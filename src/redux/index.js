import {createStore, applyMiddleware, compose} from "redux";
import createSagaMiddleware from "redux-saga"
import reducer from "./reducers";
import rootSaga from "./sagas";


const sagaMiddleware = createSagaMiddleware()
let devtools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    reducer,
    devtools(
        applyMiddleware(sagaMiddleware)
    )
)
sagaMiddleware.run(rootSaga)

export default store