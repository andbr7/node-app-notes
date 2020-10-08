const chalk = require('chalk')
const fs = require('fs')


const addNote = (title, body)=>{
   const notes= loadNotes()
   const duplicateNote = notes.find((note)=> 
      note.title === title)

   if (!duplicateNote) {
   notes.push({
      title: title,
      body: body
   })
   saveNotes(notes)
   console.log(chalk.green.inverse('New note added!'))
   }
   else{
      console.log(chalk.red.inverse('Note title taken!'))
   }
}

const removeNote =  (title) => {
   const notes= loadNotes()
   const notesToKeep = notes.filter((note) =>
      note.title !== title
   )
   if (notes.length > notesToKeep.length){
      console.log(chalk.green.inverse('Note removed!'))
      saveNotes(notesToKeep)
   }
      else {
      console.log(chalk.red.inverse('No note found!'))
      } 
}


const listNotes = () => {
    const notes= loadNotes()

    console.log(chalk.blueBright('Your notes:'))

    notes.forEach((note) => {
      console.log(chalk.yellow(note.title))

    } )
    

}

const readNote = (title) =>{
   const notes= loadNotes()
   const searchingNote = notes.find((note)=> 
      note.title === title)
   if(searchingNote) {
      console.log(chalk.greenBright(searchingNote.title))
      console.log(searchingNote.body)
   }
   else{
      console.log(chalk.red.inverse('Error, note not find!'))
   }

}

const saveNotes =  (notes) => {
   const dataJSON = JSON.stringify(notes)
   fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () =>{
   try {
      const dataBuffer = fs.readFileSync('notes.json')
      const dataJSON = dataBuffer.toString()
      return JSON.parse(dataJSON)
   } catch (e) {
      return []
   } 
}

module.exports = {
   addNote: addNote,
   removeNote: removeNote,
   listNotes: listNotes,
   readNote: readNote
}