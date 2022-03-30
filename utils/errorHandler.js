const sendFailedResponse = (
    res,
    message = 'Something went wrong',
    statusCode = 400
) => {
    res.status(statusCode).send({
        message: message.toString(),
    })
    return
}

module.exports = sendFailedResponse
