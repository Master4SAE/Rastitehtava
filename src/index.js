import express from 'express';
import { postData, getData, getDataById, putDataById, deleteById } from './db.js';



const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to my RE API!');

});

// Route to handle POST requests
app.post('/blog-entries', (req, res) => {

  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({
      message: 'Bad Request: Missing required fields',
      receivedData: req.body,
    });
  };
  if (postData(req.body)){
    return res.status(201).json({
      message: 'Blog entry created successfully'
    });
  };
});

// GET /blog-entries
app.get('/blog-entries', async(req,res) => {

  const data = await getData()
  res.status(200).json({
    message: '200 OK on success',
    data: data
  });
});
// GET /blog-entries/{id}
app.get('/blog-entries/:id', async(req,res) => {
  const id = req.params.id

  const data = await getDataById(id);
  if (data.length === 0){
    return res.status(400).json({
      message: 'Invalid id'
    });
  }
  
  res.status(200).json({
    message: '200 OK on success',
    data: data
  });
});

 // PUT /blog-entries/{id}

app.put('/blog-entries/:id', async(req,res) => {
  const id = req.params.id

  if (isNaN(id)) {
    return res.status(400).json({
      message: 'Bad Request'
    });
  };

  const data = await putDataById(id, req.body);
  if (data.length === 0){
    return res.status(404).json({
      message: 'Invalid id. Blog Not Found'
    });
  }
  
  res.status(200).json({
    message: '200 OK on success',
    data: data
  });
});
// DElte 
app.delete('/blog-entries/:id', async (req, res) => {
  const id = req.params.id

  if (isNaN(id)) {
    return res.status(400).json({
      message: 'Bad Request'
    });
  };

  const data = await deleteById(id);

  if (data.affectedRows === 0 && data.changedRows === 0){
    return res.status(404).json({
      message: 'Invalid id. Blog Not Found'
    });
  };
  res.status(200).json({
    message: '200 OK on success',
    data: data
  });


})

  // Start the server
  app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
