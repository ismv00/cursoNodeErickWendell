/**
 * 0 - Obter um usuário
 * 1 - Obter o número de telefone de um usuário a partir de seu id
 * 3 - Obter o endereoc do usuario pelo id
 */

//importamos um modulo interno do node.js
// esse modulo transforma callback em promise
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)


function obterUsuario() {
//quando der algum problema -> reject(erro)
//quando for sucesso -> resolve
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {

            // return reject(new Error('Deu ruim agora sério'))

            return resolve({
                id: 1,
                nome: "Aladin",
                dataNascimento: new Date()
            })
        }, 1000)
    })
    
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout( () => {
            return  resolve({
                telefone: '1199002',
                ddd: 11
            })
        }, 2000)

    })
}

function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000);
}


// 1 passo adcionar a palavra async na funcao -> automaticamente ela retornará uma promise
main()
async function main () {

    console.time('medida-promise')
    try {
        const usuario = await obterUsuario()
        //const telefone = await obterTelefone(usuario.id)
        //const endereco = await obterEnderecoAsync(usuario.id)

        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const endereco = resultado[1]
        const telefone = resultado[0]

        console.log(`
            Nome: ${usuario.nome},
            Telefone: ${telefone.ddd}, ${telefone.telefone},
            Endereco: ${endereco.rua}, ${endereco.numero}
        `)

        console.timeEnd('medida-promise')
    }
    catch(error) {
        console.error('deu ruim ', error)
    }
}
// const usuarioPromise = obterUsuario()
// // para manipular com sucesso usamos a função .then
// //para manipular erros, usamos o .catch


// usuarioPromise
//     .then(function (usuario) {
//         return obterTelefone(usuario.id)
//         .then(function resolverTelefone(result) {
//             return {
//                 usuario: {
//                     nome: usuario.nome,
//                     id: usuario.id
//                 },
//                 telefone: result
//             }
//         })
//     })
//     .then(function (resultado) {
//         const endereco = obterEnderecoAsync(resultado.usuario.id)
//         return endereco.then(function resolverEndereco(result) {
//             return {
//                 usuario: resultado.usuario,
//                 telefone: resultado.telefone,
//                 endereco: result
//             }
//         })
//     })
//     .then(function(resultado){
//         console.log(`
//             Nome: ${resultado.usuario.nome}
//             Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero},
//             Telefone: ${resultado.telefone.ddd}, ${resultado.telefone.telefone}
//         `)
//     })
//     .catch(function(error){
//         console.error('deu ruim', error)
//     })

// obterUsuario(function resolverUsuario(error, usuario) {
//     if(error) {
//         console.error('Deu ruim em usuário', error)
//         return;
//     }

//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if(error1) {
//             console.error('Deu ruim em Telefone', error)
//             return;
//         }
    
//     obterEndereco(usuario.id, function resolverEndenreco(error2, endereco){
//         if(error2) {
//             console.error('DEu ruim no endereco', error)
//             return;
//         }

//         console.log(`
//             Nome: ${usuario.nome},
//             Endereco: ${endereco.rua}, ${endereco.numero},
//             Telefone: ${telefone.ddd}, ${telefone.telefone}
//         `)
//     })
//     })
// });
