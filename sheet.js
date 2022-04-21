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

const getValuesData = async ( apiClient, range ) => {
    const { data } = await apiClient.get( {
        spreadsheetId   : '19m-1i6tcjeHCyT-V4VzdMFnm6YWRhMaMcrkCVzIJAlM',
        ranges          : range,
        fields          : 'sheets',
        includeGridData : true,
    } );
 
    return data.sheets;
};

const updateValuesData = async ( apiClient, range, body ) => {
    const { data } = await apiClient.values.update( {
        spreadsheetId   : '19m-1i6tcjeHCyT-V4VzdMFnm6YWRhMaMcrkCVzIJAlM',
        range           : range,
        valueInputOption: 'RAW',
        requestBody     : body,

    } );
 
    return data.sheets;
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
    const range = 'Лист1!A2:N100';
    const apiClient = await getApiClient();
    const requestBody = {
        values,
    };

    await appendValuesData( apiClient, range, requestBody );
};


module.exports = {
    apendDataGS,
}