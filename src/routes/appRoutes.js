import {Route, Routes} from "react-router-dom";

import {
 SignIn
} from "../pages";
import React from "react";

const appRoutes = () => {

    return (
        <Routes>
            {/* pages  */}
            <Route path="/signup" element={<SignIn/>}/>
        </Routes>
    )
}

export default appRoutes;