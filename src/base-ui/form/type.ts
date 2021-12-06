type Type = 'input' | 'select' | 'password' | 'datepicker'

interface IoptionsType{
  title: string,
  value: string
}

export interface IFormType {
  field: string,
  type: Type,
  label: string,
  placeholder?: string,
  // 针对 select 添加属性
  options?: IoptionsType[],
  // 针对 datepicker 添加属性
  otherOptions?: any
}

export interface IForm{
  formType: IFormType[],
  labelWidth?: string,
  formItemStyle?: any,
  colLayout?: any
}
