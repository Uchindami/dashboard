import React, {useState} from 'react';
import {Form, CardBox, Notification} from '../components';
import {useStateContext} from "../contexts/ContextProvider";
import {getData} from "../data/dummy";
import invoiceService from "../features/invoice/invoiceService";
import {useNavigate} from "react-router-dom";


const SendInvoice = () => {
	const {
		accessKey,
		setIsLoading,
		currentColor,
	} = useStateContext();

	const navigate = useNavigate();

	const handleFormSubmit = (clientInfo,items) => {
		console.log('Form data received in SendInvoice:');
		const data = {clientInfo,items}
		invoiceService.generateInvoice(data).then(r =>{
			setIsLoading(false)
			navigate('/Manually');
		})
	};

	const data = React.useMemo(() => getData(), [])

	return (
		<div className="mt-24">
			<div className="flex flex-wrap lg:max justify-center ">
				<div className="bg-white overflow-hidden darkz:text-gray-200 dark:bg-secondary-dark-bg  rounded-xl p-8 pt-9
				 m-3 bg-no-repeat bg-cover bg-center  ">

					<Form onSubmit={handleFormSubmit}/>
				</div>
			</div>
		</div>
	);
};

export default SendInvoice;
