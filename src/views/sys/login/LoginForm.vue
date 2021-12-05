<template>
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('sys.login.userName')"
        class="fix-auto-fill"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>

    <FormItem class="enter-x">
      <Button
        type="primary"
        size="large"
        block
        @click="handleLogin"
        :loading="loading"
      >{{ t('sys.login.loginButton') }}</Button>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
  import { Checkbox, Form, Input, Row, Col, Button, Divider } from 'ant-design-vue';

  import { useI18n } from '@/hooks/web/useI18n';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useDesign } from '@/hooks/web/useDesign';

  import { useFormRules, useFormValid } from './useLogin'
  import { useUserStore } from '@/store/modules/user';

  import { getMenuList } from '@/api/sys/menu'

  const ACol = Col;
  const ARow = Row;
  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { prefixCls } = useDesign('login');
  const userStore = useUserStore();

  const formData = reactive({
    account: 'vben',
    password: '123456',
  });
  const formRef = ref();
  const loading = ref(false);

  const { getFormRules } = useFormRules();
  const { validForm } = useFormValid(formRef);
  // const { notification, createErrorModal } = useMessage();
  const { notification } = useMessage();

  async function handleLogin() {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      let routeList = await getMenuList()
      console.log(routeList)
      // const userInfo = await userStore.login({
      //   password: data.password,
      //   username: data.account,
      //   mode: 'none', //不要默认的错误提示
      // });
      // if (userInfo) {
      //   notification.success({
      //     message: t('sys.login.loginSuccessTitle'),
      //     description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.realName}`,
      //     duration: 3,
      //   });
      // }
    } catch (error) {
      // createErrorModal({
      //   title: t('sys.api.errorTip'),
      //   content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
      //   getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      // });
    } finally {
      loading.value = false;
    }
  }
</script>
<style></style>