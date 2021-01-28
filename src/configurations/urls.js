// Base URLS

// Localhost
export const baseURL = "http://vehicle-inventory-ai.herokuapp.com/";


export const userCreateEndPoint = baseURL + "auth/users/"
export const activationURL = baseURL + "auth/users/activation/"
export const forgotPassURL = baseURL + "auth/users/reset_password/"
export const reSendEmailURL = baseURL + "auth/users/resend_activation/"
export const LOG_IN_JWT = baseURL + "auth/jwt/create/"
export const getUserData = baseURL + "auth/users/me/"
export const userPreferences=baseURL+"api/my/preferences/"
export const getAdminData=baseURL+"fr/admin/users/"
export const refreshToken=baseURL+"auth/jwt/refresh/"
export const createNewPassword=baseURL+"auth/users/reset_password_confirm/"
export const allUsersData=baseURL+"fr/admin/users/"
export const getAdminUserPreferences=baseURL+"fr/admin/users/"
