import type { AxiosRequestConfig, Canceler } from 'axios';
import axios from 'axios';

// Used to store the identification and cancellation function of each request
let pendingMap = new Map<string, Canceler>();

// url/method/(params/data) same, mean the request is repeat
export const getPendingKey = (config: AxiosRequestConfig): string => {
  return [config.method, config.url, JSON.stringify(config.params), JSON.stringify(config.data)].join('&');
}
export class AxiosCanceler{

  addPending(config: AxiosRequestConfig){
    this.removePending(config)
    const pendingKey = getPendingKey(config)
    config.cancelToken =  config.cancelToken ||  new axios.CancelToken(cancel => {
      pendingMap.set(pendingKey, cancel)
    })
  }

  removePending(config: AxiosRequestConfig){
    const pendingKey = getPendingKey(config)
    if(pendingMap.has(pendingKey)){
      const cancel = pendingMap.get(pendingKey)
      cancel && cancel()
      pendingMap.delete(pendingKey)
    }
  }

  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}