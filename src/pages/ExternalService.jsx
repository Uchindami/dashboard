import Quickbooks from "../assets/images/Intuit-Quickbooks.svg"
import {useStateContext} from "../contexts/ContextProvider";

const WelcomePage = () => {

	const {
		AccessKey,
		setAccessKey,
		setIsLoading,
		currentColor,
	} = useStateContext();


	return (
		<div>
			<h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Connected</h3>
			<div className="py-16">
				<div className="container m-auto px-6 text-gray-500 md:px-12 xl:px-0">
					<div className="mx-auto grid gap-6 md:w-3/4 lg:w-full lg:grid-cols-3">


						{/*
						Quickbooks
						*/}
						<button className="border border-gray-100 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-800
					px-8 py-12 shadow-2xl text-left hover:shadow-quickbooks-color shadow-gray-600/10 dark:shadow-none sm:px-12 lg:px-8">
							<img
								src={Quickbooks}
								className="object-center w-2/3"
								alt="illustration"
								loading="lazy"
								width="500"
								height="100"
							/>
							<div className="mb-12 space-y-4">
								<h3 className="text-2xl font-semibold text-quickbooks-color dark:text-white"> Successfully
									Connected with QuickBooks</h3>
							</div>
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WelcomePage