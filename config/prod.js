if(process.env.NODE_ENV === 'production'){

    module.exports = {
        clientId: process.env.clientId,
        clientID: process.env.clientID,
        clientSecret:process.env.clientSecret,
        cookieKey:process.env.cookieKey,
        dbURI:process.env.dbURI,
        doodleclientSecret:process.env.doodleclientSecret,
        url:process.env.url
    }
}
