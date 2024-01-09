import Angaza from "../assets/images/ANGAZA--logo--full.svg"
import Quickbooks from "../assets/images/Intuit-Quickbooks.svg"
import axios from "axios";
import invoiceService from "../features/invoice/invoiceService";
import {useStateContext} from "../contexts/ContextProvider";

const WelcomePage = () => {

	const {
		AccessKey,
		setAccessKey,
		setIsLoading,
		currentColor,
	} = useStateContext();

	const handleQuick = async () => {
		setIsLoading(true)
		invoiceService.authorizeUri().then(async (AuthUri) => {
			const response = await axios.get("/api/invoice/callback", {
				params: {
					AuthUri
				}
			});
			console.log(AuthUri);
			setAccessKey(response.data.access_token)
			/*setActiveAccount(true)*/
		}).catch((error) => {
			console.log(error)
		});
	}


	return (
		<div>
			<h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Choose your poison</h3>
			<div className="py-16">
				<div className="container m-auto px-6 text-gray-500 md:px-12 xl:px-0">
					<div className="mx-auto grid gap-6 md:w-3/4 lg:w-full lg:grid-cols-3">


						{/*
						Quickbooks
						*/}
						<button  onClick={handleQuick} className="border border-gray-100 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-800
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
								<h3 className="text-2xl font-semibold text-quickbooks-color dark:text-white">quickBooks</h3>
							</div>
						</button>

						{/*
						Angaza
						*/}
						<button className="border text-left border-gray-100 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-800
					px-8 py-12 shadow-2xl hover:shadow-angaza-color shadow-gray-600/10 dark:shadow-none sm:px-12 lg:px-8">
							<img
								src={Angaza}
								className="object-center mt-7 mb-10 w-2/3"
								alt="illustration"
								loading="lazy"
								width="900"
								height="600"
							/>
							<div className="mb-12 space-y-4">
								<h3 className="text-2xl font-semibold text-angaza-color">Angaza</h3>
							</div>
						</button>

						{/*					<div className="border border-gray-100 dark:border-gray-700 rounded-3xl bg-white dark:bg-gray-800 px-8 py-12 shadow-2xl shadow-gray-600/10 dark:shadow-none sm:px-12 lg:px-8">
						<div className="mb-12 space-y-4">
							<h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Coming Soon</h3>
							<p className="mb-6 text-gray-600 dark:text-gray-300">
								Obcaecati, quam? Eligendi, nulla numquam natus laborum porro at cum, consectetur
								ullam tempora ipsa iste officia sed officiis! Incidunt ea animi officiis.
							</p>
							<a href="#" className="block font-medium text-primary">Know more</a>
						</div>
						<img
							src="images/ux-design.svg"
							className="ml-auto w-2/3"
							alt="illustration"
							loading="lazy"
							width="900"
							height="600"
						/>
					</div>*/}
					</div>
				</div>
			</div>
		</div>
	)
}

export default WelcomePage