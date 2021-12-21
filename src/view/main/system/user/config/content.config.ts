import { IcontentConfigType } from '@/base-ui/table/type'

export const contentConfig: IcontentConfigType = {
  // 表格标题
  title: '用户列表',

  // 需要遍历的 数据的 表头
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100' },
    { prop: 'realname', label: '真实用户名', minWidth: '100' },
    { prop: 'cellphone', label: '电话号码', minWidth: '120' },
    { prop: 'enable', label: '状态', minWidth: '100', slotName: 'status' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '200',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '200',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '150',
      slotName: 'edit'
    }
  ],

  // 是否要添加索引项
  isShowIndexColumn: true,
  // 是否需要添加 选中项
  isShowSelectionColumn: true

  // // 拿到 table 组件选中的 数据
  // handleSelectionChange: (value: any) => {
  //   console.log(value)
  // }
}
