module.exports = (err, req, res, next) => {
    console.error(`Error!!!:`, err)

    const response = {
    success: false,
    status: err.status || 'Error',
    message: err.isOperational ? err.message : 'Something went wrong',

}
res.status(err.statusCode || 500).json(response)
}

