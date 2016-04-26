// Request Codes
RequestCodes = {
    REGISTRATION_CODE        : 5,
    THERMOSTAT_RETRIEVAL_CODE: 6,
    THERMOSTAT_UPDATE_CODE   : 7,
    THERMOSTAT_DELETION_CODE : 8,
    SCHEDULE_CREATION_CODE   : 9,
    SCHEDULE_UPDATE_CODE     : 10,
    SCHEDULE_DELETION_CODE   : 11,
    LOGIN_CODE               : 12,
    MODE_CHANGE_CODE         : 15,
    LOGIN_RETRY_CODE         : 16
};

// Response Codes
ResponseCodes = {
    SUCCESS             : 0,
    INVALID_FORMAT      : 1,
    INVALID_SESSION     : 2,
    INVALID_CREDENTIAL  : 3,
    REQUEST_TIMEOUT     : 5,
    INVALID_IDENTIFIER  : 10,
    TOO_MANY_REG_REQUEST: 48,
    INVALID_OPERATION   : 49,
    SYSTEM_ERROR        : 50
};

// TCP Communication Utils
TcpConfigs = {
    TCP_PORT          : 11500,
    TCP_MESSAGE_HEADER: new Buffer([0x02]).toString('utf-8'),
    TCP_MESSAGE_FOOTER: new Buffer([0x03]).toString('utf-8'),
    TCP_TIMEOUT       : 5 * 60 * 1000, // in milliseconds
    REG_KEY_TIMEOUT   : 3 // in minutes
};

Status = {
    ACTIVE: 1,
    INACTIVE: 0
};
