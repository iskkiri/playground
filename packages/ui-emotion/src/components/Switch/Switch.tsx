import { switchCss } from './Switch.styles';

type SwitchProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Switch(props: SwitchProps) {
  return (
    <label css={switchCss.label}>
      <input {...props} type="checkbox" css={switchCss.checkbox} />
      <div css={[switchCss.switch, props.checked && switchCss.active]} />
    </label>
  );
}
