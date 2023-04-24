const InfoBox = ({ title, cases, active, isRed, total, ...props }) => {
  return (
    <div
      onClick={props.onClick}
      className={` p-4 m-2 flex-1 bg-slate-200 border-gray-100 rounded-xl  ${
        active && "border-1 border-t-green-500"
      } ${isRed && "border-1 border-red-300"}`}
    >
      <div>
        <div className="flex flex-col ">
          <h1 color="textSecondary" gutterBottom>
            {title}
          </h1>
          <div className="flex justify-between">
            <h2
              className="text-slate-800 text-3xl font-semibold mt-1"
              color="textSecondary"
            >
              {total}
            </h2>
            <h2
              className={`text-red-800 text-3xl font-semibold mb-1 ${
                !isRed && "text-green-800"
              }`}
            >
              {cases}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
