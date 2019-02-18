const express =require('express');
const bodyParser = require('body-parser');
const Note = require('./models/notes');
const app=express();
const mongoose=require('mongoose');
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://johnny:rFbi6OENVCMf6JL7@cluster0-2zf6l.mongodb.net/test?retryWrites=true')
    .then(()=>{
  console.log('successfuly connected');
  })
    .catch((error)=>{
  console.log('unable to connect');
  console.error(error);
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});



//return all notes from DB
app.get('/api/notes', (req, res, next) => {
  Note.find().then(
    (note) => {
      res.status(200).json(note);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
});

// add notes to the DB
app.post('/api/notes', (req, res, next) => {
  const note = new Note({
  
    title: req.body.title,
    description: req.body.description,
    datecreated: req.body.datecreated,
    dateupdated: req.body.dateupdated,
    
  });
  note.save().then(
    () => {
      res.status(201).json({
        message: 'Notes saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        message: 'Unsuccessfully to save!',
        error: error
      });
    }
  );
});


//return single Note from DB
app.get('/api/notes/:id', (req, res, next) => {
  Note.findOne({
    _id: req.params.id
  }).then(
    (note) => {
      res.status(200).json(note);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
});



//modifying notes
app.put('/api/notes/:id', (req, res, next) => {
  const note = new Note({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    datecreated: req.body.datecreated,
    dateupdated: req.body.dateupdated,
    userId: req.body.userId
  });
  Note.updateOne({_id: req.params.id}, note).then(
    () => {
      res.status(201).json({
        message: 'Note  updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});

//deletes a note  from DB
app.delete('/api/notes/:id', (req, res, next) => {
  Note.deleteOne({
    _id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Deleted! successfully'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
});


module.exports=app;
