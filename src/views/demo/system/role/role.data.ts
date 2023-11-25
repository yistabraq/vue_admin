import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { setRoleStatus } from '/@/api/demo/system';
import { useMessage } from '/@/hooks/web/useMessage';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();

type CheckedType = boolean | string | number;
export const columns: BasicColumn[] = [
  {
    title: t('administration.roles.column.name'),
    dataIndex: 'roleName',
    width: 200,
  },
  {
    title: t('administration.roles.column.value'),
    dataIndex: 'roleValue',
    width: 180,
  },
  {
    title: t('administration.roles.column.order'),
    dataIndex: 'orderNo',
    width: 50,
  },
  {
    title: t('administration.roles.column.status'),
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === '1',
        checkedChildren: '停用',
        unCheckedChildren: '启用',
        loading: record.pendingStatus,
        onChange(checked: CheckedType) {
          record.pendingStatus = true;
          const newStatus = checked ? '1' : '0';
          const { createMessage } = useMessage();
          setRoleStatus(record.id, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success(`已成功修改角色状态`);
            })
            .catch(() => {
              createMessage.error('修改角色状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: t('administration.roles.column.createTime'),
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: t('administration.roles.column.remark'),
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'roleNme',
    label: t('administration.roles.column.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: t('administration.roles.column.status'),
    component: 'Select',
    componentProps: {
      options: [
        { label: t('administration.roles.role.status.valid'), value: '1' },
        { label: t('administration.roles.role.status.invalid'), value: '0' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'roleName',
    label: t('administration.roles.column.name'),
    required: true,
    component: 'Input',
  },
  {
    field: 'roleValue',
    label: t('administration.roles.column.value'),
    required: true,
    component: 'Input',
  },
  {
    field: 'status',
    label: t('administration.roles.column.status'),
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: t('administration.roles.role.status.valid'), value: '1' },
        { label: t('administration.roles.role.status.invalid'), value: '0' },
      ],
    },
  },
  {
    label: t('administration.roles.column.remark'),
    field: 'remark',
    component: 'InputTextArea',
  },
  {
    label: ' ',
    field: 'menu',
    slot: 'menu',
    component: 'ApiTree',
  },
];
