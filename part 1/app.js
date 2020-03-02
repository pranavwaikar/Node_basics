/*
This file contains
1. basic hello world
2. export function and data from another file
3. even emitter module
4. a class defination
5. readline module
6. file system module - all file realated ops
7. file system module- all folder related ops
8. using streams- readstream and writestream - to copy files, to zip and unzip files & oening large txt files
9. class,object and its array with setter/getter methods
tutorial- https://www.youtube.com/watch?v=RLtyhwFtXQA  00:00:00 - 01:12:00
*/

const sum = require('./tuts.js');
console.log("Hello world!");
console.log(sum);
console.log(sum.sum(1,1));

//eventemitter module
const EventEmitter = require('events');
var eventemitter = new EventEmitter();

eventemitter.on('tutorial',()=>{
	console.log('tutorial event occured. this is its handler.');
});

eventemitter.on('addn',(num1,num2)=>{
	console.log(num1+num2);
});

eventemitter.emit('tutorial');
eventemitter.emit('addn',2,2);

class person extends EventEmitter {
	constructor(name){
		super();
		this._name = name;
	}

	get name() {
		return this._name;
	}
}

let pranav = new person('pranav');
pranav.on('name',()=>{
	console.log('My name is - '+ pranav.name);
});

pranav.emit('name');

let pratiksha = new person('pratiksha');
pratiksha.on('name',()=>{
	console.log('My name is - '+ pratiksha.name);
});

pratiksha.emit('name');

//readline module 
const readline = require('readline');
const rl = readline.createInterface({input:process.stdin, output: process.stdout});

let num1 = Math.floor(Math.random()*10+1);
let num2 = Math.floor(Math.random()*10+1);
let ans = num1+num2;

rl.question(`What is ${num1} + ${num2} ?`,(userInput)=>{
	if(userInput.trim() == ans) {
		rl.close();
	} else {
		rl.setPrompt('Incorrect response! try again!!');
		rl.prompt();

		rl.on('line',(userInput)=>{
			if (userInput.trim() == ans) {
				rl.close();
			} else {
				rl.setPrompt(`Your answer ${userInput} is wrong`);
				rl.prompt();
			}
		})
	}
});

rl.on('close',()=>{
	console.log('Correct answer! Closing the readline via eventemitter.');
});

//file system module

//part 1 - all file related ops
const fs = require('fs');
// 1. create the file
fs.writeFile("example.txt","This is my first file via Node.js.",(err)=>{
	if(err)
		console.log(err);
	else{
		console.log('File created!');
		fs.readFile('example.txt','utf8',(err,file)=>{
			if (err) 
				console.log(err);
			else{
				console.log(file);

				fs.rename('example.txt','example2.txt',(err)=>{
					if(err)
						console.lgo(err);
					else{
						console.log('File renamed successfully');

						fs.appendFile('example2.txt','Just append this man!',(err)=>{
							if(err)
								console.log(err);
							else {
								console.log('successfully appended!');
								fs.unlink('example2.txt',(err)=>{
									if(err)
										console.log(err);
									else
										console.log('successfully deleted');
								});
							}
						});
					}
				});
			}
			
		});
	}
});

// part 2 - all folder related apps

fs.mkdir('tuts',(err)=>{
	if(err)
		console.log(err);
	else {
		console.log('folder created!');
		fs.rmdir('tuts',(err)=>{
			if(err)
				console.log(err);
			else {
				console.log('folder deleted!');
			}
		});
	}
});

fs.mkdir('tut',(err)=>{
	if(err)
		console.log(err);
	else {
		console.log('folder created.');
		fs.writeFile('./tut/example.txt','this is example file',(err)=>{
			if (err)
				console.log(err);
			else {
				console.log('example.txt created!');
				fs.writeFile('./tut/example2.txt','this is example2 file',(err)=>{
					if(err)
						console.log(err);
					else {
						console.log('example2.txt is created!');

						fs.readdir('./tut',(err,files)=>{
							if(err)
								console.log(err);
							else {
								console.log('readdir files- '+ files);

								for(let file of files)
								{
									fs.unlink('./tut/'+file,(err)=>{
										if(err)
											console.log(err);
										else {
											console.log('deleted file:'+ file);
											fs.rmdir('tut',(err)=>{
												if(err)
													console.log(err);
												else {
													console.log('folder deleted!');
												}
											});
										}
									});
								}
							}
						});
					}
				});
			}
		});
	}
});

//stream modules

const readstream = fs.createReadStream('./abc.txt','utf8');
const writestream = fs.createWriteStream('./abc2.txt');
//for a very large file, readFile call says- buffer is small error.
//use streams to overcome this error.

readstream.on('data',(chunk)=>{
	writestream.write(chunk);
});

// we can use pipes to do this also
readstream.pipe(writestream);

//create zip files and unzip files
const zlib = require('zlib');
const gzip = zlib.createGzip();

const reads = fs.createReadStream('abc.txt','utf8');
const writes = fs.createWriteStream('abc.gz');
reads.pipe(gzip).pipe(writes);

const gunzip = zlib.createGunzip();
const readst = fs.createReadStream('mygz.gz');
const writest = fs.createWriteStream('mygz.txt');
readst.pipe(gunzip).pipe(writest);

//class object and array also setter getter methods
class student
{
	constructor(name,id)
	{
		this.name = name;
		this.id = id;
	}

	get student()
	{
		return { name:this.name,id:this.id };
	}

	set student(id)
	{
		this.id = id;
	}
}
var bc=[];
var pranav = new student('pranav',70);
console.log(JSON.stringify(pranav));
bc.push(pranav);
console.log(bc);

//using setter and getter (Dont use function call, use it like a property)
pranav.id = 20; 				//setter demo
console.log(pranav.student);	//getter demo