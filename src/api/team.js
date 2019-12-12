import { post, $post } from '../axios'

export const addTeamUser = data => $post('/teamcms/addTeamUser', data) // 添加团队成员
export const updateTeamUser = data => $post('/teamcms/updateTeamUser', data) // 修改团队成员
export const seeTeamUserInfo = data => $post('/teamcms/seeTeamUserInfo', data) // 查看团队成员

export const getTeamList = data => $post('/teamcms/getTeamList', data) // 成员列表接口
export const delTeam = data => $post('/teamcms/del_team', data) // 删除团队
export const getTeamInfo = data => $post('/teamcms/getTeam_info', data) // 获取团队信息
export const updateTeamInfo = data => $post('/teamcms/updateTeamInfo', data) // 修改团队信息
export const addTeamDepartment = data => $post('/teamcms/addTeamDepartment', data) // 团队部门的添加
export const departmentList = data => $post('/teamcms/departmentList', data) // 部门列表
export const adjustmentList = data => $post('/teamcms/adjustmentList', data) // 部门人员调整列表
export const departmentRoleList = data => $post('/teamcms/departmentRoleList', data) // 获取团队部门和部门职称列表
export const editTeamUserRole = data => $post('/teamcms/editTeamUserRole', data) // 团队成员角色调整
export const teamListUser = data => $post('/teamcms/teamcmsListUser', data) // 团队人员列表(在选着部门经理是调用)

export const checkTeamSave = data => $post('/teamcms/save_status', data)  // 团队审核
export const lockTeamSave = data => $post('/teamcms/lock_team', data)  // 团队锁定

export const lockUserSave = data => $post('/teamcms/lock_user', data)  // 成员锁定
export const delUser= data => $post('/teamcms/del_user', data)  //删除团员
export const getUserDetail= data => $post('/teamcms/detail_user', data) //获取团员信息



