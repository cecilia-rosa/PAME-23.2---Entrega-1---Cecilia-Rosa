// criando as 5 classes: usuario, propriedade, reserva, anuncio e sistema

// classe usuario com os atributos id unico, nome, endereco de contato e historico de reservas
class Usuario {
    constructor(id, nome, enderecoContato, historicoReservas) {
      this.id = id;
      this.nome = nome;
      this.enderecoContato = enderecoContato;
      this.historicoReservas = historicoReservas;
      this.senha = senha;
    }
  }

class Administrador extends Usuario {
    constructor(id, nome, enderecoContato, historicoReservas, senha, codigoPermissao) {
      super(id, nome, enderecoContato, historicoReservas, senha);
      this.codigoPermissao = codigoPermissao;
    }
  }

class Proprietario extends Usuario {
    constructor(id, nome, enderecoContato, historicoReservas, senha, propriedade) {
      super(id, nome, enderecoContato, historicoReservas, senha);
      this.propriedade = propriedade;
    }
  }


// classe propriedade com os atributos id unico, nome, endereco, capacidade de hospedes, numero de quartos, preco por noite e disponibilidade
class Propriedade {
    constructor(id, nome, endereco, capacidadeHospedes, numQuartos, precoPorNoite, disponibilidade) {
      this.id = id;
      this.nome = nome;
      this.endereco = endereco;
      this.capacidadeHospedes = capacidadeHospedes;
      this.numQuartos = numQuartos;
      this.precoPorNoite = precoPorNoite;
      this.disponibilidade = disponibilidade;
    }
  }

// classe reserva com os atributos id unico, id da propriedade, id do usuario, data de check in, data de check out, valor total da reserva e status de pagamento
class Reserva {
    constructor(id, propriedadeId, usuarioId, checkIn, checkOut, valorTotal, statusPagamento) {
      this.id = id;
      this.propriedadeId = propriedadeId;
      this.usuarioId = usuarioId;
      this.checkIn = checkIn;
      this.checkOut = checkOut;
      this.valorTotal = valorTotal;
      this.statusPagamento = statusPagamento;
    }
  }

// classe anuncio com os atributos id unico, id do proprietario, id da propriedade, titulo, descricao e status
class Anuncio {
    constructor(id, proprietarioId, propriedadeId, titulo, descricao, status) {
      this.id = id;
      this.proprietarioId = proprietarioId;
      this.propriedadeId = propriedadeId;
      this.titulo = titulo;
      this.descricao = descricao;
      this.status = status;
    }
  }


// classe avaliacao criada para facilitar o registro de avaliacoes, com os atributos nome da propriedade a ser avaliada, nota e comentario
class Avaliacao {
    constructor(idPropriedade, nota, comentario) {
      this.nomePropriedade = nomePropriedade;
      this.nota = nota;
      this.comentario = comentario;
    }
  }

// classe sistema para gerenciar interacoes 
class Sistema {
    constructor() {
      this.propriedades = [];
      this.usuarios = [];
      this.reservas = [];
      this.anuncios = [];
      this.avaliacoes = []
      this.usuarioLogado = null;
    }
    addUsuario(usuario){
        this.propriedades.push(usuario)
    }
    addPropriedade(propriedade){
        this.propriedades.push(propriedade)
    }
    addReserva(reserva){
        this.reservas.push(reserva)
    }
    addAnuncio(anuncio){
        this.anuncios.push(anuncio)
    }
}
  
// funcao auxiliar que gera id aleatorio

function gerarIdAleatorio() {
    // Gera um numero aleatorio de 7 digitos
    return Math.floor(Math.random() * 9000000) + 1000000
  }

// funcao fazer login

function fazerLogin(usuarios){
    var requisicao = require('readline-sync')
    var nome = requisicao.question('Digite o seu nome: ')
    var senha = requisicao.question('Digite a sua senha: ')
    let logado = false
    let ID = null
    for (let i = 0; i<usuarios.length; i+=1){ // percorre lista de usuarios para localizar e validar
        var usuario = usuarios[i]
        if (usuario.nome==nome && usuario.senha==senha){
            console.log('O login foi realizado com sucesso')
            logado=true
            ID = usuario.id //acha id do usuario logado, informacao vai ver usada para outras funcionalidades
            break
        }
    }
    return {chave1: logado, chave2: ID};
}

