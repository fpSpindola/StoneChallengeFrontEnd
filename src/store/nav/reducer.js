import {NEW_BREADCRUMB} from "./action-types";


const initialState = {
    breadcrumbs: []
};

export default function reducer(state = initialState, action) {
    if (!action) {
        return state;
    }
    switch (action.type) {
        case NEW_BREADCRUMB:
            return {breadcrumbs: action.payload.breadcrumbs};
        default:
            return state
    }
}