import { getAllRoleList, isAccountExist } from '/@/api/demo/system';
import { BasicColumn, FormSchema } from '/@/components/Table';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();
export const deptMap = (() => {
  const pDept = ['华东分部', '华南分部', '西北分部'];
  const cDept = ['研发部', '市场部', '商务部', '财务部'];

  return pDept.reduce((map, p, pIdx) => {
    map[pIdx] = p;

    cDept.forEach((c, cIndex) => (map[`${pIdx}-${cIndex}`] = `${p}-${c}`));

    return map;
  }, {});
})();

export const columns: BasicColumn[] = [
  {
    title: t('administration.account.column.login'),
    dataIndex: 'account',
    width: 120,
  },
  {
    title: t('administration.account.column.nickname'),
    dataIndex: 'nickname',
    width: 120,
  },
  {
    title: t('administration.account.column.email'),
    dataIndex: 'email',
    width: 120,
  },
  {
    title: t('administration.account.column.createTime'),
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: t('administration.account.column.role'),
    dataIndex: 'role',
    width: 200,
  },
  {
    title: t('administration.account.column.dept'),
    dataIndex: 'dept',
    customRender: ({ value }) => {
      return deptMap[value];
    },
  },
  {
    title: t('administration.account.column.remark'),
    dataIndex: 'remark',
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: t('administration.account.column.login'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickname',
    label: t('administration.account.column.nickname'),
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'email',
    label: t('administration.account.column.email'),
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'account',
    label: t('administration.account.column.login'),
    component: 'Input',
    helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      {
        trigger: 'blur',
        validator(_, value) {
          return new Promise((resolve, reject) => {
            if (!value) return resolve();
            isAccountExist(value)
              .then(resolve)
              .catch((err) => {
                reject(err.message || '验证失败');
              });
          });
        },
      },
    ],
  },
  {
    field: 'pwd',
    label: t('administration.account.column.password'),
    component: 'InputPassword',
    required: true,
    ifShow: false,
  },
  {
    label: t('administration.account.column.role'),
    field: 'role',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'roleName',
      valueField: 'roleValue',
    },
    required: true,
  },
  {
    field: 'dept',
    label: t('administration.account.column.dept'),
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'deptName',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    field: 'nickname',
    label: t('administration.account.column.nickname'),
    component: 'Input',
    required: true,
  },

  {
    label: t('administration.account.column.email'),
    field: 'email',
    component: 'Input',
    required: true,
  },

  {
    label: t('administration.account.column.remark'),
    field: 'remark',
    component: 'InputTextArea',
  },
];
