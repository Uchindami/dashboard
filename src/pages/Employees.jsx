import React, {useEffect, useState} from 'react';
import {ColumnDirective, ColumnsDirective, GridComponent, Inject, Page, Search} from '@syncfusion/ej2-react-grids';

import {employeesGrid} from '../data/dummy';
import {Header} from '../components';
import axios from "axios";

const Employees = () => {
    const [employeesData, setEmployeesData] = useState([]); // State to store the fetched data
    const toolbarOptions = ['Search'];
    const editing = {allowDeleting: true, allowEditing: true};


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/users/displayUsers');
                setEmployeesData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Employees"/>
            <GridComponent
                dataSource={employeesData}
                width="auto"
                allowPaging
                allowSorting
                pageSettings={{pageCount: 5}}
                editSettings={editing}
                toolbar={toolbarOptions}
            >
                <ColumnsDirective>
                    {employeesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                </ColumnsDirective>
                <Inject services={[Search, Page]}/>

            </GridComponent>
        </div>
    );
};

export default Employees