import { useI18n } from '@/hooks/web/useI18n'
import { Modal } from 'ant-design-vue';
const { t } = useI18n();

export function checkStatus(status: number, msg: string): void {
  let errMessage = ''
  switch (status) {
    case 400:
      errMessage = msg;
      break;
    case 401:
      errMessage = t('sys.api.errMsg401');
      break;
    case 403:
      errMessage = t('sys.api.errMsg403');
      break;
    case 404:
      errMessage = t('sys.api.errMsg404');
      break;
    case 405:
      errMessage = t('sys.api.errMsg405');
      break;
    case 408:
      errMessage = t('sys.api.errMsg408');
      break;
    case 500:
      errMessage = t('sys.api.errMsg500');
      break;
    case 501:
      errMessage = t('sys.api.errMsg501');
      break;
    case 502:
      errMessage = t('sys.api.errMsg502');
      break;
    case 503:
      errMessage = t('sys.api.errMsg503');
      break;
    case 504:
      errMessage = t('sys.api.errMsg504');
      break;
    case 505:
      errMessage = t('sys.api.errMsg505');
      break;
    default:
  }
  if(errMessage){
    Modal.error({
      title: t('sys.api.errorTip'),
      content: msg || errMessage
    })
  }
}