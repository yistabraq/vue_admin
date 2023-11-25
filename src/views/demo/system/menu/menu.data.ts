import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import Icon from '@/components/Icon/Icon.vue';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();
export const columns: BasicColumn[] = [
  {
    title: t('administration.menu.column.name'),
    dataIndex: 'menuName',
    width: 200,
    align: 'left',
  },
  {
    title: t('administration.menu.column.icon'),
    dataIndex: 'icon',
    width: 50,
    customRender: ({ record }) => {
      return h(Icon, { icon: record.icon });
    },
  },
  {
    title: t('administration.menu.column.permission'),
    dataIndex: 'permission',
    width: 180,
  },
  {
    title: t('administration.menu.column.component'),
    dataIndex: 'component',
  },
  {
    title: t('administration.menu.column.order'),
    dataIndex: 'orderNo',
    width: 50,
  },
  {
    title: t('administration.menu.column.status'),
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      const status = record.status;
      const enable = ~~status === 0;
      const color = enable ? 'green' : 'red';
      const text = enable
        ? t('administration.menu.menu.status.invalid')
        : t('administration.menu.menu.status.valid');
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: t('administration.menu.column.createTime'),
    dataIndex: 'createTime',
    width: 180,
  },
];

const isDir = (type: string) => type === '0';
const isMenu = (type: string) => type === '1';
const isButton = (type: string) => type === '2';

export const searchFormSchema: FormSchema[] = [
  {
    field: 'menuName',
    label: t('administration.menu.column.name'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: t('administration.menu.column.status'),
    component: 'Select',
    componentProps: {
      options: [
        { label: t('administration.menu.menu.status.invalid'), value: '0' },
        { label: t('administration.menu.menu.status.valid'), value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'type',
    label: t('administration.menu.column.type'),
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: t('administration.menu.menu.type.0'), value: '0' },
        { label: t('administration.menu.menu.type.1'), value: '1' },
        { label: t('administration.menu.menu.type.2'), value: '2' },
      ],
    },
    colProps: { lg: 24, md: 24 },
  },
  {
    field: 'menuName',
    label: t('administration.menu.column.name'),
    component: 'Input',
    required: true,
  },

  {
    field: 'parentMenu',
    label: t('administration.menu.column.parent'),
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: t('administration.menu.column.name'),
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },

  {
    field: 'orderNo',
    label: t('administration.menu.column.order'),
    component: 'InputNumber',
    required: true,
  },
  {
    field: 'icon',
    label: t('administration.menu.column.icon'),
    component: 'IconPicker',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },

  {
    field: 'routePath',
    label: t('administration.menu.column.routePath'),
    component: 'Input',
    required: true,
    ifShow: ({ values }) => !isButton(values.type),
  },
  {
    field: 'component',
    label: t('administration.menu.column.component'),
    component: 'Input',
    ifShow: ({ values }) => isMenu(values.type),
  },
  {
    field: 'permission',
    label: t('administration.menu.column.permission'),
    component: 'Input',
    ifShow: ({ values }) => !isDir(values.type),
  },
  {
    field: 'status',
    label: t('administration.menu.column.status'),
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: t('administration.menu.menu.status.invalid'), value: '0' },
        { label: t('administration.menu.menu.status.valid'), value: '1' },
      ],
    },
  },
  {
    field: 'isExt',
    label: t('administration.menu.column.isExt'),
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: t('administration.menu.menu.option.no'), value: '0' },
        { label: t('administration.menu.menu.option.yes'), value: '1' },
      ],
    },
    ifShow: ({ values }) => !isButton(values.type),
  },

  {
    field: 'keepalive',
    label: t('administration.menu.column.keepalive'),
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: t('administration.menu.menu.option.no'), value: '0' },
        { label: t('administration.menu.menu.option.yes'), value: '1' },
      ],
    },
    ifShow: ({ values }) => isMenu(values.type),
  },

  {
    field: 'show',
    label: t('administration.menu.column.isShow'),
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: t('administration.menu.menu.option.no'), value: '0' },
        { label: t('administration.menu.menu.option.yes'), value: '1' },
      ],
    },
    ifShow: ({ values }) => !isButton(values.type),
  },
];
