import { $post } from '../axios'

export const homeList = data => $post('/company_fdcms/fdJobList', data)