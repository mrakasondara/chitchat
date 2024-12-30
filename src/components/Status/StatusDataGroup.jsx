const StatusDataGroup = ({ displayName, date, desc, thumb, id }) => {
  const statusDate = new Date(date);
  const time = `${statusDate.getHours()}:${statusDate.getMinutes()}`;

  return (
    <div
      id={id}
      className="carousel-item flex flex-col modal-box w-full max-w-5xl h-[25rem] bg-white mx-2"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-2xl text-main">{displayName}</h3>
        <p className="text-sm text-black">{time}</p>
      </div>
      <img
        src={thumb}
        className="w-3/4 md:w-[45%] h-[13rem] mx-auto my-5 rounded-lg"
      />
      <p className="text-center text-black">{desc}</p>
    </div>
  );
};
export default StatusDataGroup;
