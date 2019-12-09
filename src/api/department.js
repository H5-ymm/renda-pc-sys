
import { $post } from '../axios'

export const getDepartmentList = data => $post('/team/departmentList', data) // 部门列表

export const getTeamListUser = data => $post('/team/teamListUser', data) // 团队人员列表(在选着部门经理是调用)

export const addTeamDepartment = data => $post('/team/addTeamDepartment', data)

export const delDepartment = data => $post('/team/delDepartment', data)

export const adjustmentList = data => $post('/team/adjustmentList', data)

export const departmentRoleList = data => $post('/team/departmentRoleList', data) // 获取团队部门和部门职称列表



