function Image({ path, width, children }) {
  const style = {
    width,
  }

  return (
    <div style={style}>
      <img width="100%" src={path} />

      <div>{children}</div>
    </div>
  )
}

export default Image
