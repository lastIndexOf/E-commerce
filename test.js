const
  path =  require('path'),
  fs   =  require('fs')

const readdir = dir => new Promise((resolve, reject) => {
  fs.readdir(dir, (err, dirs) => {
    if (err) reject(err)
    else {
      resolve(dirs)
    }
  })
})

;(async () => {
  let dirs = await readdir(path.join(__dirname, 'node_modules'))
})()
