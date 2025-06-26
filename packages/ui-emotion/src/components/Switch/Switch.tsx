import { commonCss } from '#src/styles/common.styles';
import { switchCss } from './Switch.styles';

export default function Switch(props: React.ComponentProps<'input'>) {
  return (
    <label css={switchCss.label}>
      <input {...props} type="checkbox" css={commonCss.srOnly} />
      <div css={[switchCss.switch, props.checked && switchCss.active]} />
    </label>
  );
}
