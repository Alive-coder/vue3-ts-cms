export const  rules = {
  name: [
    {
      required: true,
      message: '账号不能为空~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,10}$/,
      message: '账号只能是5-10个字母或数字~',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '密码不能为空~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z 0-9]{3,}$/,
      message: '账号必须是3位以上的字母或数字~',
      trigger: 'blur'
    }
  ]
}

