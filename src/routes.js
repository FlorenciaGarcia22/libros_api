import {Router} from 'express';

import {libros} from './controller.js';

export const router = Router()

router.get('/libros',libros.getAll);
router.get('/libroId',libros.getOne);
router.post('/agregarLibro',libros.add);
router.delete('/eliminarLibro',libros.delete);
router.put('/actualizarLibro',libros.update);
