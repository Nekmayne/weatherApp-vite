const Notification = ({ message, status }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className="flex flex-row justify-center text-center align-middle">
      <div className="w-4/6 text-white text-2xl sm:w-3/6 sm:text-3xl mb-3 border-2 border-color: bg-red-500">
        {status}
        {message}
      </div>
    </div>
  );
};

export default Notification;
