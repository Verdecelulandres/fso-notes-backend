const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://andreslaverde_db_user:${password}@cluster0.io7wr4m.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// creating the collection using the schema as a singular string; the collection will be automatically names in lowercase plural of the schema name.
const Note = mongoose.model('Note', noteSchema)

// Using the model as a constructor we can create a document.
// const note = new Note({
//   content: 'Not an important note',
//   important: false,
// })

// The objects created with the model's constructor also inherit methods to interact with the DB .
// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })
// Stored documents can be retrieved using the find() method of our model.
Note.find({ important: false }).then(result => {
    result.forEach(note => {
        console.log(note);
    });
    mongoose.connection.close();
});