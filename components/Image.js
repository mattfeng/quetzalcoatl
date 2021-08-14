import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.blob())

function Image({ path, width, children }) {
  const { data, error } = useSWR(`/api/image/${path}`, fetcher)

  if (error) return <div> failed to load</div>
  if (!data) return <div>loading...</div>

  const style = {
    width,
  }

  return (
    <div style={style}>
      <img width="100%" src={URL.createObjectURL(data)} />

      <div>{children}</div>
    </div>
  )
}

export default Image
