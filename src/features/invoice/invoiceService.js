import axios from "axios";


const API_URL = '/api/invoice/'


/**
 * Generates an invoice by making a POST request to the API.
 *
 * @async
 * @param {object} invoiceData - The data for the invoice.
 * @param items
 * @throws {Error} If an error occurs during the API request.
 */
const generateInvoice = async (invoiceData) => {

    try {
        const response = await axios.post(`${API_URL}generateInvoice`, invoiceData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log(response.data);
    } catch (error) {
        console.error(error.message);
    }
};


const authorizeUri = () => {
    return new Promise(async (resolve, reject) => {
        let AuthUri = null;

        try {
            const jsonBody = {
                clientId: "ABWhAfdUyhJDUfmMrM8jDsfMzoR8emLKf0pEva39nthBzcicuL",
                clientSecret: "E7J7vtzduQm2VBoOttfX0fpB8dLz3LhzMbvOwvkU",
                environment: "sandBox",
                redirectUri: "http://localhost:3000/API",
            };

            const response = await axios.get('/api/invoice/authUri', {
                params: { json: jsonBody },
            });

            const uri = response.data;

            const parameters = 'location=1,width=800,height=650';
            const popupParameters = `${parameters},left=${(window.innerWidth - 800) / 2},top=${(window.innerHeight - 650) / 2}`;
            const win = window.open(uri, 'connectPopup', popupParameters);

            const pollOAuth = window.setInterval(() => {
                try {
                    if (win.document.URL.indexOf('code') !== -1) {
                        AuthUri = win.document.URL;
                        window.clearInterval(pollOAuth);
                        win.close();
                        resolve(AuthUri);
                    }
                } catch (e) {
                    console.log(e);
                }
            }, 100);

        } catch (error) {
            console.error('Error authorizing URI:', error);
            reject(error);
        }
    });
};


/*const setAccessToken = async (AuthUri) => {
    const token = localStorage.getItem('TOKEN');
    const timeSpan = localStorage.getItem('TOKEN_TIME_SPAN');

    if (token && (Date.now() - parseInt(timeSpan)) < 3600000) {
        return token;
    }

    try {
        const response = await axios.get("/callback", {
            params: {
                code: code,
            }
        });

        localStorage.setItem('TOKEN', response.data);
        localStorage.setItem('TOKEN_TIME_SPAN', Date.now().toString());

        return response.data;
    } catch (error) {
        console.error(error);
    }
}*/

/**
 * Automates invoice creation using the provided invoice data.
 *
 * @param {Object} invoiceData - The data for creating the invoice.
 * @returns {Promise} - A promise that resolves with the response data or rejects with an error.
 * @throws {Error} - If an error occurs during the invoice creation process.
 */
const automateInvoice = async (invoiceData) => {

    console.log(invoiceData)

    try {
        const response = await axios.post("api/invoice/automateInvoices", {
            params: {
                emails:invoiceData
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

const invoiceService ={
    generateInvoice,
    automateInvoice,
    authorizeUri,

}

export default invoiceService;