import { marked } from 'marked'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import path, { posix as pathPosix } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHighlighter } from 'shiki'

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
    writeFileSync(path.resolve(targetMdDir, name) + '.html', '<center><h1>No blog.</h1></center>')
    return
  }
  const componentContent = readFileSync(componentMdPath).toString()

  // shiki
  const highlighter = await createHighlighter({
    themes: ['slack-dark', 'vitesse-dark'],
    langs: ['tsx', 'typescript', 'javascript', 'vue'],
  })

  // marked extension
  marked.use({
    renderer: {
      image: function ({ href, title, text }) {
        const image = readFileSync(path.resolve(componentDir, href))
        const imageName = `${name}_` + path.basename(href)
        writeFileSync(path.resolve(targetImageDir, imageName), image)

        const newSrc = pathPosix.join('/components-show/MD/images', imageName)

        return `<img src="${newSrc}" alt="${text}" title="${title || ''}" />`
      },
      code: function ({ text, lang }) {
        const html = highlighter.codeToHtml(text, {
          lang: lang!,
          theme: 'vitesse-dark',
        })
        return html
      },
      link: function ({ href, title, text }) {
        return `<a href="${href}" title="${title || ''}" target="_blank">${text}</a>`
      }
    }
  })

  const html = await marked.parse(componentContent)
  writeFileSync(path.resolve(targetMdDir, name) + '.html', html)
}



