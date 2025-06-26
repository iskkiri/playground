import './tostify.css';
import { Bounce, ToastContainer } from 'react-toastify';

/**
 * @docs https://fkhadra.github.io/react-toastify/introduction
 */
export default function Toastify() {
  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      transition={Bounce}
    />
  );
}
