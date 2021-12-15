import { IcontentConfigType } from '@/base-ui/table/type'

export const contentConfig: IcontentConfigType = {
  // 表格标题
  title: '角色列表',

  // 需要遍历的 数据的 表头
  propList: [
    { prop: 'name', label: '角色名', minWidth: '100' },
    { prop: 'intro', label: '权限介绍', minWidth: '100' },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    { label: '操作', minWidth: '120', slotName: 'handler' }
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
