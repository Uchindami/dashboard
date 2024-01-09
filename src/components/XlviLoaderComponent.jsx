import XlviLoader  from "./shared/Xlvi";

const XlviLoaderComponent = ({ isVisible }) => {
    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 backdrop-filter backdrop-blur-md"></div>
            <XlviLoader
                boxColors={["#EF4444", "#F59E0B", "#6366F1"]}
                desktopSize={"40px"}
                mobileSize={"50px"}
            />
        </div>
    );
}

export default XlviLoaderComponent