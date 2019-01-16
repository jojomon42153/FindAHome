class Error {
    printError(from, message) {
        const date = new Date();
        console.error(`${date.toLocaleString()} - ${from} - ${message}`);
    }
}

module.exports = Error;

