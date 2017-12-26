const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Storage engine
const storage = multer.diskStorage({
    destination : function(req,file,cb){
      cb(null, './public/uploads');
    },
    filename : function(req,file,cb){
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
  storage : storage
}).single('File');

// View Engine
app.set('view engine','ejs');

// Middleware
app.use(express.static('./public'));

// Server Init
app.listen(3000, function(req,res){
    console.log('server->on');
});

app.get('/', function(req,res){
   res.render('index');
});

app.get('/index',function(req,res){
  res.render('index');
});

app.post('/uploads',function(req,res){
    upload(req,res,function(err){
        if(err) {
           res.render('errorpage',{ msg : err});
        }
        else if (req.file === undefined) {
            res.render('errorpage',{ msg : 'No file uploaded'});
        }
        else {
           res.render('file_info',{ info : req.file });
        }
    });
});
