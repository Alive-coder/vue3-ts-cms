import IoRequest from '../index'

import { accountType, IDataType, ILoginDataType } from './type'

enum LoginAPI {
  AccountLogin = '/login', // /login
  UserInfo = '/users/', // /users/:id
  MenuRoleId = '/role/' // /role/:id/menu
}

export function accountLoginRequest(account: accountType) {
  return IoRequest.post<IDataType<ILoginDataType>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function getUserInfoById(id: number) {
  return IoRequest.get<IDataType>({
    url: LoginAPI.UserInfo + id,
    showLoading: false
  })
}

export function getMenuByRoleId(id: number) {
  return IoRequest.get<IDataType>({
    url: LoginAPI.MenuRoleId + id + '/menu',
    showLoading: false
  })
}
