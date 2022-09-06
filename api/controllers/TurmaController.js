const database = require('../models')

class TurmaController {
    static async pegaTodasAsTurmas(req, res) {
        try {
            const todasAsTurmas = await database.Turmas.findAll()
            return res.status(200).json(todasAsTurmas)
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async pegaUmaTurma(req, res) { // o static indica que podemos chamar esse metodo sem instacialo(sem criar um new Turma controller)
        const { id } = req.params
        try {
            const umaTurma = await database.Turmas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(umaTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async criaTurma(req, res) {
        const novaTurma = req.body
        try {
            const novaTurmaCriada = await database.Turmas.create(novaTurma)
            return res.status(200).json(novaTurmaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async atualizaTurma(req, res) {
        const novaInfos = req.body
        const { id } = req.params
        try {
            await database.Turmas.update(novaInfos, { where: { id: Number(id) } })
            const TurmaAtualizada = await database.Turmas.findOne({ where: { id: Number(id) } })
            return res.status(200).json(TurmaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async ApagaTurma(req, res) { // o static indica que podemos chamar esse metodo sem instacialo(sem criar um new Turma controller)
        const { id } = req.params
        try {
            await database.Turmas.destroy({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json({ mensagem: `id ${id} deletado!` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TurmaController