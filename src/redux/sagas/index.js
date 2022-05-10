import {
    // takeLatest,
    // takeLeading,
    takeEvery,
    put,
    call,
    fork,
    // spawn
} from "redux-saga/effects"

// const wait = (time) => new Promise(resolve => {
//     setTimeout(resolve, time)
// })


const getFetch = async (pattern) => {
    const request = await fetch(`https://swapi.dev/api/${pattern}`)
    return await request.json()
}

export function* loadPeoples() {
    // const peoples = yield fork(getFetch, "people") /// forky chi spasum asinxrony verjacni bayc lineluc heto rendera linum
    const peoples = yield call(getFetch, "people") /// isk ete ka argument func-i anunic heto storaketov argumenty
    yield put({type: "SET_PEOPLE", payload: peoples.results})

}

export function* loadPlanets() {
    // const planets = yield fork(getFetch, "planets") ///forky chi spasum asinxrony verjacni bayc lineluc heto rendera linum
    const planets = yield call(getFetch, "planets") //// call spasecnum asinxrony prcni nor sharunakuma
    yield put({type: "SET_PLANETS", payload: planets.results})
}


export function* workerSaga() {
    // yield spawn(loadPeoples) /// ete sranov kanchenq fnc-y u error lini meki mej en myusy klcvi store-um
    yield fork(loadPeoples)    ///   isk sranov ete meki mej errora linum chi lcvum story
    yield fork(loadPlanets)
    // yield wait(1000)

}

export function* watchLoadDataSaga() {
    // while (true) {
    //     yield take("CLICK")
    //     yield workerSaga()
    // }

    yield takeEvery("CLICK", workerSaga)


    yield takeEvery("LOAD_DATA", workerSaga)


    // yield takeLatest("CLICK", workerSaga) ///// for optimization /// menak verjin clickna ashxtum


    // yield takeLeading("CLICK", workerSaga) //// arajin clicki jamanak antesvum e mnacac clickery minchev asinxron gorcoxutyunnery verjana///
}


export default function* rootSaga() {
    console.log("Saga Ready!")
    yield fork(watchLoadDataSaga)
}