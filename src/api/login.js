import { $post, post } from '../axios'


export const getCode = data => $post('/login/sendVerification',data)

export const userRegister = data => $post('/login/userRegister',data)

export const getProvincesList = () => post('/company/getProvincesList')

export const getCitysList = data => $post('/company/getCitysList',data)

export const getAreasList = data => $post('/company/getAreasList',data)

export const goLogin = data => $post('/login/login', data);