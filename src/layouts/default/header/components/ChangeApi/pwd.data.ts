import { FormSchema } from '/@/components/Form';
import { useI18n } from '/@/hooks/web/useI18n';

const { t } = useI18n();
export const formSchema: FormSchema[] = [
  {
    field: 'passwordOld',
    label: t('dropdown.changePassword.passwordOld'),
    component: 'InputPassword',
    required: true,
  },
  {
    field: 'passwordNew',
    label: t('dropdown.changePassword.passwordNew'),
    component: 'StrengthMeter',
    componentProps: {
      placeholder: t('dropdown.changePassword.strengthMeter'),
    },
    rules: [
      {
        required: true,
        message: t('dropdown.changePassword.messageError'),
      },
    ],
  },
  {
    field: 'confirmPassword',
    label: t('dropdown.changePassword.confirmPassword'),
    component: 'InputPassword',

    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject(t('dropdown.changePassword.noMatchError'));
            }
            if (value !== values.passwordNew) {
              return Promise.reject(t('dropdown.changePassword.noMatchError'));
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
];
