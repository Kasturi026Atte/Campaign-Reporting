class Response {
    successResp(message, projectDetails) {
        return {
            statusCode: 200,
            body: {
                status: 'success',
                message: message,
                data: projectDetails,
            },
        };
    }
    projectPartialSuccessResp(message, PartialDetails) {
        return {
            statusCode: 206,
            body: {
                status: 'success',
                message: message,
                data: PartialDetails,
            },
        };
    }
    

    failResp(msg, err) {
        return {
            statusCode: 400,
            body: {
                status: 'failed',
                message: msg,
                error: err,
            },
        };
    }
}
export default new Response();