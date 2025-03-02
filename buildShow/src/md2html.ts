import { marked } from 'marked'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path, { posix as pathPosix } from 'node:path'
import { fileURLToPath } from 'node:url'

export async function resolveMd(name: string) {

  const currentFilePath = fileURLToPath(import.meta.url)
  const mdDir = path.resolve(currentFilePath, '../MD')
  const componentDir = path.resolve(mdDir, `${name}/`)

  // copy target
  const targetImageDir = path.resolve(currentFilePath, '../../../react-components/public/MD/images')
  const targetMdDir = path.resolve(currentFilePath, '../../../react-components/public/MD')

  // md file content
  const componentMdPath = path.resolve(mdDir, `${name}/${name}.md`)
  if (!existsSync(componentMdPath)) {
    console.warn(`There is no ${componentMdPath} exists.`)
    return
  }
  const componentContent = readFileSync(componentMdPath).toString()
  marked.use({
    renderer: {
      image: function ({ href, title, text }) {
        const image = readFileSync(path.resolve(componentDir, href))
        const imageName = `${name}_` + path.basename(href)
        writeFileSync(path.resolve(targetImageDir, imageName), image)

        const newSrc = pathPosix.join('/MD/images', imageName)

        return `<img src="${newSrc}" alt="${text}" title="${title || ''}" />`
      }
    }
  })
  const html = await marked.parse(componentContent)
  writeFileSync(path.resolve(targetMdDir, name) + '.html', html)
}



