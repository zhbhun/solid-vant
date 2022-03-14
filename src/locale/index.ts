import { createSignal } from 'solid-js'
import { createMutable } from "solid-js/store";
import { deepAssign } from '../utils/deep-assign';
import defaultMessages from './lang/zh-CN';

type Message = Record<string, any>;
type Messages = Record<string, Message>;

const [lang, setLang] = createSignal('zh-CN');
const messages = createMutable<Messages>({
  'zh-CN': defaultMessages,
});

export const Locale = {
  messages(): Message {
    return messages[lang() as any];
  },

  use(newLang: string, newMessages?: Message) {
    setLang(newLang);
    this.add({ [newLang]: newMessages });
  },

  add(newMessages: Message = {}) {
    deepAssign(messages, newMessages);
  },
};

export default Locale;
