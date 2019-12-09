import { $post } from '../axios'

export const getConstant = data => $post('/index/getConstant', data)