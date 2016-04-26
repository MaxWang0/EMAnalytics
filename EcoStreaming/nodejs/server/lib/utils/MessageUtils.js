TcpMessageUtils = {
    getMessage: function(bodyStr) {
        var body = JSON.stringify(bodyStr);
        return TcpConfigs.TCP_MESSAGE_HEADER +
              body +
              TcpConfigs.TCP_MESSAGE_FOOTER;
    },
    getErrorMessage: function(errCode, message) {
        
    }
};
