import React, {useState} from "react";
import tem1 from "../assets/images/tem1.png";
import tem2 from "../assets/images/tem2.png";
import {useStateContext} from "../contexts/ContextProvider";
import {FiSend} from "react-icons/fi";
import GPTchatService from "../features/invoice/GPTchatService";
import {useNavigate} from "react-router-dom";


const Form = ({onSubmit}) => {
	const {
		accessKey,
		setIsLoading,
		currentColor,
	} = useStateContext();
	const navigate = useNavigate()

	const [selectedImage, setSelectedImage] = useState(null);
	const [isAiActive, setIsAiActive] = useState(false)
	const [gptEmail, setGptEmail] = useState('>')
	const [items, setItems] = useState([
		{item: '', description: '', quantity: '', amount: ''}
	]);

	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		country: '',
		streetAddress: '',
		city: '',
		region: '',
		postalCode: '',
		selectedImage: null,
	});


	const handleImageClick = (image) => {
		setSelectedImage(image);
		setForm({
			...form,
			selectedImage: image,
		});
	};
	const handleAddItem = () => {
		setItems([...items, {item: '', description: '', quantity: '', amount: ''}]);
	};
	const handleItemChange = (index, key, value) => {
		const newItems = [...items];
		newItems[index][key] = value;
		setItems(newItems);
	};

	const handleInputChange = (event) => {
		setForm({
			...form,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = (event) => {
		setIsLoading(true)
		event.preventDefault();
		onSubmit(form, items);

	};

	const handleAIEmailSub = (event) => {
		event.preventDefault();
		setIsLoading(true)
		GPTchatService.sendAiGeneratedMail(form.email, gptEmail).then(r => {
			console.log(r)
			setIsLoading(false)
			navigate('/Manually');
		})

	};

	const handleAiSubmit = (option, event) => {
		event.preventDefault()
		setIsLoading(true)
		GPTchatService.generateTemplate(form, items, option).then(r => {
			console.log(r)
			setGptEmail(r)
			setIsLoading(false)
		})
	}

	const handleAiPage = (event) => {
		event.preventDefault()
		setIsAiActive(!isAiActive)
	}


	return (
		<form
			onSubmit={handleSubmit}
		>
			<div className="lg:w-1000 space-y-12">
				{/*
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <div
                  className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 
				focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md"
                >
                  <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                    workcation.com/
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 
					placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="janesmith"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset 
				  ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
				  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <IoMdContacts
                  className="h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm 
				  ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Cover photo
              </label>
              <div
                className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 
			  py-10"
              >
                <div className="text-center">
                  <IoMdContacts
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 
					  focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 
					  focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
*/}
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">
						Personal Information
					</h2>
					<p className="mt-1 text-sm leading-6 text-gray-600">
						Use a permanent address where your user receive mail.
					</p>

					<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
						<div className="sm:col-span-3">
							<label
								htmlFor="firstName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								First name
							</label>
							<div className="mt-2">
								<input
									onChange={handleInputChange}
									value={form.firstName}
									type="text"
									name="firstName"
									id="firstName"
									autoComplete="given-name"
									className="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm
									ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
									focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="lastName"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Last name
							</label>
							<div className="mt-2">
								<input
									onChange={handleInputChange}
									value={form.lastName}
									type="text"
									name="lastName"
									id="lastName"
									autoComplete="family-name"
									className="block p-3  w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
									ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ring-1
									focus:ring-indigo-600 sm:text-sm sm:leading-6 ring-inset"
								/>
							</div>
						</div>

						<div className="sm:col-span-4">
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									onChange={handleInputChange}
									value={form.email}
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
									ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ring-1
								    focus:ring-indigo-600 sm:text-sm sm:leading-6 ring-inset"
								/>
							</div>
						</div>

						<div className="sm:col-span-3">
							<label
								htmlFor="country"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Country
							</label>
							<div className="mt-2">
								<select
									onChange={handleInputChange}
									value={form.country}
									id="country"
									name="country"
									autoComplete="country-name"
									className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
									ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs
									sm:text-sm sm:leading-6 ring-1 ring-inset"
								>
									<option></option>
									<option>Malawi</option>
									<option>United States</option>
									<option>Canada</option>
									<option>Mexico</option>
								</select>
							</div>
						</div>

						<div className="col-span-full">
							<label
								htmlFor="streetAddress"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Street address
							</label>
							<div className="mt-2">
								<input
									onChange={handleInputChange}
									value={form.streetAddress}
									type="text"
									name="streetAddress"
									id="streetAddress"
									autoComplete="street-address"
									className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
									ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2
				                    focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:ring-insetfocus:ring-inset"
								/>
							</div>
						</div>

						<div className="sm:col-span-2 sm:col-start-1">
							<label
								htmlFor="city"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								City
							</label>
							<div className="mt-2">
								<input
									onChange={handleInputChange}
									value={form.city}
									type="text"
									name="city"
									id="city"
									autoComplete="address-level2"
									className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
				                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
				                    ocus:ring-indigo-600 sm:text-sm sm:leading-6 ring-1 ring-inset"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="region"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								State / Province
							</label>
							<div className="mt-2">
								<input
									onChange={handleInputChange}
									value={form.region}
									type="text"
									name="region"
									id="region"
									autoComplete="address-level1"
									className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
				                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
				                    focus:ring-indigo-600 sm:text-sm sm:leading-6 ring-1 ring-inset"
								/>
							</div>
						</div>

						<div className="sm:col-span-2">
							<label
								htmlFor="postalCode"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								ZIP / Postal code
							</label>
							<div className="mt-2">
								<input
									onChange={handleInputChange}
									value={form.postalCode}
									type="text"
									name="postalCode"
									id="postalCode"
									autoComplete="postal-code"
									className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
				                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
				                    focus:ring-indigo-600 sm:text-sm sm:leading-6 ring-1 ring-inset"
								/>
							</div>
						</div>
					</div>
				</div>

				<h2 className="text-base font-semibold leading-7 text-gray-900">
					Pricing & Costs
				</h2>
				<p className="mt-1 text-sm mb-3 leading-6 text-gray-600">
					What the clients are expected to pay
				</p>
				{/*<ItemsForm/>*/}
				{items.map((item, index) => (
					<div key={index}>
						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

							<div className="sm:col-span-2 sm:col-start-1">
								<label
									htmlFor="city"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Item
								</label>
								<div className="mt-2">
									<input
										type="text"
										value={item.item}
										onChange={(e) => handleItemChange(index, 'item', e.target.value)}
										required
										autoComplete="address-level2"
										className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
				                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
				                    ocus:ring-indigo-600 sm:text-sm sm:leading-6 ring-1 ring-inset"
									/>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="region"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Description
								</label>
								<div className="mt-2">
									<input
										type="text"
										value={item.description}
										onChange={(e) => handleItemChange(index, 'description', e.target.value)}
										required
										autoComplete="address-level1"
										className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
				                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
				                    focus:ring-indigo-600 sm:text-sm sm:leading-6 ring-1 ring-inset"
									/>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="postalCode"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Quantity
								</label>
								<div className="mt-2">
									<input
										type="number"
										value={item.quantity}
										onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
										required
										autoComplete="postal-code"
										className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
				                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
				                    focus:ring-indigo-600 sm:text-sm sm:leading-6 ring-1 ring-inset"
									/>
								</div>
							</div>
							<div className="sm:col-span-2">
								<label
									htmlFor="postalCode"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Price
								</label>
								<div className="mt-2">
									<input
										type="number"
										value={item.amount}
										onChange={(e) => handleItemChange(index, 'amount', e.target.value)}
										required
										autoComplete="postal-code"
										className="block p-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm
				                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
				                    focus:ring-indigo-600 sm:text-sm sm:leading-6 ring-1 ring-inset"
									/>
								</div>
							</div>
						</div>
					</div>
				))}
				<button
					onClick={handleAddItem}
					style={{backgroundColor: currentColor}}
					className={`rounded-md mb-9 p-3 hover:drop-shadow-xl hover:bg-slate-200 px-3 py-2 text-sm font-semibold text-white shadow-sm
		            hover:bg-black-500  m-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
		            focus-visible:outline-indigo-600`}>
					+ Add Item
				</button>

				<div className="border-b w-full border-t border-gray-900/10 pb-12">

					<h2 className="text-base mt-10 font-bold leading-7 text-gray-900">
						Choose Your Template
					</h2>

					<div className={'flex justify-end '}>
						<button
							onClick={handleAiPage}
							style={{backgroundColor: currentColor}}
							className={`rounded-md mb-9 p-3 hover:drop-shadow-xl px-3 py-2 text-sm font-semibold text-white shadow-sm
		            hover:bg-black-500 focus-visible:outline m-1 focus-visible:outline-2 focus-visible:outline-offset-2
		            focus-visible:outline-indigo-600 hover:bg-slate-200`}>
							{isAiActive !== true ? (<>Use A.I generated Template Instead?</>) : (<>Use Normal
								Templates</>)}
						</button>
					</div>

					{/*
					Ai page Enabled
					*/}
					{isAiActive === true ? (
						<>
							<div className="w-full bg-white border border-red rounded-lg shadow
							 dark:bg-gray-800 dark:border-gray-700 ">
								<p className="ml-2 font-['JetBrains_Mono'] mt-4 text-sm mb-3 leading-6 text-gray-600">
									Chose your tone
								</p>
								<div className="flex p-2">
									<button
										onClick={(event) => handleAiSubmit(1, event)}
										style={{backgroundColor: '#434242'}}
										className={`rounded-md lg:w-20 font-['JetBrains_Mono'] flex-auto mb-9 p-3 hover:drop-shadow-xl px-3 py-2 text-sm font-semibold text-white shadow-sm
		                                            hover:bg-black-500 focus-visible:outline m-1 focus-visible:outline-2 focus-visible:outline-offset-2
		                                            focus-visible:outline-indigo-600 hover:bg-slate-200`}>
										Casual with Jokes
									</button>
									<button
										onClick={(event) => handleAiSubmit(2, event)}
										style={{backgroundColor: '#434242'}}
										className={`rounded-md lg:w-20 font-['JetBrains_Mono'] flex-auto mb-9 p-3 hover:drop-shadow-xl px-3 py-2 text-sm text-white shadow-sm
		                                            hover:bg-black-500 focus-visible:outline m-1 focus-visible:outline-2 focus-visible:outline-offset-2 font-semibold
		                                            focus-visible:outline-indigo-600 hover:bg-slate-200`}>
										Standard Invoice
									</button>
									<button
										onClick={(event) => handleAiSubmit(3, event)}
										style={{backgroundColor: '#434242'}}
										className={`rounded-md font-['JetBrains_Mono'] lg:w-20 flex-auto mb-9 p-3 hover:drop-shadow-xl px-3 py-2 text-sm font-semibold text-white shadow-sm
		                                            hover:bg-black-500 focus-visible:outline m-1 focus-visible:outline-2 focus-visible:outline-offset-2
		                                            focus-visible:outline-indigo-600 hover:bg-slate-200`}>
										Urgent
									</button>
								</div>
								<p className="ml-2 font-['JetBrains_Mono'] text-sm mb-3 leading-6 text-gray-600">
									Powered by chatGPT.4.5 turbo
								</p>
								<textarea value={gptEmail} readOnly={true} className="w-full h-60 font-['JetBrains_Mono'] m-2 bg-gray border border-black-200 rounded-lg shadow
							         dark:bg-gray-800 dark:border-gray-700 p-3 ">
								</textarea>
							</div>

						</>
					) : (<>
						<p className="mt-1 mb-10 leading-6 text-gray-600">
							This is how the clients will see your email.
						</p>
						<div className="flex">
							<div>
								<input
									type="radio"
									id="image1"
									name="imageSelector"
									checked={selectedImage === "tem1"}
									onChange={() => handleImageClick("tem1")}
								/>
								<label htmlFor="image1">
									<img
										src={tem1}
										style={{
											height: 500,
											width: 500,
											border: selectedImage === "tem1" ? '2px solid blue' : 'none'
										}}
										onClick={() => handleImageClick("tem1")}
										alt="first template"
									/>
								</label>
							</div>
							<div>
								<input
									type="radio"
									id="image2"
									name="imageSelector"
									checked={selectedImage === "tem2"}
									onChange={() => handleImageClick("tem2")}
								/>
								<label htmlFor="image2">
									<img
										src={tem2}
										style={{
											height: 500,
											width: 500,
											border: selectedImage === "tem2" ? '2px solid blue' : 'none'
										}}
										onClick={() => handleImageClick("tem2")}
										alt="Second template"
									/>
								</label>
							</div>
						</div>
					</>)}


					{/* <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Template options
              </legend>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">

                  <div className=" h-6 items-center">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"

                    />
	                  <img src={tem1} style={{height:500,width:500}}/>
                  </div>x
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="comments"
                      className="font-medium text-gray-900"
                    >
                      Comments
                    </label>
                    <p className="text-gray-500">
                      Get notified when someones posts a comment on a posting.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="candidates"
                      className="font-medium text-gray-900"
                    >
                      Candidates
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label
                      htmlFor="offers"
                      className="font-medium text-gray-900"
                    >
                      Offers
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                Push Notifications
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                These are delivered via SMS to your mobile phone.
              </p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Everything
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Same as email
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="push-nothing"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>*/}
				</div>
			</div>

			<div className="mt-6 flex items-center justify-end gap-x-6">
				<button
					type="button"
					className="rounded-md mb-9 hover:drop-shadow-xl px-3 py-2 text-sm p-3 font-semibold leading-6 text-gray-900"
				>
					Cancel
				</button>

				{isAiActive === true ? (
					<>
						<button
							onClick={(event) => handleAIEmailSub(event)}
							style={{backgroundColor: currentColor}}
							className={`rounded-md mb-9 p-3 hover:drop-shadow-xl px-4 py-3 text-sm font-semibold
							text-white shadow-sm hover:bg-black-500 flex focus-visible:outline focus-visible:outline-2 
							focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
							<FiSend className={"mr-2 mt-1"}/>
							<h1>Send</h1>
						</button>
					</>
				) : (
					<>
						<button
							type="submit"
							style={{backgroundColor: currentColor}}
							className={`rounded-md mb-9 p-3 hover:drop-shadow-xl px-4 py-3 text-sm font-semibold
							 text-white shadow-sm hover:bg-black-500 flex focus-visible:outline focus-visible:outline-2
							 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}>
							<FiSend className={"mr-2 mt-1"}/>
							<h1>Send</h1>
						</button>
					</>)}

			</div>
		</form>
	);
}

export default Form