// funcao auxiliar id existe para ser usada em diversas outras funcoes

function idExiste(id, usuarios){
    var id_existe = false
    for (let i = 0; i<usuarios.length; i+=1){
        var usuario=usuarios[i]
        if (usuario.id == id){
            id_existe = true
            break  
        }
}
    return id_existe;
}

// funcao fazer cadastro 

function fazerCadastro(usuarios){
    var requisicao = require('readline-sync')
    var nome = requisicao.question('Digite o seu nome: ')
    while (true){ //gera id aleatorio ate ser um nao ja registrado
        var id = gerarIdAleatorio()
        if (idExiste(id, usuarios)==false){
            var idn = id
            break
        }
    }
    var enderecoContato = requisicao.question('Digite seu endereco para contato: ')
    var historicoReservas = []
    var senha = requisicao.question('Escolha uma senha: ')
    var usuario = new Usuario (idn, nome, enderecoContato, historicoReservas, senha) // cria usuario da classe Usuario
    usuarios.push(usuario) //add a lista de usuarios
    return usuarios
}



// funcao ver os proprios dados

function verDados(id, usuarios){
    for (let i = 0; i<usuarios.length; i+=1){ //percorre lista de usuarios para achar o usuario do id logado e entao printar cada informacao (exceto id)
        var usuario = usuarios[i]
        if (id==usuario.id){
            console.log('Nome:')
            console.log(usuario.nome)
            console.log('Endereco de contato:')
            console.log(usuario.enderecoContato)
            console.log('Historico de reservas')
            console.log(usuario.historicoReservas)
            console.log('Senha:')
            console.log(usuario.senha)
        }
    }
}


// funcao modificar os proprios dados 

function modificarDados(id, usuarios){
// nao permite modificacao do id, elemento usado para controle de tudo
    for (let i = 0; i<usuarios.length; i+=1){
        var usuario = usuarios[i]
        if(usuario.id==id){
            console.log('Essas sao as informacoes cadastradas:')
            verDados(id, usuarios)
            var historicoReservas = usuario.historicoReservas
            var requisicao = require('readline-sync')
            var nome = requisicao.question('Digite o novo nome: ')
            var endereco = requisicao.question('Digite o novo endereco: ')
            var senha = requisicao.question('Digite a nova senha: ')
            usuario_modificado = new Usuario(id, nome, endereco, historicoReservas, senha)
            //atualiza a posicao i para o novo usuario, modificando assim a lista usuarios
            usuarios[i] = usuario_modificado
        }
    }
    return usuarios;
}

// funcao ver lista de propriedades (ordem alfabetica)

function verPropriedades(propriedades){
    var propriedades = propriedades
    // inicia lista para armazenar os nomes
    var nomes_p=[]
    for (let i=0; i<propriedades.length; i+=1){ // adiciona cada nome a essa lista
        var propriedade=propriedades[i]
        var nomep = propriedade.nome
        nomes_p.push(nomep)
    }
    var requisicao = require('readline-sync')
    var autorizacao = requisicao.question('Digite o codigo para visualizacao das propriedades:  ')
    var nomes_ordem = nomes_p.sort() // organiza a lista de nomes em ordem alfabetica
    for (let i=0; i<nomes_ordem.length; i+=1){ //percorre a lista de nomes ao mesmo tempo que a lista de propriedades, para entao printar na ordem salva na lista de nomes
        let nome_o = nomes_ordem[i]
        for (let j=0; j<propriedades.length; j+=1){
            let propriedade = propriedades[j]
            if (propriedade.nome == nome_o){
                if (autorizacao != '1234'){
                    console.log('Nome:')
                    console.log(propriedade.nome)
                    console.log('Endereco:')
                    console.log(propriedade.endereco)
                    console.log('Capacidade de hospedes:')
                    console.log(propriedade.capacidadeHospedes)
                    console.log('Numero de quartos:')
                    console.log(propriedade.numQuartos)
                    console.log('Preco por noite:')
                    console.log(propriedade.precoPorNoite)
                    console.log('Disponibilidade:')
                    console.log(propriedade.disponibilidade)
                }
                if (autorizacao == '1234'){
                    console.log(propriedade)
                }
        
            }
        }
    }
}


