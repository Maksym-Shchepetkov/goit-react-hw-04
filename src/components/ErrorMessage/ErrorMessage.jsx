import s from './ErrorMessage.module.css';

const ErrorMessage = ({ errorText }) => {
  return <p className={s.par}>Sorry something went wrong. {errorText}</p>;
};

export default ErrorMessage;
