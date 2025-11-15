import 'dotenv/config'

//Standard user data
export const standard_user_email = (): string | undefined => {
    return process.env.STANDARD_USER_EMAIL
}

export const standard_user_password = (): string | undefined => {
    return process.env.STANDARD_USER_PASSWORD
}

export const apiKeys = {
     reqResApi:{
        apiKey: process.env.REQRES_API_KEY || '',
    }
}