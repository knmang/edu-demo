import request from '@/utils/request'

// 列出所有角色，并且标记当前用户ID是否拥有该角色
export const getAllRoleById = data => {
  return request({
    method: 'GET',
    url: '/boss/role/getRolesWithUserPermission',
    params: {
      userId: data
    }
  })
}

// 给用户分配角色
export const allocateUserRoles = data => {
  return request({
    method: 'POST',
    url: '/boss/role/allocateUserRoles',
    data
  })
}

// 保存或更新角色
export const saveOrUpdateRole = data => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

// 获取所有角色
export const getAllRole = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

// 按条件查询角色
export const getRolePages = data => {
  return request({
    method: 'POST',
    url: '/boss/role/getRolePages',
    data
  })
}
