const fs = require(`fs`)
const notes = require(`./notes`)
const yargs = require(`yargs`)
const chalk = require(`chalk`)

//  create add command

yargs.command({
	command: `add`,
	describe: `Add a new note`,
	builder: {
		title: {
			alias: `T`,
			describe: `Note title`,
			demandOption: true,
			type: `string`
		},
		body: {
			alias: `B`,
			describe: `Note body`,
			demandOption: true,
			type: `string`
		}
	},
	handler: (argv) => {
		notes.addNote(argv.title, argv.body)
	}
})
//  create remove command

yargs.command({
	command: `remove`,
	describe: `Remove a note`,
	builder: {
		title: {
			alias: `T`,
			describe: `Note title to be deleted`,
			demandOption: true,
			type: `string`
		}
	},
	handler: (argv) => {
		notes.removeNote(argv.title)
	}
})
//  create list command

yargs.command({
	command: `list`,
	describe: `list all the notes`,
	handler: () => {
		notes.listNotes()
	}
})

//  create read command

yargs.command({
	command: `read`,
	describe: `display the notes`,
	builder: {
		title: {
			alias: `T`,
			describe: `Note to be read`,
			demandOption: true,
			type: `string`
		}
	},
	handler: (argv) => {
		notes.readNote(argv.title)
	}
})
yargs.parse()
// console.log(yargs.argv)
