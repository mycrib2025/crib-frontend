const Avatar = ({ src, size = 40 }) => {
  return (
    <img
      src={src || "https://i.pravatar.cc/150"}
      alt="avatar"
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
};

export default Avatar;