export const rules = {
  num: [
    {
      required: true,
      message: '账号不能为空~',
      trigger: 'blur'
    },
    {
      pattern: /^1[0-9]{10}$/,
      message: '请输入正确的手机号~',
      trigger: 'blur'
    }
  ],
  code: [
    {
      required: true,
      message: '验证码不能为空~',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6}$/,
      message: '请输入6位的验证码~',
      trigger: 'blur'
    }
  ]
}
