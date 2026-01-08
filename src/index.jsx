const Avatar = ({ src, alt = "avatar", size = 40 }) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
      }}
    />
  )
}

export default Avatar
