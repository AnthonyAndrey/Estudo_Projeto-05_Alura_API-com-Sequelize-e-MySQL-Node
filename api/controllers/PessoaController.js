const database = require('../models') //por padrão o javascript ja procura o index da página

class PessoaController {
    static async pegaTodasAsPessoas(req, res) { // o static indica que podemos chamar esse metodo sem instacialo(sem criar um new pessoa controller)
        try {
            const TodasAsPessoas = await database.Pessoas.findAll()
            return res.status(200).json(TodasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaPessoa(req, res) { // o static indica que podemos chamar esse metodo sem instacialo(sem criar um new pessoa controller)
        const { id } = req.params
        try {
            const umaPessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async atualizaPessoa(req, res) {
        const novaInfos = req.body
        const { id } = req.params
        try {
            await database.Pessoas.update(novaInfos, { where: { id: Number(id) } })
            const pessoaAtualizada = await database.Pessoas.findOne({ where: { id: Number(id) } })
            return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async ApagaPessoa(req, res) { // o static indica que podemos chamar esse metodo sem instacialo(sem criar um new pessoa controller)
        const { id } = req.params
        try {
            await database.Pessoas.destroy({
                where: {
                    id: Number(id)
                }
            })
            return res.status(200).json({ mensagem: `id ${id} deletado!` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            const umaMatricola = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: estudanteId
                }
            })
            return res.status(200).json(umaMatricola)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async criaMatricula(req, res) {
        const { estudanteId } = req.params
        const novaMatricula = {...req.body, estudante_id: Number(estudanteId) }
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async atualizaMatricula(req, res) {
        const novaInfos = req.body
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.update(novaInfos, {
                    where: {
                        id: Number(matriculaId),
                        estudante_id: estudanteId
                    }
                }) // o método update não retorna valores, so retorna 0 ou 1 , por isso retornamos o valor que foi alterado
            const matriculasAtualizada = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: estudanteId
                }
            })
            return res.status(200).json(matriculasAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async ApagaMatricula(req, res) { // o static indica que podemos chamar esse metodo sem instacialo(sem criar um new pessoa controller)
        const { estudanteId, matriculaId } = req.params
        try {
            await database.Matriculas.destroy({
                where: {
                    id: Number(matriculaId),
                    estudante_id: estudanteId
                }
            })
            return res.status(200).json({ mensagem: `id ${matriculaId} deletado!` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}


module.exports = PessoaController