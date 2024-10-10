const express =require('express');
const bodyparser=require('body-parser')
const mongoose=require('mongoose'); //import monges

const app=express();

const PORT=3000;
const DB_URL="mongodb://localhost:27017/shop"; //mongodblink
app.use(bodyparser.json());


//Define scheme
const bookScheme= new mongoose.Schema({
    title:String,
    author:String,
    publishDate: String,
})
//model

const Book= mongoose.model("Book",bookScheme);

//connect to mongodb
mongoose.connect(DB_URL,{}).
then(()=> console.log("Mongoose is connect")).
catch((err)=>console.log("Mongoose is not connect",err)
)

//post method
app.post('/book', async (req,res)=>{
    const book= new Book(req.body);

    try {
        const savebook = await book.save()
        res.status(201).send(savebook)
    } catch (error) {
        res.status(404).send(error.message)
        
        
    }
})
// get by id method
app.get('/book/:id', async (req,res)=>{

    try {
        const book = await Book.findById(req.params.id);
        if(book){
            res.status(201).send(book)
        }else{
            res.status(404).send("book not foung")
        }
        
    } catch (error) {
        res.status(404).send(error.message)
   
    }
})
// update method
app.put('/book/:id', async (req,res)=>{

    try {
        const book = await Book.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
        });
        if(book){
            res.status(201).send(book)
        }else{
            res.status(404).send("book not foung")
        }
        
    } catch (error) {
        res.status(404).send(error.message)
   
    }
})

// delete method

app.delete('/book/:id', async (req,res)=>{

    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if(book){
            res.status(201).send({message: "book deleted sucessfully"})
        }else{
            res.status(404).send("book not foung")
        }
        
    } catch (error) {
        res.status(404).send(error.message)
   
    }
})
// get method

app.get('/book', async (req,res)=>{

    try {
        const book = await Book.find()
        res.status(201).send(book)
    } catch (error) {
        res.status(404).send(error)
   
    }
})

app.listen(PORT,()=>{
    console.log(`surver is connect:${PORT}`)
})