// funcao auxiliar para ordenar as datas em ordem cronologica
function ordenarDatas(listaDatas) {
    return listaDatas.sort((data1, data2) => data1.getTime() - data2.getTime());
  }


// funcao ver lista de reservas (ordem cronologica)
function verReservas (reservas){
    var requisicao = require('readline-sync')
    var autorizacao = requisicao.question('Digite o codigo para visualizacao de todas as reservas:  ')
    if (autorizacao != '1234'){
        return ('Apenas funcionarios autorizados podem visualizar todas as reservas')
    }
    var datas = [] // cria lista de datas vazias para armazena-las
    for (let i = 0; i<reservas.length; i+=1){
        let reserva = reservas[i]
        let data = reserva.checkIn
        datas.push(data) // adiciona todas as datas a essa lista
    }
    datas = ordenarDatas(datas) // utiliza a funcao auxiliar para ordenar as datas em ordem cronologica
    for (let j = 0; j<datas.length; j+=1){ // percorre a lista de datas junto com a lista de reservas, para imprimir as reservas na ordem em que as respectivas datas foram organizadas
        let data = datas[j]
        for (let i = 0; i<reservas.length; i+=1){
            let reserva = reservas[i]
           if (data==reserva.checkIn){
            // vai printando cada uma das reservas
            console.log(reserva)
           }
        }
    } 
}



// funcao ver lista de anuncios (ordem alfabetica)

function verAnuncios(anuncios){ // funciona de forma semelhante a de ver propriedades
    var anuncios = anuncios
    var nomes_a=[] // cria lista auxiliar para os nomes dos anuncios
    for (let i=0; i<anuncios.length; i+=1){ // vai adicionando os nomes dos anuncios a lista de nomes
        var anuncio=anuncios[i]
        var nomea = anuncio.nome
        nomes_a.push(nomea)
    }
    var nomes_ordem = nomes_a.sort() // ordena a lista de nomes em ordem alfabetica
    var requisicao = require('readline-sync')
    var autorizacao = requisicao.question('Digite o codigo para visualizacao dos anuncios:  ') //pensando que os funcionarios saberiam que eh 1234 e os usuarios colocariam a propria senha
    for (let i=0; i<nomes_ordem.length; i+=1){ // percorre a lista de nomes junto com a lista de anuncios, para imprimir os anuncios na ordem em que as respectivos nomes foram organizados
        let nome_o = nomes_ordem[i]
        for (let j=0; j<anuncios.length; j+=1){
            let anuncio = anuncios[j]
            if (anuncio.nome == nome_o){
                // vai printando cada anuncio, se mostra id depende da autorizacao
                if (autorizacao == '1234'){
                    console.log(anuncio)
                }
                if (autorizacao != '1234'){
                    console.log('Titulo: ')
                    console.log(anuncio.titulo)
                    console.log('Descricao:')
                    console.log(anuncio.descricao)
                    console.log('Status de disponibilidade')
                    console.log(anuncio.status)
                }
            }
        }
    }

}

// funcao auxiliar disponibilidade da propriedade, para conferir se a propriedade pode receber hospedes 

function disponibilidade(propriedade){
    if (propriedade.numQuartos > 0 && propriedade.capacidadeHospedes > 0){
        var disp = true
    }
    else if (propriedade.numQuartos==0 || propriedade.capacidadeHospedes==0){
        var disp = false
    }
    return disp
}

// funcoes auxiliares id da reserva ja existe e diferenca em dias de duas datas  

function idExisteR(id, reservas){
    var id_existe = false
    for (let i = 0; i<reservas.length; i+=1){
        var reserva=reservas[i]
        if (reserva.id == id){
            id_existe = true
            break  
        }
}
    return id_existe;
}

// funcao auxiliar que calcula quantos dias (em modulo) ha entre duas datas 
function calcularDiferencaEmDias(data1, data2) {
    const diferencaEmMilissegundos = Math.abs(data2 - data1);
  
    const umDiaEmMilissegundos = 24 * 60 * 60 * 1000; // 1 dia em milissegundos
    const diferencaEmDias = Math.floor(diferencaEmMilissegundos / umDiaEmMilissegundos);
  
    return diferencaEmDias;
  }

