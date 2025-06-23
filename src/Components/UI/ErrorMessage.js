const ErrorMessage = ({ message }) => {
  return (
    <p class="error">
      <span>⛔️ </span>
      {message}
    </p>
  );
};

export default ErrorMessage;
