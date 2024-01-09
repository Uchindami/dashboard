import React, { useState } from 'react';
import { Header } from '../components';
import tem1 from "../assets/images/tem1.png";
import tem2 from "../assets/images/tem2.png";
import {useStateContext} from "../contexts/ContextProvider";
const ConfigureAPI = () => {

    const { currentColor} = useStateContext();
    const [currentPage, setCurrentPage] = useState(1);

    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const goToNextPage = (values) => {
        setCurrentPage((prevPage) => prevPage + 1);
        console.log(values)
    };

    const renderFormPage = () => {
        switch (currentPage) {
            case 1:
                return (
                    <div/>
                );
            case 2:
                return (
                    <div>
                        <div className="flex items-center mb-4">
                            {/* Radio Option 1 */}
                            <div className="flex items-center">
                                <input
                                    id="country-option-1"
                                    type="radio"
                                    name="countries"
                                    value="USA"
                                    className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300
                                    dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600"
                                    checked
                                />
                                <label
                                    htmlFor="country-option-1"
                                    className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    <img
                                        src={tem1}
                                        alt={'template 1'}
                                        className=""
                                     />
                                    Template 1
                                </label>
                            </div>

                            {/* Radio Option 2 */}
                            <div className="flex items-center ml-4">
                                <input
                                    id="country-option-2"
                                    type="radio"
                                    name="countries"
                                    value="UK"
                                    className="rounded-3xl"
                                />
                                <label
                                    htmlFor="country-option-2"
                                    className="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    <img
                                        src={tem2}
                                        alt="Option 2"
                                        className="rounded-3xl"
                                    />
                                    Template 2
                                </label>
                            </div>
                        </div>
                    </div>
                );
            // Add more cases for additional form pages as needed
            default:
                return null;
        }
    };

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
            <Header category="Page" title="ConfigureAPI" />

            {renderFormPage()}

            <div className={'mt-10'}>

                {currentPage > 1 && (
                    <button
                        type="button"
                        onClick={goToPreviousPage}
                        style={{backgroundColor: currentColor}}
                        className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 
                    focus:outline-none`}>Previous</button>
                )}

                {currentPage < 3 && (
                    <button
                        type="button"
                        onClick={goToNextPage}
                        style={{backgroundColor: currentColor}}
                        className={`text-white  font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 
                    focus:outline-none`}>Next</button>
                )}
            </div>
        </div>
    );
};

export default ConfigureAPI;