import WatchBoxListItem from "./WatchBoxListItem";

const WatchBoxList = ({ watched }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchBoxListItem movie={movie} />
      ))}
    </ul>
  );
};

export default WatchBoxList;
