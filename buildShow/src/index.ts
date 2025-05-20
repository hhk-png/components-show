import path from "node:path"
import componentsList from "./componentsList.ts"
import type { FileTree } from "./types.d.ts"
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { resolveMd } from "./md2html.ts"
import { codeToHtml } from "shiki"

function trimFirstDot(str: string) {
  if (str[0] === '.') {
    return str.slice(1)
  }
  return str
}

async function getFileTree(dirPath: string, res: FileTree) {
  for (const fileName of readdirSync(dirPath)) {
    const filePath = path.resolve(dirPath, fileName)
    if (statSync(filePath).isDirectory()) {
      const children: FileTree = []
      res.push({
        type: 'dir',
        name: fileName,
        path: filePath,
        children
      })
      await getFileTree(filePath, children)
    } else {
      const ext = path.extname(fileName)
      const fileContent = readFileSync(filePath, 'utf-8')

      // code highlight
      const html = await codeToHtml(fileContent, {
        lang: trimFirstDot(ext),
        theme: 'vitesse-dark'
      })
      const replaced = html.replace(/<pre[^>]*>/g, '<pre>')

      res.push({
        type: 'file',
        name: fileName,
        ext,
        path: filePath,
        content: replaced,
      })
    }
  }
}

async function saveComponents(componentsPath: string, targetDir: string) {
  const res: Record<string, FileTree> = {}
  for (const compName of componentsList) {
    const componentPath = path.resolve(componentsPath, compName)
    if (existsSync(componentPath)) {
      res[compName] = []
      await getFileTree(componentPath, res[compName])
      writeFileSync(path.resolve(targetDir, `${compName}.json`), JSON.stringify(res[compName]))
    } else {
      console.warn(`Component ${compName} not found at ${componentPath}`)
    }
  }
  return res
}

// transform vue component Dir to json file
const currFilePath = fileURLToPath(import.meta.url)
const vueComponentsDir = path.resolve(currFilePath, '../../../vue-components/src/components-show')
const targetVueJsonDir = path.resolve(currFilePath, '../../../react-components/public/Vue')
mkdirSync(targetVueJsonDir, { recursive: true })
saveComponents(vueComponentsDir, targetVueJsonDir)

// transform react component Dir to json file
const reactComponentsDir = path.resolve(currFilePath, '../../../react-components/src/components-show')
const targetReactJsonDir = path.resolve(currFilePath, '../../../react-components/public/React')
mkdirSync(targetReactJsonDir, { recursive: true })
saveComponents(reactComponentsDir, targetReactJsonDir)

// blog
const targetMDDir = path.resolve(currFilePath, '../../../react-components/public/MD/images')
mkdirSync(targetMDDir, { recursive: true })
componentsList.forEach(resolveMd)

// save components list
const componentsListSavePath = path.resolve(currFilePath, '../../../react-components/public/componentsList.json')
writeFileSync(componentsListSavePath, JSON.stringify(componentsList))

console.log('All succsess!')
