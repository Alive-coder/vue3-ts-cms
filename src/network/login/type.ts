export interface accountType {
  name: string
  password: string
}

// 返回数据的类型
export interface IDataType<T = any> {
  code: string
  data: T
}

// 在登录时候返回 token时的类型
export interface ILoginDataType {
  id: number
  name: string
  token: string
}
