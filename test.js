import {generateHash, generatePassword} from "./utils/passwordgen";

const sampleDB = {
    'gdsc':
        {
            "email_address": "gdsc@rknec.edu",
            "mobile_number": "1234567890",
            "name": "GDSC RCOEM",
            "college_id": "RCOEM"
        },
}

console.log(sampleDB);

sampleDB["isdc"] = {
    "email_address": "isdc@rknec.edu",
    "mobile_number": "1234567890",
    "name": "ISDC RCOEM",
    "college_id": "RCOEM"
};

console.log(sampleDB);

console.log(generateHash(generatePassword()))
