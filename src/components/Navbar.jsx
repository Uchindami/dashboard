import React, {useEffect, useState} from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import { SiQuickbooks } from "react-icons/si";
import {MdKeyboardArrowDown} from 'react-icons/md';
import {TooltipComponent} from '@syncfusion/ej2-react-popups';
import {Cart, Chat, Notification, UserProfile} from '.';
import {useStateContext} from '../contexts/ContextProvider';
import {useSelector} from "react-redux";
import axios from "axios";
import { IoLinkOutline } from "react-icons/io5";

const NavButton = ({title, customFunc, icon, color, dotColor}) => (

	<TooltipComponent content={title} position="BottomCenter">
		<button
			type="button"
			onClick={() => customFunc()}
			style={{color}}
			className="relative text-xl rounded-full p-3 hover:bg-light-gray"
		>
      <span
	      style={{background: dotColor}}
	      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
			{icon}
		</button>
	</TooltipComponent>
);

const Navbar = () => {

	const [companyInfo,setCompanyInfo] = useState(null);

	const {
		currentColor,
		activeMenu,
		setActiveMenu,
		handleClick,
		isClicked,
		setScreenSize,
		screenSize,
		accessKey,
		setAccessKey,
		setIsLoading,
	} = useStateContext();




	const {user} = useSelector((state) => state.auth)

	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);


		window.addEventListener('resize', handleResize);

		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (accessKey !== null) {
					const response = await axios.get("/api/invoice/getCompanyInfo");
					/*console.log(response);*/
					setCompanyInfo(response.data.CompanyInfo);
					setIsLoading(false)
				}
			} catch (error) {
				console.error("Error fetching data:", error.message);
			}
		};
		fetchData()

		if (screenSize <= 900) {
			setActiveMenu(false);
		} else {
			setActiveMenu(true);
		}
	}, [screenSize,accessKey]);

	const handleActiveMenu = () => setActiveMenu(!activeMenu);


	return (
		<div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">


			<NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu/>}/>
			<div className="flex">
				{/*        <NavButton title="Cart" customFunc={() => handleClick('cart')} color={currentColor} icon={<FiShoppingCart />} />
        <NavButton title="Chat" dotColor="#03C9D7" customFunc={() => handleClick('chat')} color={currentColor} icon={<BsChatLeft />} />
        <NavButton title="Notification" dotColor="rgb(254, 201, 15)" customFunc={() => handleClick('notification')} color={currentColor} icon={<RiNotification3Line />} />*/}

                {/*
                is the user of business ? yes then display business logo
                */}

				{user.BusinessSize === 'Enterprise' ? (
					<>
                        {companyInfo !== null  ? (
                            <>
	                            <TooltipComponent content="Accounting Software" position="BottomCenter">
		                            <div className="flex  items-center gap-2  cursor-pointer p-1 hover:bg-light-gray rounded-lg">
			                            <div
				                            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
				                            onClick={() => handleClick('userProfile')}
			                            >
				                            <SiQuickbooks  className={"rounded-full fill-quickbooks-color w-8 h-8"}/>
			                            </div>

			                            <p>
				                            {/*<span className="text-gray-400 text-14">Org,</span>{' '}*/}
				                            <span className="text-gray-400 font-bold ml-1 text-14">
                                            {companyInfo && companyInfo.CompanyName}
                                            </span>
			                            </p>
			                            <div className="text-gray-400 text-14"/>
		                            </div>
	                            </TooltipComponent>

	                            <TooltipComponent content="Organization" position="BottomCenter">
		                            <div className="flex  items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
			                            <img
				                            className="rounded-full w-8 h-8"
				                            src={user.BusinessLogo}
				                            alt="user-profile"
			                            />
			                            <p>
				                            {/*<span className="text-gray-400 text-14">Org,</span>{' '}*/}
				                            <span className="text-gray-400 font-bold ml-1 text-14">
                                            {user && user.BusinessName}
                                            </span>
			                            </p>
			                            <div className="text-gray-400 text-14"/>
		                            </div>
	                            </TooltipComponent>

                                <TooltipComponent content="Profile" position="BottomCenter">
                                    <div
                                        className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                                        onClick={() => handleClick('userProfile')}
                                    >
                                        <img
	                                        referrerPolicy="no-referrer"
                                            className="rounded-full w-8 h-8"
                                            src={user.photo}
                                            alt="user-profile"
                                        />
                                        <p>
                                            <span className="text-gray-400 text-14">Hi,</span>{' '}
                                            <span className="text-gray-400 font-bold ml-1 text-14">
	                                            {user && user.firstname}
											</span>
                                        </p>
                                        <MdKeyboardArrowDown className="text-gray-400 text-14"/>
                                    </div>
                                </TooltipComponent>
                            </>
                        ):(
                            <>
	                            {/*{accessKey}*/}
                                <TooltipComponent content="Organization" position="BottomCenter">
                                    <div
                                        className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                                    >
                                        <img
	                                        referrerPolicy="no-referrer"
                                            className="rounded-full w-8 h-8"
                                            src={user.BusinessLogo}
                                            alt="user-profile"
                                        />
                                        <p>
                                            {/*<span className="text-gray-400 text-14">Org,</span>{' '}*/}
                                            <span className="text-gray-400 font-bold ml-1 text-14">
                                                {user && user.BusinessName}
											</span>
                                        </p>
                                        <div className="text-gray-400 text-14"/>
                                    </div>
                                </TooltipComponent>

                                <TooltipComponent content="Profile" position="BottomCenter">
                                    <div
                                        className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
                                        onClick={() => handleClick('userProfile')}
                                    >
                                        <img
                                            className="rounded-full w-8 h-8"
                                            src={user.photo}
                                            alt="user-profile"
                                        />
                                        <p>
                                            <span className="text-gray-400 text-14">Hi,</span>{' '}
                                            <span className="text-gray-400 font-bold ml-1 text-14">
                                            {user && user.firstname}
                                            </span>
                                        </p>
                                        <MdKeyboardArrowDown className="text-gray-400 text-14"/>
                                    </div>
                                </TooltipComponent>
                            </>)}
					</>
				) : (
					<TooltipComponent content="Profile" position="BottomCenter">
						<div
							className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
							onClick={() => handleClick('userProfile')}
						>
							<img
								className="rounded-full w-8 h-8"
								src={user.photo}
								alt="user-profile"
							/>
							<p>
								<span className="text-gray-400 text-14">Hi,</span>{' '}
								<span className="text-gray-400 font-bold ml-1 text-14">
									{user && user.firstname}
								</span>
							</p>
							<MdKeyboardArrowDown className="text-gray-400 text-14"/>
						</div>
					</TooltipComponent>
				)}
				{isClicked.cart && (<Cart/>)}
				{isClicked.chat && (<Chat/>)}
				{isClicked.notification && (<Notification/>)}
				{isClicked.userProfile && (<UserProfile/>)}
			</div>
		</div>
	);
};

export default Navbar;