export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,

    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,

    SERVER_ERROR: 500
};

export const httpResponse = {
    ok: (res, data) =>
        res.status(HTTP_STATUS.OK).json(data),

    created: (res, data) =>
        res.status(HTTP_STATUS.CREATED).json(data),

    noContent: (res) =>
        res.status(HTTP_STATUS.NO_CONTENT).send(),

    badRequest: (res, data) =>
        res.status(HTTP_STATUS.BAD_REQUEST).json(data),

    unauthorized: (res, data) =>
        res.status(HTTP_STATUS.UNAUTHORIZED).json(data),

    forbidden: (res, data) =>
        res.status(HTTP_STATUS.FORBIDDEN).json(data),

    notFound: (res, data) =>
        res.status(HTTP_STATUS.NOT_FOUND).json(data),

    conflict: (res, data) =>
        res.status(HTTP_STATUS.CONFLICT).json(data),

    serverError: (res, data) =>
        res.status(HTTP_STATUS.SERVER_ERROR).json(data)
};