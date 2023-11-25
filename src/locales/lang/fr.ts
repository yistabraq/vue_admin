import { genMessage } from '../helper';
import antdLocale from 'ant-design-vue/es/locale/zh_CN';

const modules = import.meta.glob('./fr/**/*.json', { eager: true });
export default {
  message: {
    ...genMessage(modules as Recordable<Recordable>, 'fr'),
    antdLocale,
  },
};
