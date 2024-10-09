const protocolo = 'http://'
const baseURL = 'localhost:3000'
const filmesEndpoint = '/filmes'

async function obterFilmes() {
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    const filmes = (await axios.get(URLcompleta)).data
    
    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    for (let filme of filmes) {
        let linha = corpoTabela.insertRow(0)
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
    console.log(filmes)
}

async function cadastrarFilme() {
    //montar a URL completa
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    //busca nos inputs o que foi digitado
    let tituloFilme = document.querySelector('#tituloFilme')
    let sinopseFilme = document.querySelector('#sinopseFilme')
    //traz os valores que foram digitados
    let titulo = tituloFilme.value
    let sinopse = sinopseFilme.value
    //limpa os campos de digitação
    tituloFilme.value = ""
    sinopseFilme.value = ""
    //enviando o filme novo e recebendo a base atualizada
    const filmes = (await axios.post(URLcompleta, {titulo, sinopse})).data
    //atualizar a tabela
    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    //1 limpa
    corpoTabela.innerHTML = ""
    //2 preenche a tabela com a base atualizada
    for (let filme of filmes) {
        let linha = corpoTabela.insertRow(0)
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
}