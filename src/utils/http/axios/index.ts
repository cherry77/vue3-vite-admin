import axios from 'axios'

function fetchAxios(config) {
  const instance = axios.create({
    baseURL: 'basic-api', // 设置统一的请求前缀
    timeout: 10000, // 设置统一的超时时长
  });

  return instance(config)
}

export default fetchAxios