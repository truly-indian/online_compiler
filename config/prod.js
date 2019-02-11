

    module.exports = {
        google:{
            clientID:process.env.googleclientID,
            clientSecret:process.env.googleclientSecret
        },
        mongodb:{
            dbURI:process.env.mongodbdbURI
        },
        session:{
            cookieKey:process.env.sessioncookie
        },
        jsdoodle:{
            clientId:process.env.jsdoodleclientId,
            clientSecret:process.env.jsdoodleclientSecret,
            url:process.env.jsdoodleurl
        }
    }
