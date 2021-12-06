import { IForm } from '@/base-ui/form/type'

export const formConfig: IForm = {
  formType: [
    {
      field: 'id',
      type: 'input',
      label: 'id',
      placeholder: '请输入用户名'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码'
    },
    {
      field: 'sports',
      type: 'select',
      label: '爱好',
      placeholder: '请输入你的爱好',
      options: [
        { title: '篮球', value: 'basketball' },
        { title: '足球', value: 'football' }
      ]
    },
    {
      field: 'createTime',
      type: 'datepicker',
      label: '时间区域',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'daterange'
      }
    }
  ],
  labelWidth: '80px'
}