// funcao auxiliar para verificar se id da propriedade existe 
function idExistep(id, propriedades){
    var id_existe = false
    for (let i = 0; i<propriedades.length; i+=1){
        var propriedade=propriedades[i]
        if (propriedade.id == id){
            id_existe = true
            break  
        }
}
    return id_existe
}

// funcao auxiliar para verificar se nome da propriedade existe
function nomeExistep(nome, propriedades){
    var nome_existe = false
    for (let i = 0; i<propriedades.length; i+=1){
        var propriedade=propriedades[i]
        if (propriedade.nome == nome){
            nome_existe = true
            break  
        }
}
    return nome_existe
}


// funcao reservar propriedade 

function reservarPropriedade(idusuario, usuarios, propriedades, reservas){
    while (true){ //fica em loop ate que um id nao registrado seja gerado
        var id = gerarIdAleatorio()
        if (idExisteR(id, reservas)==false){
            var idn = id
            break
        }
        else if (idExisteR(id, reservas) == true){
            console.log('Esse id ja existe, por favor escolha outro')
        } 
    }

    while (true){ // fica em loop ate que um nome registrado de propriedade seja escolhido
        var nome_propriedade = requisicao.question('Digite o nome da propriedade: ')
        if (nomeExistep(nome_propriedade, propriedades)==false){
            console.log('Esse nome nao existe, por favor escolha outro')
        }
        else if (nomeExistep(nome_propriedade, propriedades) == true){
            var nomePropriedade = nome_propriedade
            break
        } 
    }

    for (let i = 0; i<propriedades.length; i+=1){ //encontra a propriedade na lista de propriedades, atraves do nome fornecido
        var propriedade = propriedades[i]
        if (nomePropriedade==propriedade.nome){
            var propriedadeA = propriedade
            break
        }
    }
    if (disponibilidade(propriedadeA) == false){ //verifica se a propriedade escolhida pode receber novas reservas
        return ('Nao eh possivel realizar a reserva, pois a propriedade nao tem disponibilidade')
    }

    var numP = requisicao.question('Digite o numero de pessoas: ') //pergunta numero de pessoas para remover da capacidade registrada da propriedade
    var numPessoas = number(numP)

    // requisicoes para datas de check in e check out, seguidas de transformacao em objetos do tipo number para entao transformar em date
    var anoCI = requisicao.question('Digite o ano do check in (YYYY): ')
    var CIano = number(anoCI)
    var mesCI = requisicao.question('Digite o mes do check in (janeiro = 0): ')
    var CImes = number(mesCI)
    var diaCI = requisicao.question('Digite o dia do check in: ')
    var CIdia = number(diaCI)
    var horaCI = requisicao.question('Digite a hora do check in: ')
    var CIhora = number(horaCI)
    var minutoCI = requisicao.question('Digite o minuto do check in: ')
    var CIminuto = number(minutoCI)
    var checkin = new Date (CIano, CImes, CIdia, CIhora, CIminuto, 0, 0)

    var anoCO = requisicao.question('Digite o ano do check out (YYYY): ')
    var COano = number(anoCO)
    var mesCO = requisicao.question('Digite o mes do check out (janeiro = 0): ')
    var COmes = number(mesCO)
    var diaCO = requisicao.question('Digite o dia do check out: ')
    var COdia = number(diaCO)
    var horaCO = requisicao.question('Digite a hora do check out: ')
    var COhora = number(horaCO)
    var minutoCO = requisicao.question('Digite o minuto do check out: ')
    var COminuto = number(minutoCO)
    var checkOut = new Date (COano, COmes, COdia, COhora, COminuto, 0, 0)

    var diarias = calcularDiferencaEmDias(checkin, checkOut) //calcula o numero de diarias atraves da funcao auxiliar que calcula a diferenca em dias
    var valorTotal = (propriedade.precoPorNoite)*diarias //calcula o valor total

    var statusPagamento = requisicao.question('Digite o status do pagamento: ')

    propriedadeA.numQuartos = propriedadeA.numQuartos - 1 // atualiza numero de quartos disponiveis na propriedade
    propriedadeA.capacidadeHospedes = propriedadeA.capacidadeHospedes - numPessoas // atualiza capacidade de hospedes atual da propriedade
    var idPropriedade = propriedadeA.id

    for (let i = 0; i<propriedades.length; i+=1){ //atualiza lista de propriedades com a propriedade com o numero de quartos e capacidade atualizados
        var propriedade = propriedades[i]
        if (propriedadeA.id==propriedade.id){
            propriedades[i] = propriedadeA
            break
        }
    }

    var reserva = new Reserva (idn, idPropriedade, idusuario, checkin, checkOut, valorTotal, statusPagamento) // cria reserva da classe Reserva
    reservas.push(reserva)

    for (let i = 0; i<usuarios.length; i+=1){ // acha usuario pelo id e adiciona reserva ao historico de reservas
        var usuario = usuarios[i]
        if (idUsuario==usuario.id){
            usuario.historicoReservas = usuario.historicoReservas.push(reserva)
            break
        }
    }
    
    return {res1:propriedades, res2: reservas, res3: usuarios} // retorna propriedades, reservas e usuarios atualizados

}

