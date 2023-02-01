import {combineReducers} from 'redux'; // combina e larga na store

import restaurants from '../modules/restaurants';

export default combineReducers({
    restaurants,
});