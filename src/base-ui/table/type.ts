export interface IpropListType{
  prop?: string,
  label: string,
  minWidth?: string,
  slotName?: string
}

export interface IcontentConfigType{
  title: string,
  propList: IpropListType[],
  isShowIndexColumn?: boolean,
  isShowSelectionColumn?: boolean
}

