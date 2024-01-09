import React, {useEffect, useState} from 'react';
import {ColumnDirective, ColumnsDirective, GridComponent, Inject, Page, Search} from '@syncfusion/ej2-react-grids';
import {employeesGrid} from '../data/dummy';
import {Header} from '../components';
import axios from "axios";
import {useSelector} from "react-redux";
import {AiOutlinePoweroff} from "react-icons/ai";
import OnIcon from "../assets/images/icons8-on-50.png";
import OffButton from "../assets/images/icons8-toggle-off-50.png"

const Automations = () => {
    const {user} = useSelector((state) => state.auth)
    const [automations, setAutomations] = useState([]); // State to store the fetched data
    const toolbarOptions = ['Search'];
    const editing = {allowDeleting: true, allowEditing: true};


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/invoice/displayAutomations');
                setAutomations(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    const gridEmployeeProfile = (props) => (
        <div className="flex items-center gap-2">
            <img
                className="rounded-full w-10 h-10"
                src={user.BusinessLogo}
                alt="Business"
            />
            <p>{user.BusinessName}</p>
        </div>
    );
    const gridIsActive = (props) => (
        <>
            {props.isActive ?(
                <>
                    <div className="flex items-center gap-2">
                        <img
                            src={OnIcon}
                            alt="illustration"
                            loading="lazy"
                            width="30"
                            height="30"
                        />
                        <p>active</p>
                    </div>
                </>
            ):(
                <>
                    <div className="flex items-center gap-2">
                        <img
                            src={OffButton}
                            alt="illustration"
                            loading="lazy"
                            width="30"
                            height="30"
                        />
                        <p>Inactive</p>
                    </div>
                </>)}
        </>
    );
    const gridEmails = (props) => (
        <div className="f flex flex-col">
            <p>{props.emails[0]}</p>
            <p>{props.emails[1]}</p>
            <p>{props.emails[2]}</p>
        </div>
    );

    const automationGrid = [
        { headerText: 'Organization',
            width: '150',
            template: gridEmployeeProfile,
            textAlign: 'Center' },

        { field: 'name',
            headerText: 'Name',
            width: '0',
            textAlign: 'Center',
        },
        { field: 'emails',
            headerText: 'Email Address',
            template: gridEmails,
            width: '170',
            textAlign: 'Center',
        },
        {   field: 'timePeriod',
            headerText: 'Time Period',
            width: '120',
            textAlign: 'Center',
        },

        { field: 'scheduledJob',
            headerText: 'Scheduled Job',
            width: '135',
            textAlign: 'Center' },

        { field: 'isActive',
            headerText: 'Status',
            template: gridIsActive,
            width: '120',
            textAlign: 'Center' },
    ];

    if(automations !== []){
        console.log(automations)
        return (
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Header category="Page" title="Automations"/>
                <GridComponent
                    dataSource={automations}
                    width="auto"
                    allowPaging
                    allowSorting
                    pageSettings={{pageCount: 5}}
                    editSettings={editing}
                    toolbar={toolbarOptions}
                >
                    <ColumnsDirective>
                        {automationGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
                    </ColumnsDirective>
                    <Inject services={[Search, Page]}/>

                </GridComponent>
            </div>
        );
    }else {
        return (
            <div className="m-2 md:m-10 mt-24 lg:over p-2 md:p-10 bg-white rounded-3xl">
                <Header category="Page" title="Automations"/>
                <h1>No Automations Set</h1>
            </div>
        );
    }

};
export default Automations