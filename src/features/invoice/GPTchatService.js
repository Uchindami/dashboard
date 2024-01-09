import axios from "axios";


const generateTemplate = async (userDetails,items,option) => {

    console.log(userDetails,items,option)

    try {
        const response = await axios.get("api/invoice/generateTemplate", {
            params: {
                userDetails,
                items,
                option:option
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const sendAiGeneratedMail = async (emailAddress,email) => {
    try {
        const response = await axios.get("api/invoice/sendAiGeneratedMail", {
            params: {
                emailAddress,
                email,
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }

}


const gptServices = {
    generateTemplate,
    sendAiGeneratedMail,
}

export default gptServices;