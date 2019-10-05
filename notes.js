const fs = require(`fs`)
const chalk = require(`chalk`)

const listNotes = () => {
	const notes = loadNotes()

	console.log(chalk.inverse(`Your Notes\n`))

	notes.forEach((note) => {
		console.log(`${note.title}`)
	})
}

// reading specific readNotes

const readNote = (title) => {
	const notes = loadNotes()

	const desiredNote = notes.find((note) => {
		return note.title === title
	})

	if (!desiredNote) {
		console.log(chalk.redBright(`Note not found`))
	} else {
		console.log(chalk.inverse(desiredNote.title))
		console.log(desiredNote.body)
	}
}

// adding the note

const addNote = (title, body) => {
	const notes = loadNotes()

	const duplicateNote = notes.find((note) => {
		return note.title === title
	})

	if (!duplicateNote) {
		notes.push({
			title: title,
			body: body
		})
		saveNotes(notes)
		console.log(chalk.greenBright.bold(`New Note added !!!`))
	} else {
		console.log(chalk.redBright.bold(`Note title taken :( `))
	}
}

// removing the note

const removeNote = (title) => {
	const notes = loadNotes()
	const notesToKeep = notes.filter((note) => {
		return note.title !== title
	})
	if (notes.length > notesToKeep.length) {
		console.log(chalk.greenBright(`Note removed`))
	} else if (notes.length === notesToKeep.length) {
		console.log(chalk.redBright(`Note not found`))
	} else {
		console.log(chalk.redBright.bold(`Something went terribly wrong :(`))
	}
	saveNotes(notesToKeep)
}

// saving the note

const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes)
	fs.writeFileSync(`notes.json`, dataJSON)
}

// loading the notes

const loadNotes = () => {
	try {
		const dataBuffer = fs.readFileSync(`notes.json`)
		const dataJSON = dataBuffer.toString()
		return JSON.parse(dataJSON)
	} catch (e) {
		return []
	}
}

module.exports = {
	listNotes: listNotes,
	addNote: addNote,
	removeNote: removeNote,
	readNote: readNote
}
