
import { post, $post } from '../axios'

export const addDiscuss = data => $post('/teambls/add_discuss', data) // 新增文章
export const getDiscussList = data => $post('/teambls/discussList', data) // 文章列表
export const getDiscussInfo = data => $post('/teambls/discussInfo', data) // 文章详情
export const delDiscuss = data => $post('/teambls/del_discuss', data)  // 删除文章
export const getReply = data => $post('/teambls/getReply', data)  // 文章评论列表
export const delReplyfirst = data => $post('/teambls/del_replyfirst', data)  // 删除一级评论
export const delReply = data => $post('/teambls/del_reply', data)  // 删除二级评论
export const addReply = data => $post('/teambls/add_reply', data)  // 新增评论
export const setTopComment = data => $post('/teambls/set_top', data)  // 新增评论

