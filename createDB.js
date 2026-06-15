const fs = require('fs');
const path = require('path');

const dataDir = process.env.VERCEL
    ? path.join('/tmp', 'govietnam-data')
    : path.join(__dirname, 'data', 'store');

function ensureDataDir() {
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
}

function readStore(filename) {
    ensureDataDir();
    const filePath = path.join(dataDir, filename);
    if (!fs.existsSync(filePath)) {
        return [];
    }
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeStore(filename, rows) {
    ensureDataDir();
    fs.writeFileSync(path.join(dataDir, filename), JSON.stringify(rows, null, 2));
}

function addSubscription(email, callback) {
    const rows = readStore('subscriptions.json');
    if (rows.some((row) => row.email === email)) {
        const err = new Error('Email already subscribed.');
        err.code = 'SQLITE_CONSTRAINT';
        return callback(err);
    }

    rows.push({ id: rows.length + 1, email });
    writeStore('subscriptions.json', rows);
    callback(null, { lastID: rows.length });
}

function getAllSubscriptions(callback) {
    callback(null, readStore('subscriptions.json'));
}

function addContact(contact, callback) {
    const rows = readStore('contacts.json');
    rows.push({
        id: rows.length + 1,
        ...contact
    });
    writeStore('contacts.json', rows);
    callback(null, { lastID: rows.length });
}

function getAllContacts(callback) {
    callback(null, readStore('contacts.json'));
}

function addFeedback(feedback, callback) {
    const rows = readStore('feedback.json');
    rows.push({
        id: rows.length + 1,
        ...feedback
    });
    writeStore('feedback.json', rows);
    callback(null, { lastID: rows.length });
}

function getAllFeedback(callback) {
    callback(null, readStore('feedback.json'));
}

function closeDatabase() {}

module.exports = {
    addSubscription,
    getAllSubscriptions,
    addContact,
    getAllContacts,
    addFeedback,
    getAllFeedback,
    closeDatabase
};
