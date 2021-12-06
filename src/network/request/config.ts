let BASE_URL = ''
let BASE_TIME = 10000

// process.env.NODE_ENV === 'development' 可以判断当前是处于什么阶段(开发/生产/测试)
if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'HELLO WORLD'
} else {
  BASE_URL = 'test'
}

export { BASE_URL, BASE_TIME }
