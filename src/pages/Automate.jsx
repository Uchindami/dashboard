import React, { useEffect, useState } from 'react';
import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Page, Search } from '@syncfusion/ej2-react-grids';

import { Header } from '../components';
import axios from "axios";
import { customerGrid } from "../data/customerGrid";
import {useStateContext} from "../contexts/ContextProvider";
import invoiceService from "../features/invoice/invoiceService";
import {SiQuickbooks} from "react-icons/si";
import {useNavigate} from "react-router-dom";

const Automate = () => {
    const {
        accessKey,
        setIsLoading,
        currentColor,
    } = useStateContext();

    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState('');
    const [QboData, setQboData] = useState([]);
    const [customerData, setCustomerData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const toolbarOptions = ['Search'];
    const editing = { allowDeleting: true, allowEditing: true };
    const selectionSettings = { type: 'Multiple' };

    function extractInfo(data) {
        const result = [];

        for (const entry of data) {
            const billAddr = entry.BillAddr || {};
            const primaryEmailAddr = entry.PrimaryEmailAddr || {};

            const city = billAddr.City || 'N/A';
            const line1 = billAddr.Line1 || 'N/A';
            const physicalAddress = `${city}, ${line1}`;

            const companyName = entry.CompanyName || entry.DisplayName || 'N/A';
            const countrySubDivisionCode = billAddr.CountrySubDivisionCode || 'N/A';
            const address = primaryEmailAddr.Address || 'N/A';

            const entryInfo = {
                address: physicalAddress,
                name : companyName,
                city: countrySubDivisionCode,
                emailAddress: address
            };

            result.push(entryInfo);
        }

        return result;
    }

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/customer/displayCustomers');
            const mappedCustomerData = response.data.map(customer => ({
                name: customer.shipping.name,
                address: customer.shipping.address,
                emailAddress: customer.shipping.emailAddress,
                city: customer.shipping.city
            }));
            console.log(mappedCustomerData)
            setCustomerData(mappedCustomerData);
        } catch (error) {
            console.log(error);
        }
    };

    function combineArrays(array1, array2) {
        return array1.concat(array2);
    }

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = (values) => {
        setIsLoading(true)
        try {
            invoiceService.automateInvoice(values).then(r =>{
                setIsLoading(false)
                navigate("/Automations")
            })
        } catch (e) {
            console.log(e)
        }
    };

    const  handleImportQBO = async () => {
        setIsLoading(true)
        if (accessKey !== null) {
            try {
                const response = await axios.get('/api/invoice/getCustomers');
                console.log(response.data.QueryResponse.Customer)
                const refinedData = extractInfo(response.data.QueryResponse.Customer);
                const combined = combineArrays(refinedData,customerData);
                setQboData(refinedData)
                setCustomerData(combined);
                console.log(combined)
            } catch (error) {
                console.log(error);
            }
        }
        setIsLoading(false)
    }

    if(accessKey === null){

        if(customerData.length === 0){
            setIsLoading(true)
        }
        if(customerData.length !== 0){
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchData()


    }, []);

    const handleRowSelected = (selectedRow) => {
        const selectedEmail = selectedRow.emailAddress;
        console.log('this'+selectedRow.emailAddress);
        const isRowSelected = selectedRows.includes(selectedEmail);

        if (isRowSelected) {
            // Row is already selected, remove it from the selected rows
            setSelectedRows(prevSelectedRows => prevSelectedRows.filter(email => email !== selectedEmail));
        } else {
            // Row is not selected, add it to the selected rows
            setSelectedRows(prevSelectedRows => [...prevSelectedRows, selectedEmail]);
        }
    };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

            <Header category="Page" title="Customers " />
            {accessKey !== null ? (
                <>
                    <div className={'flex justify-end '}>
                        <button
                            onClick={handleImportQBO}
                            type="submit"
                            style={{backgroundColor: currentColor}}
                            className={`rounded-md mb-9 p-3 hover:drop-shadow-xl px-3 py-2 text-sm font-semibold text-white shadow-sm
		            hover:bg-black-500 focus-visible:outline m-1 focus-visible:outline-2 focus-visible:outline-offset-2
		            focus-visible:outline-indigo-600 hover:bg-slate-200`}>
                            Import From QuickBooks
                        </button>
                        <button
                            onClick={handleImportQBO}
                            type="submit"
                            style={{backgroundColor: currentColor}}
                            className={`rounded-md mb-9 p-3 hover:drop-shadow-xl hover:bg-slate-200 px-3 py-2 text-sm font-semibold text-white shadow-sm
		            hover:bg-black-500  m-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
		            focus-visible:outline-indigo-600`}>
                            Remove QuickBooks Data
                        </button>
                    </div>
                </>
            ): (<></>)}


            <GridComponent
                dataSource={customerData}
                width="auto"
                allowPaging
                allowSorting
                pageSettings={{ pageCount: 5 }}
                editSettings={editing}
                toolbar={toolbarOptions}
                selectionSettings={selectionSettings}
                rowSelected={(args) => handleRowSelected(args.data)}
            >
                <ColumnsDirective>
                    {/* Add selection column */}
                    <ColumnDirective type="checkbox" width="50"></ColumnDirective>
                    {customerGrid.map((item, index) => (
                        <ColumnDirective key={index} {...item} />
                    ))}
                </ColumnsDirective>
                <Inject services={[Search, Page]} />
            </GridComponent>

