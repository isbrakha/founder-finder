require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

console.log('API Key:', process.env.PHANTOMBUSTER_API_KEY);
console.log('Agent ID:', process.env.PHANTOM_AGENT_ID);
console.log('LinkedIn Session Cookie:', process.env.LINKEDIN_SESSION_COOKIE);


const app = express();
app.use(cors({
    origin: 'http://localhost:3000',  // Adjust this to match the URL of your client application if needed
}));
app.use(express.json());

const API_BASE_URL = "https://api.phantombuster.com/api/v2";

app.post('/api/search', async (req, res) => {
    const { companyName } = req.body;
    const companyUrl = `https://www.linkedin.com/company/${companyName}/`;

    try {
        const results = await launchPhantomAndGetResults(companyUrl);
        res.json(results);  // You might need to adjust how you process and send results based on the actual data structure returned.
    } catch (error) {
        console.error('Error during Phantom operation:', error);
        res.status(500).send('Failed to execute search');
    }
});

async function launchPhantomAndGetResults(companyUrl) {
    try {
        const response = await axios.post(`${API_BASE_URL}/agents/launch`, {
            id: process.env.PHANTOM_AGENT_ID,  // Ensure your agent ID is correctly set in your environment variables
            argument: {
                sessionCookie: process.env.LINKEDIN_SESSION_COOKIE,  // Ensure your session cookie is correctly set in your environment variables
                companyUrl: companyUrl
            }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-Phantombuster-Key': process.env.PHANTOMBUSTER_API_KEY  // Ensure your API key is correctly set in your environment variables
            }
        });
        console.log("Response Data ", response.data)
        return response.data;
    } catch (error) {
        console.error("Failed to launch or get results from Phantom:", error);
        throw error;  // Rethrow the error for further handling
    }
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
