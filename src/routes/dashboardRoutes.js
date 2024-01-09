import {Route, Routes} from "react-router-dom";

import {
    Area, Bar, Calendar, ColorMapping, ColorPicker,
    Customers, SnapShot, Editor, Employees, Financial,
    Kanban, Line, Orders,
    Pie, Pyramid, Stacked, ConfigureAPI, SendInvoice, Automations, Automate, ApiPage,
} from "../pages";
import React from "react";

const dashBordRoutes = () => {

    return (
        <Routes>
            {/* dashboard  */}
            <Route path="/" element={(<SnapShot/>)}/>
            <Route path="/snapshot" element={(<SnapShot/>)}/>

            {/* pages  */}
            <Route path={"/API"} element={<ApiPage/>}/>
            <Route path="/manually" element={<SendInvoice/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/view" element={<Employees/>}/>
            <Route path="/customers" element={<Customers/>}/>
            <Route path="/configure" element={<ConfigureAPI/>}/>
            <Route path="/Automations" element={<Automations/>}/>
            <Route path="/Automate" element={<Automate/>}/>

            {/* apps  */}
            <Route path="/kanban" element={<Kanban/>}/>
            <Route path="/editor" element={<Editor/>}/>
            <Route path="/calendar" element={<Calendar/>}/>
            <Route path="/color-picker" element={<ColorPicker/>}/>

            {/* Charts  */}
            <Route path="/line" element={<Line/>}/>
            <Route path="/area" element={<Area/>}/>
            <Route path="/bar" element={<Bar/>}/>
            <Route path="/pie" element={<Pie/>}/>
            <Route path="/financial" element={<Financial/>}/>
            <Route path="/color-mapping" element={<ColorMapping/>}/>
            <Route path="/pyramid" element={<Pyramid/>}/>
            <Route path="/stacked" element={<Stacked/>}/>
        </Routes>
    )
}

export default dashBordRoutes;