{/*            <div className="mt-4">
                <h3>Selected Rows:</h3>
                <ul>
                    {selectedRows.map(email => (
                        <li key={email}>{email}</li>
                    ))}
                </ul>
            </div>*/}

            <div className={"ml-1 mt-7 flex"}>
                <div className="sm:col-span-3 flex-auto">
                    <label
                        htmlFor="Iteration"
                        className="block text-sm font-bold leading-6 text-gray-900"
                    >
                        Time
                    </label>
                    <div className="mt-2">
                        <select
                            onChange={handleOptionChange}
                            id="Iteration"
                            name="Iteration"
                            autoComplete="country-name"
                            className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
									ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs
									sm:text-sm sm:leading-6 ring-1 ring-inset"
                        >
                            <option></option>
                            <option>Daily</option>
                            <option>Weekly</option>
                            <option>Monthly</option>
                            <option>Custom[1 min]</option>
                        </select>
                    </div>
                </div>
                <div className="sm:col-span-3 flex-auto">
                    <label
                        htmlFor="Multi Factor"
                        className="block text-sm font-bold leading-6 text-gray-900"
                    >
                        Iterations
                    </label>
                    <div className="mt-2">
                        <select
                            onChange={handleOptionChange}
                            id="Multi Factor"
                            name="Multi Factor"
                            autoComplete="country-name"
                            className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
									ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs
									sm:text-sm sm:leading-6 ring-1 ring-inset"
                        >
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                        </select>
                    </div>
                </div>
            </div>


           {/* <div className={"flex mt-10 gap-x-8"}>
                <div>
                    <input
                        type="radio"
                        name="option"
                        value="Monthly"
                        checked={selectedOption === 'Monthly'}
                        onChange={handleOptionChange}
                    />
                    <label>Monthly</label>
                </div>

                <div>
                    <input
                        type="radio"
                        name="option"
                        value="Weekly"
                        checked={selectedOption === 'Weekly'}
                        onChange={handleOptionChange}
                    />
                    <label>Weekly</label>
                </div>

            </div>*/}
            <button
                type="submit"
                onClick={() => handleSubmit(selectedRows)}
                style={{backgroundColor: currentColor}}
                className="text-white hover:drop-shadow-xl  mt-10 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
            >
                Automate
            </button>
        </div>
    );
};

export default Automate;
