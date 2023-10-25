import {pool} from './database.js';

class LibroController{
    async getAll(req, res){
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }
    async getOne(req, res){
        try{
        const id = req.body.id;
        const [result] = await pool.query(`SELECT * FROM libros WHERE id = ?`, [id]);
       if (result.length==0) {
            throw new error('libro no encontrado.');
        } res.json(result[0]); 
    }catch (error){
        console.log(error);
        res.status(404).json({error: 'id inexistente.'});
    }
          
    }

    async add(req, res){
        try{
        const libro = req.body;
        const [result] = await pool.query('INSERT INTO libros (nombre, autor, categoria, año_publicacion, ISBN) VALUES (?,?,?,?,?)',[libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.ISBN]);
        res.json({"id insertado": result.insertId});
        }catch (error){
            console.log(error);
            res.status(404).json({error:'Error al agregar libro, verifique los datos ingresados.'});
        }
    }

    async delete(req, res){
        try{
        const libro = req.body;
        const [result] = await pool.query('DELETE FROM libros WHERE ISBN=(?)',[libro.ISBN]);
        res.json({"Registros Eliminado": result.affectedRows});
    }catch (error){
        console.log(error);
        res.status(404).json({error: 'Error al eliminar libro ISNB inexistente.'});
    }
    }

    async update(req, res){
        try{
        const libro = req.body;
        const [result] = await pool.query(`UPDATE libros SET nombre=(?),autor=(?),categoria=(?),año_publicacion=(?),ISBN=(?) WHERE id=(?)`,[libro.nombre, libro.autor, libro.categoria, libro.año_publicacion, libro.ISBN, libro.id]);
        res.json({"Registros Actualizados": result.changedRows});
        }catch(error){
            console.log(error);
            res.status(500).json({error:'Error al actualizar libro.'});
        }
    }


}



export const libros = new LibroController();
