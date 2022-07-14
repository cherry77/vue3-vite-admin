<template>
  <Form
    class="w-96"
    ref="formRef"
    :model="formData"
    :rules="getFormRules"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account">
      <Input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('sys.login.userName')"
      />
    </FormItem>
    <FormItem name="password">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>

    <FormItem>
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">{{t("sys.login.loginButton")}}</Button>
    </FormItem>
  </Form>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Form, Input, Button, notification } from "ant-design-vue";

import { useI18n } from "@/hooks/web/useI18n";
import { useDesign } from "@/hooks/web/useDesign";

import { useFormRules, useFormValid } from "./useLogin";
import { useUserStore } from "@/store/modules/user";
import { defHttp } from '@/utils/request'

const FormItem = Form.Item;
const InputPassword = Input.Password;
const { t } = useI18n();
const { prefixCls } = useDesign("login");
const userStore = useUserStore();
const router = useRouter();

const formData = reactive({
  account: "admin",
  password: "123456",
});
const formRef = ref();
const loading = ref(false);

const { getFormRules } = useFormRules();
const { validForm } = useFormValid(formRef);

async function handleLogin() {
  const data = await validForm();
  if (!data) return;
  try {
    loading.value = true;
    const userInfo = await userStore.login({
      password: data.password,
      username: data.account,
    });
    if (userInfo) {
      await router.replace({ name: "Dashboard" });
      notification.success({
        message: t("sys.login.loginSuccessTitle"),
        description: `${t("sys.login.loginSuccessDesc")}: ${userInfo.realName}`,
        duration: 3,
      });
    }
  } catch (error) {
    console.log(error);
    // createErrorModal({
    //   title: t('sys.api.errorTip'),
    //   content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
    //   getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
    // });
  } finally {
    loading.value = false;
  }
}


defHttp.fetch({
  url: '/getUserInfo',
  method: 'post'
}).then(res => {
  // console.log(res)
});

</script>
<style></style>
