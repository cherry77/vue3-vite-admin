import type { ValidationRule } from 'ant-design-vue/lib/form/Form'
import type { RuleObject } from 'ant-design-vue/lib/form/interface'
import { ref, computed, unref, Ref } from 'vue'
import { useI18n } from '@/hooks/web/useI18n'


export function useFormRules(formData?: Recordable) {
  const { t } = useI18n();

	const getAccountFormRule = computed(() => createRule(t('sys.login.accountPlaceholder')))
	const getPasswordFormRule = computed(() => createRule(t('sys.login.passwordPlaceholder')))

  const getFormRules = computed((): { [k: string]: ValidationRule | ValidationRule[] } => {
    const accountFormRule = unref(getAccountFormRule);
    const passwordFormRule = unref(getPasswordFormRule);

    return {
      account: accountFormRule,
      password: passwordFormRule,
    };
  })
  return { getFormRules };
}

export function useFormValid<T extends Object = any>(formRef: Ref<any>) {
  async function validForm() {
    const form = unref(formRef);
    if (!form) return;
    const data = await form.validate();
    return data as T;
  }

  return { validForm };
}

function createRule(message: string) {
	return [
		{
			required: true,
			message,
			trigger: 'change',
		},
	]
}
