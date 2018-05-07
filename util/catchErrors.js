const catchErrors = (request, h, err) => {
    console.log('in handle error');
    console.error(err);
    throw err;
};

module.exports = catchErrors;
