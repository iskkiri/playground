import switchCss from './styles/switch.module.scss';
import { cn } from '@repo/utils/cn';

export default function Switch(props: React.ComponentProps<'input'>) {
  return (
    <label className={switchCss.label}>
      <input {...props} type="checkbox" />
      <div className={cn(switchCss.switch, props.checked && switchCss.active)} />
    </label>
  );
}
