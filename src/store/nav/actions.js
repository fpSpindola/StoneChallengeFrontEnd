import * as type from "./action-types";

export const newBreadcrumb = (breadcrumbs) => {

    return (dispatch) => {
        dispatch({
            type: type.NEW_BREADCRUMB, payload: {breadcrumbs: breadcrumbs}
        });
    }
};