// funcao cancelar reserva (antecedencia de no minimo 24h)

function cancelarReserva(reservas){
    var data_atual = new Date()
    var requisicao = require('readline-sync')
    var id = requisicao.question('Digite o id da reserva: ') //cancelamento feito apenas por adm
    if (idExisteR(id,reservas) == false){ // confere se reserva a ser cancelada existe
        return ('Nao eh possivel cancelar uma reserva que nao existe')
    }
    for (let i = 0; i<reservas.length; i+=1){
        var reserva = reservas[i]
        if (calcularDiferencaEmDias(data_atual, reserva.checkIn) >= 1 && reserva.id == id) { //confere se tem pelo menos 24h para a reserva
            var reservas_atualizadas = reservas.slice(i, 1) // remove a reserva
            console.log('A reserva foi cancelada')  //notifica que a reserva foi removida com sucesso
        }
    }
    return reservas_atualizadas
}



// funcao adicionar propriedade

function adicionarPropriedade(propriedades){
    var requisicao = require('readline-sync')
    var nome = requisicao.question('Digite o nome da propriedade: ')
    while (true){ //garante que o id da propriedade seja unico
        var id = gerarIdAleatorio()
        if (idExistep(id, propriedades)==false){
            var idn = id
            break
        }
        else if (idExistep(id, propriedade) == true){
            console.log('Esse id ja existe, por favor escolha outro')
        } 
    }
    var endereco = requisicao.question('Digite o endereco da propriedade: ')
    var capacidade = requisicao.question('Digite a capacidade de hospedes: ')
    var capacidadeHospedes = number(capacidade)
    var quartos = requisicao.question('Digite a quantidade de quartos: ')
    var numQuartos = number(quartos)
    var preco = requisicao.question('Digite o preco por noite: ')
    var precoPorNoite = number(preco)
    var disponibilidade = true
    var propriedade = new Propriedade (idn, nome, endereco, capacidadeHospedes, numQuartos, precoPorNoite, disponibilidade) // cria propriedade da classe Propriedades com os dados que foram pedidos
    propriedades.push(propriedade) //adiciona propriedade a lista de propriedades
    return propriedades
}

// funcao excluir propriedade 

function excluirPropriedade(propriedades, reservas){
    var requisicao = require('readline-sync')
    var idp = requisicao.question('Qual o id da propriedade que voce deseja excluir?  ') //pede id para administrador so excluir
    var tem_reserva = false
        for (let i = 0; i<reservas.length; i+=1){ //confere se ha reserva para essa propriedade
            var reserva = reservas[i]
            if (idp == reserva.propriedadeId){
                console.log('Nao eh possivel excluir, pois ha reserva.') //informa que nao eh possivel excluir
                tem_reserva == true
                break
            }
        }
    if (tem_reserva == false){ //so continua se n tem reserva
        for (let i = 0; i<propriedades.length; i+=1){ //acha propriedade do id informado
            var propriedade = propriedades[i]
            if (idp == propriedade.id){
                propriedades.slice(i, 1) //exclui a propriedade
                console.log('A propriedade foi excluida')
            }
        }
    }
    return propriedades
}

// funcao auxiliar para conferir se anuncio existe

