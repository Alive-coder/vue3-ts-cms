import { ILoginModuleType } from './login/type'
import { IsystemStateType } from './main/system/type'

export interface IRootType {
  name: string
  age: number
}

export interface ILoginType {
  login: ILoginModuleType
  system: IsystemStateType
}

export type IStoreType = IRootType & ILoginType
