exports.success = (req, res, message, status) => {
    let statusCode = status || 200;
    let statusMessage = message || '';
    res.status(status).send({
        ok: true,
        status: statusCode,
        body: statusMessage
    })
}

exports.error = (req, res, message, status) => {
    let statusCode = status || 500;
    let statusMessage = message || 'Internal server error';

    res.status(status).send({
        ok: false,
        status: statusCode,
        body: statusMessage
    })
}