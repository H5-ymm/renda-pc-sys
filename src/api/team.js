import { post, $post } from '../axios'

export const addTeamUser = data => $post('/team/addTeamUser', data) // 添加团队成员
export const updateTeamUser = data => $post('/team/updateTeamUser', data) // 修改团队成员
export const seeTeamUserInfo = data => $post('/team/seeTeamUserInfo', data) // 查看团队成员

export const getTeamList = data => $post('/team/teamUserList', data) // 成员列表接口
export const loginOutTeam = data => $post('/team/loginOutTeam', data) // 退出团队
export const getTeamInfo = data => $post('/team/getTeamInfo', data) // 获取团队信息
export const updateTeamInfo = data => $post('/team/updateTeamInfo', data) // 修改团队信息
export const addTeamDepartment = data => $post('/team/addTeamDepartment', data) // 团队部门的添加
export const departmentList = data => $post('/team/departmentList', data) // 部门列表
export const adjustmentList = data => $post('/team/adjustmentList', data) // 部门人员调整列表
export const departmentRoleList = data => $post('/team/departmentRoleList', data) // 获取团队部门和部门职称列表
export const editTeamUserRole = data => $post('/team/editTeamUserRole', data) // 团队成员角色调整
export const teamListUser = data => $post('/team/teamListUser', data) // 团队人员列表(在选着部门经理是调用)