
import { post, $post } from '../axios'
export const getUserInfo = data => $post('/userinfo/selectUserInfo', data) // 获取用户基本信息
export const editUserInfo = data => $post('/userinfo/editUserInfo', data) // 个人信息修改
export const setLoginPassword = data => $post('/userinfo/setLoginPassword', data) // 设置登录密码
export const editUserPassword = data => $post('/userinfo/editUserPassword', data) // 修改密码
export const sendVerification = data => $post('/userinfo/sendVerification', data) // 发送重置密码短息验证
export const getUserMobile = data => $post('/userinfo/getUserMobile', data) // 获取当前用户手机号和密码

export const getLogList = data => $post('/company/company_log', data); // 日志
export const getRole = data => $post('/index/getRole', data);
