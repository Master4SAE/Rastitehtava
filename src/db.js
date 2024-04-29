import mysql from 'mysql2/promise';
import dotenv from 'dotenv';


dotenv.config();
const connectionToDb = async () => {
    try {
        // Create the connection to the database
        const connection = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
        });
        return connection;
      } catch (err) {
        console.error('Error connecting to the database:', err);
      }
}

const postData = async (data) => {
    const connection = await connectionToDb();

    try{
        const query = 'INSERT INTO blog_entries (title, content, author) VALUES (?, ?, ?)';
        const [results] = await connection.query(query, [data.title, data.content, data.author]);
        return results
    }
    catch (err){
        console.error('Error inserting into the database:', err);
        throw err;
    }
    // Close the connection
    finally {
        await connection.end(); 
      }
};
const getData = async ()=> {
  const connection = await connectionToDb();

  try{
    const query = 'SELECT * FROM blog_entries ';
    const [results] = await connection.query(query);
    return results
  }
  catch (err){
    console.error('Error fetching from the database:', err);
    throw err;
  }
// Close the connection
  finally {
    await connection.end(); 
  }

};
const getDataById = async (id)=> {
  const connection = await connectionToDb();

  try{
    const [results] = await connection.query('SELECT * FROM blog_entries WHERE id = ?', [id]);
    if (results === []){
      return false
    }
    return results
  }
  catch (err){
    console.error('Error fetching from the database:', err);
    throw err;
  }
// Close the connection
  finally {
    await connection.end(); 
  }

};
const putDataById = async (id, data)=> {
  const connection = await connectionToDb();

  try{
    const updateQuery = `
    UPDATE blog_entries
    SET title = ?, content = ?, author = ?
    WHERE id = ?;
    `;
    const [results] = await connection.query(updateQuery, [
    data.title,
    data.content,
    data.author,
    id
  ]);
  
  return results;
  }
  catch (err){
    console.error('Error fetching from the database:', err);
    throw err;
  }
// Close the connection
  finally {
    await connection.end(); 
  }

};
const deleteById = async (id) => {
  const connection = await connectionToDb();

  try{
    const deleteQuery = `
        DELETE FROM blog_entries
        WHERE id = ?;
    `;

    const [results] = await connection.query(deleteQuery, [id]);

    return results;
  }
  catch (err){
    console.error('Error fetching from the database:', err);
    throw err;
  }
// Close the connection
  finally {
    await connection.end(); 
  }

}

export {postData, connectionToDb, getData, getDataById, putDataById, deleteById }