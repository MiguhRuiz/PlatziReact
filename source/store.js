/**
 * Created by miguhruiz on 19/12/16.
 */
import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import reducer from './reducer'

/*const logger = store => next => (action) => {
    console.group('logger')
    console.debug('estado actual', store.getState())
    console.debug('acción', action)
    const result = next(action)
    console.debug('estado nuevo', store.getState())
    console.groupEnd('logger')
    return result
 }*/

const store = createStore(
    reducer,
    applyMiddleware(
        createLogger(),
        thunk
    )
)

export default store