import { post } from '../axios'

export const homeList = data => post('/receipt/indexReceiptList', data)