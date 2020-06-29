const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const Match = require('../../models/Match');

// @route   POST(o Update si ya existe) api/matchs/
// @desc    agregar/actualizar match
// @access  Public
//como usaremos doble middleware (auth y check) los ponemos entre corchetes [auth, [check bla bla ]], () =>
router.post(
  '/',
  [
    check('players', 'se requieren players').not().isEmpty(),
    check('winnerId', 'se requiere el id del ganador').not().isEmpty(),
    check('userId', 'se requiere el id del usuario').not().isEmpty(),
  ],
  async (req, res) => {
    //console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Destructuramos request.body para no repetirlo tanto
    const { players, winnerId, userId } = req.body;
    try {
      //Verificar si la match ya existe basado en player id y players

      //Obtenemos los datos del usuario antes de guardarlos en la base de datos
      let match = new Match({
        players,
        winnerId,
        userId,
      });
      //Guardamos el match en el servidor
      await match.save();
      res.status(200).json(match);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Error del servidor en match api' });
    }
  }
);

// @route   GET api/matchs
// @desc    obtener todas las matchs
// @access  Public (No necesita token autorizada)
router.get('/', async (req, res) => {
  try {
    const matchs = await Match.find();
    res.json(matchs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor :c');
  }
});

// @route   DELETE api/matchs/:id
// @desc    Delete match by id
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    if (!match) {
      return res.status(404).json({ msg: 'La Match no existe unu' });
    }
    await match.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Match not found (id invalido)' });
    }
    res.status(500).send('Server Error en matchs api');
  }
});

// @route   PUT api/matchs/:match_id
// @desc    darle like a un post
// @access  Private (Necesita token autorizada)
router.put('/:match_id', async (req, res) => {
  try {
    const response = await Match.findByIdAndUpdate(
      req.params.match_id,
      req.body
    );
    res.status(200).json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor en match api (put)');
  }
});

module.exports = router;
