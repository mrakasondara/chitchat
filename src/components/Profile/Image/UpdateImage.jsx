const UpdateImage = ({ onSelect, onUpdate }) => {
  return (
    <div className="flex justify-center gap-3">
      <input
        type="file"
        className="file-input file-input-bordered file-input-primary w-full file-input-sm bg-white max-w-xs"
        accept="image/*"
        onChange={(e) => onSelect(e)}
      />
      <button
        className="btn btn-sm border-none hover:bg-main/50 bg-main text-white"
        onClick={(e) => onUpdate(e)}
      >
        Update Image
      </button>
    </div>
  );
};
export default UpdateImage;
