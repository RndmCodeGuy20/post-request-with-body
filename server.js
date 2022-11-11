const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const packageJS = require('./package.json')
const {generateHash, generatePassword} = require("./utils/passwordgen");

const PORT = process.env.PORT || process.env.port || 5000;
const apiRoute = '/api';

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: /http\/\/localhost/}));
app.options('*', cors());

const sampleDB = {
    'gdsc':
        {
            "email_address": "gdsc@rknec.edu",
            "mobile_number": "1234567890",
            "name": "GDSC RCOEM",
            "college_id": "RCOEM",
            "password": "$2a$12$85yHvBb1xtOi5TM38dY5yurK8Ubg61S2Yt4Vu9dFeHUGTvbm3Kx8",
        },
}

const router = express.Router()
router.get('/club_accounts/:club', (req, res) => {
    const user = req.params.club;
    const account = sampleDB[user];

    if (!account) {
        return res.status(404).json({error: "User does not exist"})
    }

    return res.status(200).json(account);
})

router.get('/all', (req, res) => {
    return res.status(200).json(sampleDB);
})

router.post('/club_accounts/create', (req, res) => {
    const body = req.body;
    console.log(body);

    if (!body.email_address || !body.mobile_number) {
        return res.status(400).json({error: "Mobile Number and Email Required"})
    }

    if (sampleDB[body.user]) {
        return res.status(400).json({error: "Account already exists!"})
    }

    const club_account = {
        mobile_number: body.mobile_number,
        email_address: body.email_address,
        name: body.name,
        college_id: body.college_id,
        password: generateHash(generatePassword())
    }

    sampleDB[body.tname] = club_account;

    return res.status(201).json(club_account);
})

app.use(apiRoute, router)
app.listen(PORT, (err) => {
    console.log(`Server running on http://localhost:${PORT}`)
})