import React, {useState} from "react";
import WelcomePage from "./WelcomePage";
import { Progress } from "@material-tailwind/react";
import {useStateContext} from "../contexts/ContextProvider";
import {ExternalService} from "./index";

const ApiPage = () => {
	const {
		accessKey,
		setIsLoading,
		currentColor,
	} = useStateContext();

	const [currentPage, setCurrentPage] = useState(0);
	const [dataFromPage, setDataFromPage] = useState(null);

	// const pages = [<WelcomePage />, 'Page 2', 'Page 3']; // You can replace these with your actual pages


/*	const goToNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, pages.length - 1));
	};

	const goToPreviousPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
	};

	const progressPercentage = ((currentPage + 1) / pages.length) * 100;*/

	return (

		<div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">

			{accessKey === null ? (
				<>
					<WelcomePage/>
				</>
			):(
				<>
					<ExternalService/>
				</>)}

			{/*				<p>Content of the page {currentPage + 1}</p>
				<div>
					<div className="flex flex-1 items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
					<button className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50" onClick={goToPreviousPage} disabled={currentPage === 0}>
						Back
					</button>
					<button  className={"relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"} onClick={goToNextPage} disabled={currentPage === pages.length - 1}>
						Next
					</button>
					</div>
				</div>*/}
		</div>

	)
}

export default ApiPage