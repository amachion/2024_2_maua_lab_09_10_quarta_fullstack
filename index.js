// console.log("hello, nodeJS")
const express = require('express')
const app = express()
app.use(express.json())

// GET http://localhost:3000/oi
app.get('/oi', (req, res) => {
    res.send('oi')
})

let filmes = [
    {
        titulo: "Dirty Dancing",
        sinopse: "Na esperança de curtir sua juventude, Frances fica decepcionada ao descobrir que vai passar o verão de 1963 com os pais em um resort na sonolenta região de Catskills. A sua sorte muda quando ela conhece o instrutor de dança do resort, Johnny. Quando ele a coloca como sua nova parceira de dança, os dois acabam se apaixonando."
    },
    {
        titulo: "Grease",
        sinopse: "Na Califórnia de 1959, a boa moça Sandy e o metido Danny se apaixonam e aproveitam um verão inesquecível na praia. Quando voltam às aulas, eles descobrem que frequentam a mesma escola. Danny lidera a gangue dos T-Birds, um grupo que gosta de jaquetas de couro e muito gel no cabelo, e Sandy passa tempo com as Pink Ladies, lideradas pela firme e sarcástica Rizzo. Quando os dois se reúnem, Sandy percebe que Danny não é o mesmo por quem se apaixonou, e ambos precisam mudar caso queiram ficar juntos."
    }
]

app.get("/filmes", (req, res) => {
    res.json(filmes)
})

app.post("/filmes", (req, res) => {
    //capturar o que o usuário enviar 
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    const filme = {titulo: titulo, sinopse: sinopse}
    filmes.push(filme)
    res.json(filmes)
})

app.listen(3000, () => console.log("server up and running"))