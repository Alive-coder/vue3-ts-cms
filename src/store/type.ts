import { ILoginModuleType } from './login/type'

export interface IRootType {
  name: string
  age: number
}

export interface ILoginType {
  login: ILoginModuleType
}

export type IStoreType = IRootType & ILoginType
