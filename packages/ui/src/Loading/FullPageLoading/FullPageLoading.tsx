import './full-page-loading.css';

import SpinLoading from '../SpinLoading/SpinLoading';

export default function FullPageLoading() {
  return (
    <div className="full-page-loading">
      <SpinLoading size={64} />
    </div>
  );
}
