const database = require('../models') //por padrão o javascript ja procura o index da página

class NivelController {
    static async pegaTodasOsNiveis(req, res) { // o static indica que podemos chamar esse metodo sem instacialo(sem criar um new Nivel controller)
        try {
            const TodasAsNiveis = await database.Niveis.findAll()
            return res.status(200).json(TodasAsNiveis)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmNivel(req, res) { // o static indica que podemos chamar esse metodo sem instacialo(sem criar um new Nivel controller)
        const { id } = req.params
        try {
            const umaNivel = await database.Niveis.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(umaNivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async criaNivel(req, res) {
        const novaNivel = req.body
        try {
            const novaNivelCriada = await database.Niveis.create(novaNivel)
            return res.status(200).json(novaNivelCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async atualizaNivel(req, res) {
        const novaInfos = req.body
        const { id } = req.params
        try {
            await database.Niveis.update(novaInfos, { where: { id: Number(id) } })
            const NivelAtualizada = await database.Niveis.findOne({ where: { id: Number(id) } })
            return res.status(200).json(NivelAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async ApagaNivel(req, res) { // o static indica que podemos chamar esse metodo sem instacialo(sem criar um new Nivel controller)
        const { id } = req.params
        try {
            await database.Niveis.destroy({
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

module.exports = NivelController