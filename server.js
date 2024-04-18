require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { fetchFoundersData } = require('./services/crunchbase-scraper');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',  // Adjust this to match the URL of your client application if needed
}));
app.use(express.json());

const API_BASE_URL = "https://api.phantombuster.com/api/v2";

app.post('/api/search', async (req, res) => {
    // console.log('Request Headers:', req.headers);
    // console.log('Request Body:', req.body);

    const companyName  = req.body;
    // const companyUrl = `https://www.linkedin.com/company/${companyName}/`;

    try {
        // const results = await launchPhantomAndGetResults(companyUrl);
        const results = await fetchFoundersData(companyName);
        res.json(results);
    } catch (error) {
        console.error('Error during Phantom operation:', error);
        res.status(500).send('Failed to execute search');
    }
});

// app.post('/webhook', (req, res) => {
//     try {
//         // Parse the JSON string 
//         let results = JSON.parse(req.body.resultObject);

//         // Iterate over the array and log each element
//         results.forEach(element => {
//             console.log(`${element.name}: ${element.job}`);
//         });

//         res.status(200).send('Data received');
//     } catch (error) {
//         console.error('Failed to parse JSON or process data:', error);
//         res.status(500).send('Failed to parse request body');
//     }
// });
// async function launchPhantomAndGetResults(companyUrl) {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/agents/launch`, {
//             id: process.env.PHANTOM_AGENT_ID,
//             argument: {
//                 sessionCookie: process.env.LINKEDIN_SESSION_COOKIE,
//                 spreadsheetUrl: companyUrl,
//                 numberOfResultsPerCompany: 1000,
//                 numberOfCompaniesPerLaunch: 1,
//                 positionFilter:"founder, co-founder"
//             }
//         }, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-Phantombuster-Key': process.env.PHANTOMBUSTER_API_KEY
//             }
//         });
//         console.log("Response Data: ", response.data);
//         return response.data;
//     } catch (error) {
//         console.error("Failed to launch or get results from Phantom:", error);
//         throw error;
//     }
// }

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
