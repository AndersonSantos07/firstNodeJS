const express = require('express')
const app = express()
const uuid = require('uuid')
const port = 3002
app.use(express.json())

/*crie 4 rotas de usuarios a primeira vai mostrar os usuarios criados
a segunda vai criar um usuário, a terceira atualizar um usuário e a quarta deleter um
usuário */

//array que armazena os usuários

const users = []

//criando o primeiro middleware que faz uma validação do ID

const checkUserId = (req, res, next) => {


    const { id } = req.params

    const index = users.findIndex(user => user.id === id)
    if (index < 0) {
        return res.status(404).json({ error: "Id/User Not Found" })
    }

    req.indexUser = index
    req.idUser = id

    next()
}


//Rota que mostra os usuários criados ou nada.

app.get('/users', (req, res) => {


    return res.json(users)
})

//Rota que cria os usuários

app.post('/users', (req, res) => {
    const { name, age } = req.body
    const user = { id: uuid.v4(), name, age }
    users.push(user)

    return res.status(201).json(user)
})

//Rota que atualza os dados do usuário (route params)

app.put('/users/:id', checkUserId, (req, res) => {
    const { name, age } = req.body
    const id = idUser
    const index = req.indexUser
    const updateUser = { id, name, age }
    users[index] = updateUser
    return res.status(202).json(updateUser)
})

//Rota que deleta o usuário utilizamos também route params
app.delete('/users/:id', checkUserId, (req, res) => {
    const index = req.indexUser

    users.splice(index, 1)

    return res.status(204)

})









app.listen(port, () => console.log('O servidor está rodando Anderson!'))
