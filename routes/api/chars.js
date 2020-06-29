const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');

//importar el modelo de la estructura del usuario
const Char = require('../../models/Char');

// @route   POST api/chars
// @desc    Agregar Char
// @access  Public (no se necesita token autorizada)
router.post(
  '/',
  [
    check('name', 'Se necesita un nombre').not().isEmpty(),
    check('url', 'Porfavor escribe un URL valido').isURL(),
  ],
  async (req, res) => {
    //console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Destructuramos request.body para no repetirlo tanto
    const { name, url } = req.body;
    try {
      //Verificar si el personaje ya existe basado en el nombre
      let char = await Char.findOne({ name });
      if (char) {
        return res.status(400).json({
          errors: [{ msg: 'Ya existe un personaje con ese nombre' }],
        });
      }
      //Obtenemos los datos del usuario antes de guardarlos en la base de datos
      char = new Char({
        name,
        url: url === '' ? '' : normalize(url, { forceHttps: true }),
      });
      //Guardamos el char en el servidor
      await char.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error del servidor en char api');
    }
  }
);
// @route   GET api/chars
// @desc    obtener todos los chars
// @access  Public (No necesita token autorizada)
router.get('/', async (req, res) => {
  try {
    const chars = await Char.find();
    res.json(chars);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor en chars api');
  }
});

// @route   GET api/chars/:char_id
// @desc    obtener char en base a su id
// @access  Public (No necesita token autorizada)
router.get('/:char_id', async (req, res) => {
  try {
    const char = await Char.findOne({
      _id: req.params.char_id,
    });

    if (!char)
      return res.status(400).json({ msg: 'No existe un char para este id :c' });

    res.json(char);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      //si el error se debe a que el :char_id no es un id con formato valido
      return res.status(400).json({ msg: 'id del personaje invalido' });
    }
    res.status(500).send('Error del servidor en char api');
  }
});

module.exports = router;
