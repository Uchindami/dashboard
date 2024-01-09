import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { RiQuillPenFill } from 'react-icons/ri';
import Loader from "../components/XlviLoaderComponent";

function SignIn() {
    const [formData, setFormData] = useState({
        emailAddress: '',
        password: '',
    });

    const { emailAddress, password } = formData;
    const [error, setError] = useState(null); // Add error state

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            console.log(message);
            setError(message); // Set error message
        }

        if (isSuccess || user) {
            /*navigate('/ecommerce');*/

        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            emailAddress,
            password,
        };
        dispatch(login(userData));
    };

    if (isLoading) {
        return(
                <Loader/>
            )
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="p-10 m-10 mt-[6.875rem] max-w-[73.375rem] px-4 md:px-8 bg-primary-body">
                    <div className="z-50 m-3 p-10 flex justify-center ml-[0.375rem]">

                        <RiQuillPenFill
                            style={{ width: '30px', height: '30px' }}
                            className="transition duration-300 ease-in-out md:filter-none fill-button-fill"
                        />

                        <span className="text-[1rem] text-headings-mid ml-0.5 font-bold md:text-[2rem]">
                            Swift Invoice
                        </span>
                    </div>
                    <p className="text-center font-[500] leading-[1.05] text-headings-mid text-[1.5rem] md:text-[2rem]">
                        Login to your account
                    </p>
                    <p className="text-sm mt-4 font-medium leading-none text-gray-500">
                        Don't have an account?{' '}
                        <span
                            tabIndex={0}
                            role="link"
                            aria-label="Sign up here"
                            className="text-sm font-medium leading-none underline text-button-fill cursor-pointer"
                        >
              {' '}
                            Sign up here
            </span>
                    </p>

                    <form
                        onSubmit={onSubmit}
                        className="mt-8 space-y-6"
                        action="#"
                        method="POST"
                    >
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="emailAddress"
                                    type="email"
                                    onChange={handleChange}
                                    value={emailAddress}
                                    autoComplete="email"
                                    required
                                    className="bg-gray-200 border rounded focus:outline-none text-xs font-medium leading-none
                           text-primary-body py-3 w-full pl-3 mt-2 block appearance-none rounded-t-md
                                    border-gray-300 px-3 text-gray-900 placeholder-gray-500 focus:z-10
                                    focus:border-button-fill  focus:ring-button-fill sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div className="relative flex items-center justify-center">
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                    value={password}
                                    autoComplete="current-password"
                                    required
                                    className="bg-gray-200  rounded focus:outline-none text-xs font-medium leading-none
                                text-primary-body py-3 w-full pl-3 mt-2 border border-gray-300 px-3 text-gray-900
                                placeholder-gray-500
                                    focus:z-10 focus:border-button-fill  focus:ring-button-fill
                                     sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-secondary"
                                >
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm mt-5">
                                <a
                                    href="#"
                                    className="font-medium text-secondary hover:text-button-fill"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        {error && (
                            <p className="text-red-500 text-center mt-4">{error}</p>
                        )}
                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border
                                border-secondary  py-2 px-4  font-medium text-white
                                hover:bg-button-fill focus:outline-none focus:ring-2 focus:ring-yellow-500
                                focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignIn;