function idExistea(id, anuncios){
    var id_existe = false
    for (let i = 0; i<anuncios.length; i+=1){
        var anuncio=anuncios[i]
        if (anuncio.id == id){
            id_existe = true
            break  
        }
}
    return id_existe
}

// funcao fazer anuncio 

function fazerAnuncio(anuncios, propriedades){
    var requisicao = require('readline-sync')
    var titulo = requisicao.question('Digite o titulo do anuncio: ')
    while (true){ // garante que o id seja unico
        var id = gerarIdAleatorio()
        if (idExistea(id, anuncios)==false){
            var idn = id
            break
        }
        else if (idExistea(id, anuncios) == true){
            console.log('Esse id ja existe, por favor escolha outro')
        } 
    }

    var proprietarioId = requisicao.question('Digite o id do proprietario: ')
    
    while (true){ //ve se a propriedade a ser anunciada foi registrada
        var propriedadeId = requisicao.question('Digite o id da propriedade: ')
        if (idExistep(propriedadeId, propriedades)==false){
            console.log('Esse id nao existe, por favor escolha outro')
        }
        else if (idExistep(propriedadeId, propriedades) == true){
            var idPropriedade = propriedadeId
            break
        } 
    }
    var descricao = requisicao.question('Digite a descricao do anuncio: ')
    
    for (let i = 0; i<propriedades.length; i+=1){ //acha propriedade atraves do id
        var propriedade = propriedades[i]
        if (idPropriedade==propriedade.id){
            var propriedadeA = propriedade
        }
    }
    if (disponibilidade(propriedadeA) == true){ //verifica disponibilidade da propriedade para usar de status do anuncio
        disp = 'disponivel'
    }
    else if (disponibilidade(propriedadeA) == false){
        disp = 'indisponivel'
    }

    var anuncio = new Anuncio (idn, proprietarioId, idPropriedade, titulo, descricao, disp) //cria novo anuncio da classe Anuncio
    anuncios.push(anuncio) //adiciona anuncio criado a lista de anuncios, para retorna-la atualizada
    return anuncios 
}

// funcao excluir anuncio 

function excluirAnuncio(anuncios){
    var requisicao = require('readline-sync')
    var ido = requisicao.question('Qual o id do anuncio que voce deseja excluir?  ') //pede id so para administrador excluir um anuncio
    for (let i = 0; i<anuncios.length; i+=1){ //acha o anuncio do id fornecido
        var anuncio = anuncios[i]
        if (ido == anuncio.id){
            anuncios.slice(i, 1) //remove o anuncio
        }
    }
    return anuncios
}

// funcao avaliar estadia

function avaliarEstadia(avaliacoes, propriedades){
    var requisicao = require('readline-sync')
    var nome = requisicao.question('Digite o nome da propriedade: ')
    if (nomeExistep(nome, propriedades) != true){
        return ('Nao eh possivel avaliar uma propriedade nao registrada') //sai da funcao se a propriedade nao existe
    }
    var nota = requisicao.question('Digite a nota: ')
    var comentario = requisicao.question('Digite o comentario: ')
    var avaliacao = new Avaliacao (nome, nota, comentario) //cria avaliacao da classe Avaliacao
    avaliacoes.push(avaliacao) //adiciona a nova avaliacao na lista de avaliacoes
    return avaliacoes
}

// funcao visualizar avaliacoes

function verAvaliacoes(avaliacoes){
    for (let i = 0; i<avaliacoes.length; i+=1){ //percorre lista de avalicoes e vai printando uma a uma
        var avaliacao = avaliacoes[i]
        console.log(avaliacao)
    }
}


// funcao main: o menu

