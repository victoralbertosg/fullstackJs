const { Router } = require('express');
const router = Router();
const {unlink}=require('fs-extra'); //extensiond e file system para administrr archivos
const path=require('path'); //rutas

const Book = require('../models/Book');

router.get('/', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

router.post('/',async(req,res)=>{
    
    const {title,author,isbn}=req.body;
    const imagePath='/upload/'+req.file.filename;
    const newbook=new Book ({title,author,isbn,imagePath})
    await newbook.save();
    res.json({message:'Book saved'});  
})
router.delete('/:id',async(req,res)=>{
    const book=await Book.findByIdAndDelete(req.params.id);
    unlink(path.resolve('./backend/public'+book.imagePath));
    res.json({message:'book deleted'});
})
module.exports = router;
