<template>
  <BasicModal
    :title="t('layout.header.dropdownChangeApi')"
    v-bind="$attrs"
    @register="register"
    @ok="handelSubmit"
    @cancel="handelCancel"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicModal, useModalInner } from '/@/components/Modal/index';
  import { BasicForm, useForm } from '/@/components/Form/index';

  import { useAppStore } from '/@/store/modules/app';
  import type { ApiAddress } from '/#/store';
  import { formSchema } from './pwd.data';

  const appStore = useAppStore();

  const { t } = useI18n();
  const [register, { closeModal }] = useModalInner(async () => {
    initData();
  });
  // perf 能读取所有.env.xxx文件最好, 另外key与--mode XXX最好相同

  const [registerForm, { validateFields, setFieldsValue }] = useForm({
    size: 'large',
    baseColProps: { span: 24 },
    labelWidth: 150,
    showActionButtonGroup: false,
    schemas: formSchema,
  });
  async function handelSubmit() {
    try {
      const values = await validateFields();
      const { passwordOld, passwordNew } = values;

      // TODO custom api
      console.log(passwordOld, passwordNew);
      // const { router } = useRouter();
      // router.push(pageEnum.BASE_LOGIN);
    } catch (error) {
      console.error(error);
    }
  }
  const handelCancel = () => {
    closeModal();
  };
  const initData = () => {
    const { key = '' } = appStore.getApiAddress as ApiAddress;
    if (key) {
      setFieldsValue({
        api: key,
      });
    }
  };
</script>
<style lang="less"></style>
