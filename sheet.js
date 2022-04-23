const { google } = require('googleapis');
const { getAuthClient } = require('./oaut');

const getApiClient = async () => {
    const authClient = await getAuthClient();
    const { spreadsheets: apiClient } = google.sheets( {
        version : 'v4',
        auth    : authClient,
    } );
 
    return apiClient;
};

const appendValuesData = async ( apiClient, range, body ) => {
    const { data } = await apiClient.values.append( {
        spreadsheetId   : '19m-1i6tcjeHCyT-V4VzdMFnm6YWRhMaMcrkCVzIJAlM',
        range           : range,
        valueInputOption: 'RAW',
        requestBody     : body,
    } );
 
    return data.sheets;
};


 const apendDataGS = async ( values ) => {
    const range = 'Лист1!A2:Q1000';
    const apiClient = await getApiClient();
    const requestBody = {
        values,
    };

    await appendValuesData( apiClient, range, requestBody );
};


module.exports = {
    apendDataGS,
}