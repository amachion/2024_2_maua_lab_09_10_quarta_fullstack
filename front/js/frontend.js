const protocolo = 'http://'
const baseURL = 'localhost:3000'

async function prepararPagina() {
    const token = localStorage.getItem("token")
    const loginLink = document.querySelector('#loginLink')
    const cadastrarFilmeButton = document.querySelector('#cadastrarFilmeButton')
    if (token) {
        loginLink.innerHTML = 'Logout'
        cadastrarFilmeButton.disabled = false
    }
    else {
        loginLink.innerHTML = 'Login'
        cadastrarFilmeButton.disabled = true
    }
    obterFilmes()
} 

function listarFilmes (filmes) {
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
function exibirAlerta (seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    let alert = document.querySelector(seletor)
    alert.innerHTML = innerHTML
    alert.classList.add(...classesToAdd)
    alert.classList.remove(...classesToRemove)
    setTimeout(() => {
        alert.classList.remove(...classesToAdd)
        alert.classList.add(...classesToRemove)
    }, timeout)
}
function esconderModal (seletor, timeout) {
    setTimeout(() => {
        let modal = bootstrap.Modal.getInstance(
            document.querySelector(seletor)
        )
        modal.hide()
    }, timeout)
}
async function obterFilmes() {
    const filmesEndpoint = '/filmes'
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    const filmes = (await axios.get(URLcompleta)).data
    listarFilmes(filmes)
}
async function cadastrarFilme() {
    const filmesEndpoint = '/filmes'
    //montar a URL completa
    const URLcompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    //busca nos inputs o que foi digitado
    let tituloFilme = document.querySelector('#tituloFilme')
    let sinopseFilme = document.querySelector('#sinopseFilme')
    //traz os valores que foram digitados
    let titulo = tituloFilme.value
    let sinopse = sinopseFilme.value
    if (titulo && sinopse) {
        //limpa os campos de digitação
        tituloFilme.value = ""
        sinopseFilme.value = ""
        //enviando o filme novo e recebendo a base atualizada
        const filmes = (await axios.post(URLcompleta, {titulo, sinopse})).data
        listarFilmes(filmes)
    }
    else {
        exibirAlerta('.alert-filme', "Preencha todos os campos!", 
            ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000
        )
    }
}
async function cadastrarUsuario() {
    let usuarioCadastroInput = document.querySelector('#usuarioCadastroInput')
    let passwordCadastroInput = document.querySelector('#passwordCadastroInput')
    let usuarioCadastro = usuarioCadastroInput.value
    let passwordCadastro = passwordCadastroInput.value
    if (usuarioCadastro && passwordCadastro) {
        try {
            const cadastroEndpoint = '/signup'
            const URLcompleta = `${protocolo}${baseURL}${cadastroEndpoint}`
            await axios.post(
                URLcompleta,
                {login: usuarioCadastro, password: passwordCadastro}
            )
            usuarioCadastroInput.value = ""
            passwordCadastroInput.value = ""
            exibirAlerta('.alert-modal-cadastro', "Usuário cadastrado com sucesso!!!", ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
            esconderModal('#modalCadastro', 2000)
        }
        catch (e) {
            usuarioCadastroInput.value = ""
            passwordCadastroInput.value = ""
            exibirAlerta('.alert-modal-cadastro', "Não foi possível cadastrar!!!", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
            esconderModal('#modalCadastro', 2000)
        }
    }    
    else {
        exibirAlerta('.alert-modal-cadastro', "Preencha todos os campos!!!", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
    }
}
const loginUsuario = async () => {
    let usuarioLoginInput = document.querySelector('#usuarioLoginInput')
    let passwordLoginInput = document.querySelector('#passwordLoginInput')
    let usuarioLogin = usuarioLoginInput.value
    let passwordLogin = passwordLoginInput.value
    if (usuarioLogin && passwordLogin) {
        try {
            const loginEndpoint = '/login'
            const URLcompleta = `${protocolo}${baseURL}${loginEndpoint}`
            const response = await axios.post (
                URLcompleta,
                {login: usuarioLogin, password: passwordLogin}
            )
            //console.log (response)
            localStorage.setItem("token", response.data)
            usuarioLoginInput.value = ""
            passwordLoginInput.value = ""
            exibirAlerta('.alert-modal-login', "Login realizado com sucesso!", ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
            esconderModal('#modalLogin', 2000)
            const cadastrarFilmeButton = document.querySelector('#cadastrarFilmeButton')
            cadastrarFilmeButton.disabled = false
            const loginLink = document.querySelector('#loginLink')
            loginLink.innerHTML = 'Logout'
        }
        catch (e) {
            exibirAlerta('.alert-modal-login', 'Falha na autenticação!',
                ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
        }
    }
    else {
        exibirAlerta('.alert-modal-login', 'Preencha todos os campos!',
                    ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000
        )
    }
}