function main(){
    var sistema = new Sistema()
    var propriedades = sistema.propriedades
    var reservas = sistema.reservas
    var anuncios = sistema.anuncios
    var avaliacoes = sistema.avaliacoes
    var usuarios = sistema.usuarios
    while (true){
        console.log('Seja bem-vindo ao sistema digital de reservas da Pousada Eclipse!')
        console.log('1. Fazer login')
        console.log('2. Fazer cadastro')
        console.log('3. Encerrar programa')

        var requisicao = require('readline-sync')
        var opcao = requisicao.question('Digite uma opcao: ')

        if (opcao=='1'){ //1. Fazer login
            var resultado = fazerLogin(usuarios)
            var logado = resultado.chave1
            var id = resultado.chave2
            if (logado==true){
                sistema.usuarioLogado = id
                while (true){
                    console.log('Opcoes do usuario logado:')
                    console.log('1. Ver meus dados')
                    console.log('2. Modificar meus dados')
                    console.log('3. Ver lista de propriedades')
                    console.log('4. Ver listas de reservas')
                    console.log('5. Ver lista de anuncios')
                    console.log('6. Reservar propriedade')
                    console.log('7. Cancelar reserva')
                    console.log('8. Adicionar propriedade')
                    console.log('9. Excluir propriedade')
                    console.log('10. Fazer anuncio')
                    console.log('11. Excluir anuncio')
                    console.log('12. Avaliar estadia')
                    console.log('13. Visualizar avaliacoes')
                    console.log('14. Voltar ao menu inicial')

                    var requisicao = require('readline-sync')
                    var opcao = requisicao.question('Digite uma opcao: ')

                    if (opcao=='1'){//1. Ver meus dados
                        var id = sistema.usuarioLogado;
                        verDados(id, usuarios)
                    }

                    if (opcao=='2'){//2. Modificar meus dados
                        var id = sistema.usuarioLogado
                        usuarios = modificarDados(id, usuarios)
                    }

                    if (opcao=='3'){//3. Ver lista de propriedades
                        verPropriedades(propriedades)
                    }

                    if (opcao =='4'){//4. Ver listas de reservas
                        verReservas(reservas)
                    }

                    if (opcao =='5'){//5. Ver lista de anuncios
                        var anuncios = sistema.anuncios
                        verAnuncios(anuncios)
                    }

                    if (opcao =='6'){//6. Reservar propriedade
                        let idUsuario = sistema.usuarioLogado
                        let resultadoo = reservarPropriedade(idUsuario,usuarios, propriedades, reservas)
                        if (resultadoo != 'Nao eh possivel realizar a reserva, pois a propriedade nao tem disponibilidade'){
                            usuarios = resultadoo.res3
                            reservas = resultadoo.res2
                            propriedades = resultadoo.res1
                        }
                    }

                    if (opcao == '7'){//7. Cancelar reserva
                        if(cancelarReserva(reservas) != 'Nao eh possivel cancelar uma reserva que nao existe'){ //nao perde a lista de reservas caso a funcao retorne que nao eh possivel
                            reservas = cancelarReserva(reservas)
                        }
                        
                    }

                    if (opcao == '8'){//8. Adicionar propriedade
                        propriedades = adicionarPropriedade(propriedades)
                    }

                    if (opcao == '9'){//9. Excluir propriedade
                        propriedades = excluirPropriedade(propriedades, reservas)
                    }

                    if (opcao == '10'){//10. Fazer anuncio
                        anuncios = fazerAnuncio(anuncios, propriedades) 
                    }

                    if (opcao == '11'){//11. Excluir anuncio
                        anuncios = excluirAnuncio(anuncios)
                    }

                    if (opcao == '12'){//12. Avaliar estadia
                        if(avaliarEstadia(avaliacoes) != 'Nao eh possivel avaliar uma propriedade nao registrada'){// nao perde lista de avaliacoes caso funcao retorne que nao eh possivel fazer avaliacao
                            avaliacoes = avaliarEstadia(avaliacoes)
                        }    
                    }

                    if (opcao == '13'){ //13. Visualizar avaliacoes
                        verAvaliacoes(avaliacoes)
                    }

                    if (opcao == '14'){//14. Voltar ao menu inicial
                        break
                    }
                    

                }
            }
            else if (logado==false){
                console.log('O login nao pode ser realizado. Tente novamente.')
            }
        }

        else if (opcao=='2'){ //2. Fazer cadastro
            usuarios = fazerCadastro(usuarios)
        }

        else if (opcao=='3'){ //3. Encerrar programa
            console.log('programa encerrado')
            break
        }
    }
    //atualizando o sistema antes de finalizar o programa
    sistema.propriedades = propriedades
    sistema.reservas = reservas
    sistema.anuncios = anuncios
    sistema.avaliacoes = avaliacoes
    
}

main()



