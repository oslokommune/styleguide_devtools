import { projectStructure } from './projectStructure.mjs'
import globby from 'globby'
import fs from 'fs'
import styleguide from '../styleguide.json'

(async () => {
  let time = new Date().getTime()
  const paths = await globby(
    [styleguide.internal.project_path + '**/*'],
    {
      onlyFiles: false
    }
  );
  const project = projectStructure(paths)
  fs.writeFileSync('./build/projectStructure.json', JSON.stringify(project))
  console.log("projectStructure build time: " + (new Date().getTime() - time) + "ms")
})();
