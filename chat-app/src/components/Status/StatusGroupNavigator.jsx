const StatusGroupNavigator = ({ id, index }) => {
  return (
    <div className="flex w-full justify-center gap-2 py-2">
      <a href={`#${id}`} className="btn btn-md mx-2">
        {index + 1}
      </a>
    </div>
  );
};
export default StatusGroupNavigator;
