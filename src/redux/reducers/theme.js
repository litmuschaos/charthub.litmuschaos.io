import { TOGGLE_THEME } from '../actionTypes';

const initialState = {
    isDarkTheme: false,
};

export default function(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_THEME:
            return {
                ...state,
                isDarkTheme: !state.isDarkTheme,
            };
        
    
        default:
            return {
                ...state,
            };
    }
}