import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { loadInitialData, saveState } from './persistStore'

const persistStore = loadInitialData()

const store = createStore(rootReducer, persistStore, applyMiddleware(thunk))

store.subscribe(() => {
  saveState(store.getState())
})

export default store
