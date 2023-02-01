import {createStore} from 'redux'; //onde toda a plicação recebe tudo em um lugar só
import rootReducer from './reducers'

const store = createStore(rootReducer);

export default store;