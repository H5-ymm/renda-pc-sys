import { post, $post } from '../axios'

export const getList = data => post('/receipt/receiptList', data);
export const getOrderDetail = data => post('/enterpriseinvoice/selectInvoiceInfo', data);

