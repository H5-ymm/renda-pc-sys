import { post, $post } from '../axios'

export const getList = data => post('/receipt/receiptList', data);
export const getOrderDetail = data => post('/enterpriseinvoice/selectInvoiceInfo', data);
export const getFdJobList = data => $post('/company_fdcms/fdJobList', data);
export const getCount = data => $post('/company_fdcms/getCount', data);
export const delFdjob = data => $post('/company_fdcms/fdjob_del', data);
export const checkFdjob = data => $post('/company_fdcms/save_status', data);
export const getJobInfo = data => $post('/company_fdcms/get_job_info', data); // 发单职位详情
export const updateInvoice = data => $post('/company_fdcms/updateInvoice', data);




