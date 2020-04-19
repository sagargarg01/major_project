


const development = {
    bame: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        //change it 
        auth: {
            user: 'username',
            pass: 'password'
        }
    },
    google_client_id: "396921753627-pcndn1gv2fcktrpupapgl0cikced4osl.apps.googleusercontent.com",
    google_client_secret: "RSSypTDP8t7oDMgObJmCRbbt",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial'
}

const production = {
    name: 'production'
}

module.exports = development;