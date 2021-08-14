import path from 'path'
import { createReadStream, statSync } from 'fs'

export default function handler(req, res) {
  const { pid } = req.query

  const reqfile = pid.join('/')

  const fpath = path.join(process.cwd(), reqfile)
  const stat = statSync(fpath)

  const fext = reqfile.split('.').pop()

  const allowedMimetypes = {
    jpg: 'image/jpeg',
    png: 'image/png',
  }

  if (!(fext in allowedMimetypes)) {
    res.writeHead(404).end()
  }

  res.writeHead(200, {
    'Content-Type': allowedMimetypes[fext],
    'Content-Length': stat.size,
  })

  const readStream = createReadStream(fpath)

  readStream.on('open', function () {
    readStream.pipe(res)
  })
}
