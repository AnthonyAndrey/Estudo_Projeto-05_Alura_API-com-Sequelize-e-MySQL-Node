const { Router } = require('express') //recurso de rotas do express
const TurmaController = require('../controllers/turmaController')

const router = Router()

router.get('/turmas', TurmaController.pegaTodasAsTurmas)
router.get('/turmas/:id', TurmaController.pegaUmaTurma)
router.post('/turmas', TurmaController.criaTurma)
router.put('/turmas/:id', TurmaController.atualizaTurma)
router.delete('/turmas/:id', TurmaController.ApagaTurma)

module.exports = router