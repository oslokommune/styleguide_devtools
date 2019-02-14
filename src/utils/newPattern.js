/* eslint no-undef: 0 */ // --> OFF
/* eslint no-console: 0 */ // --> OFF
import fs from 'fs'
import inquirer from 'inquirer'
import glob from 'glob'
import {atomicStructure} from './atomicStructure'
import {getBoilerplates} from './patternBoilerplates'

// object to be filled with input from user
let PATTERN = {
  type: '',
  group: '',
  name: ''
}

// init
typeQuestion()

// first question
function typeQuestion () {
  const question = [
    {
      message: 'What\'s your patterns type?',
      type: 'list',
      name: 'patternType',
      choices: ['atom', 'molecule', 'organism']
    }
  ]

  inquirer.prompt(question).then((answer) => {
    PATTERN.type = answer.patternType
    groupQuestion()
  })
}

// second question
function groupQuestion () {
  const question = [
    {
      message: 'What\'s your patterns group?',
      type: 'list',
      name: 'patternGroup',
      choices: getGroups(PATTERN.type)
    }
  ]

  inquirer.prompt(question).then((answer) => {
    if (answer.patternGroup === 'Make a new group') {
      newGroupQuestion()
    } else {
      PATTERN.group = answer.patternGroup
      nameQuestion()
    }
  })
}

// second question extended
function newGroupQuestion () {
  const question = [
    {
      message: 'What\'s your new group name?',
      type: 'input',
      name: 'groupName'
    }
  ]

  inquirer.prompt(question).then((answer) => {
    PATTERN.group = answer.groupName
    nameQuestion()
  })
}

// third question
function nameQuestion () {
  const question = [
    {
      message: 'What\'s your patterns name?',
      type: 'input',
      name: 'patternName'
    }
  ]

  inquirer.prompt(question).then((answer) => {
    PATTERN.name = answer.patternName
    makePattern()
  })
}

// make folders and files with boilerplate code
function makePattern () {
  if (!PATTERN.type || !PATTERN.group || !PATTERN.name ) {
    console.error('Please provide pattern type, group and name.')
    process.exit(1)
  }

  const groupDir = process.env.AD_PATTERN_PATH + PATTERN.type + 's/' + PATTERN.group + '/'
  const patternDir = groupDir + PATTERN.name + '/'
  const boilerplates = getBoilerplates(PATTERN.name)

  // make group folder if it does not exist
  if (!fs.existsSync(groupDir)) {
    console.log('Making new group folder ' + PATTERN.group + ' in ' + PATTERN.type + 's')
    fs.mkdirSync(groupDir)
  }

  // quit if pattern exist
  if (fs.existsSync(patternDir)) {
    console.error('This pattern already exists.')
    process.exit(1)
  }

  // make pattern folder
  fs.mkdirSync(patternDir)

  // fill pattern folder with files
  makePatternFiles(patternDir, boilerplates)
}

// helpers

function getGroups (patternType) {
  let atomicStruc = atomicStructure(
    glob.sync(process.env.AD_PATTERN_PATH + '**/*', {follow: true})
  )

  let groups = ['Make a new group']
  for (let item of atomicStruc[patternType + 's'].children) {
    groups.push(item.name)
  }

  return groups
}

function makePatternFiles (dir, boilerplates) {
  for (let item of boilerplates) {
    fs.writeFile(dir + PATTERN.name + '.' + item.fileExtension, item.content, (err) => {
      if (err) {
        throw err
      }
    })
  }

  console.log(PATTERN.type + ' ' + PATTERN.name + ' created.')
}

