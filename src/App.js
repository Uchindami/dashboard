import React, {useEffect} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {FiSettings} from 'react-icons/fi';
import {TooltipComponent} from '@syncfusion/ej2-react-popups';
import {useSelector} from "react-redux";

import {Footer, Navbar, Sidebar, ThemeSettings, XlviLoaderComponent} from './components';
import {SignIn} from './pages';
import './App.css';

import {useStateContext} from './contexts/ContextProvider';
import DashboardRoutes from "./routes/dashboardRoutes";

const App = () => {
    const {
        setCurrentColor,
        setCurrentMode,
        currentMode,
        activeMenu,
        currentColor,
        themeSettings,
        setThemeSettings,
        isLoading,
    } = useStateContext();
    const {user} = useSelector((state) => state.auth);

    useEffect(() => {
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
            setCurrentColor(currentThemeColor);
            setCurrentMode(currentThemeMode);
        }

    }, [setCurrentColor, setCurrentMode,isLoading]);

    if (user) {
        return (
            <div className={currentMode === 'Dark' ? 'dark' : ''}>
                <XlviLoaderComponent isVisible={isLoading} />
                <BrowserRouter>
                            <div className="flex relative dark:bg-main-dark-bg">
                                <div className="fixed right-4 bottom-4" style={{zIndex: '1000'}}>
                                    <TooltipComponent
                                        content="Settings"
                                        position="Top"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setThemeSettings(true)}
                                            style={{background: currentColor, borderRadius: '50%'}}
                                            className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                                        >
                                            <FiSettings/>
                                        </button>
                                    </TooltipComponent>
                                </div>
                                {activeMenu ? (
                                    <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                                        <Sidebar/>
                                    </div>
                                ) : (
                                    <div className="w-0 dark:bg-secondary-dark-bg mt">
                                        <Sidebar/>
                                    </div>
                                )}
                                <div
                                    className={
                                        activeMenu
                                            ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                                            : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                                    }
                                >
                                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                                        <Navbar/>
                                    </div>
                                    <div>
                                        {themeSettings && (<ThemeSettings/>)}
                                        <DashboardRoutes/>
                                    </div>
                                    <Footer/>
                                </div>
                            </div>
                        </BrowserRouter>
            </div>
        );
    } else {
        return (
            <div className={`absolute inset-0 bg-primary-body ${currentMode === 'Dark' ? 'dark' : ''}`}>
                <BrowserRouter>
                    <div>
                        {themeSettings && (<ThemeSettings/>)}
                        <SignIn/>
                        <Footer/>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
};

export default App;