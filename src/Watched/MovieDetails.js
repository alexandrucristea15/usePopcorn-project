const MovieDetails = ({ selectedId, onCloseMovie }) => {
  return (
    <div className="details">
      <button className="btn-back" onClick={onCloseMovie}>
        ◀
      </button>
      {selectedId}
    </div>
  );
};

export default MovieDetails;
