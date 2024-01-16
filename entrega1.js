// criando as 5 classes: usuario, propriedade, reserva, anuncio e sistema

class Usuario {
    constructor(id, nome, enderecoContato, historicoReservas) {
      this.id = id;
      this.nome = nome;
      this.enderecoContato = enderecoContato;
      this.historicoReservas = historicoReservas;
    }
  }

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

class Avaliacao {
    constructor(idPropriedade, nota, comentario) {
      this.idPropriedade = idPropriedade;
      this.nota = nota;
      this.comentario = comentario;
    }
  }
  
class Sistema {
    constructor() {
      this.propriedades = [];
      this.propriedades = [];
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
  

// funcao fazer login

function fazerLogin(usuarios){
    var requisicao = require('readline-sync')
    var nome = requisicao.question('Digite o seu nome: ')
    var id = requisicao.question('Digite o seu id: ')
    let logado = false
    let ID = null
    for (let i = 0; i<usuarios.length; i+=1){
        var usuario = usuarios[i]
        if (usuario.nome==nome && usuario.id==id){
            console.log('O login foi realizado com sucesso')
            logado=true
            ID=id
            break
        }
    }
    return {chave1: logado, chave2: id};
}

// funcao id existe para funcao cadastro

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
    var nome = requisicao.question('Digite o seu nome ')
    while (true){
        var id = requisicao.question('Escolha um id de 5 digitos: ')
        if (idExiste(id, usuarios)==false){
            var idn = id
            break
        }
        else if (idExiste(id, usuarios) == true){
            console.log('Esse id ja existe, por favor escolha outro')
        } 
    }
    var enderecoContato = requisicao.question('Digite seu endereco para contato: ')
    var historicoReservas = []
    var usuario = new Usuario (idn, nome, enderecoContato, historicoReservas)
    var usuarios_atualizados = usuarios.push(usuario)
    return usuarios_atualizados;

}



// funcao ver os proprios dados 

function verDados(id, usuarios){
    for (let i = 0; i<usuarios.length; i+=1){
        var usuario = usuarios[i]
        if (id==usuario.id){
            console.log(usuario)
        }
    }
}


// funcao modificar os proprios dados 

function modificarDados(id, usuarios){
    for (let i = 0; i<usuarios.length; i+=1){
        var usuario = usuarios[i]
        if(usuario.id==id){
            console.log('Essas sao as informacoes cadastradas:')
            console.log(usuario)
            var historicoReservas = usuario.historicoReservas
            var requisicao = require('readline-sync')
            var nome = requisicao.question('Digite o novo nome: ')
            var endereco = requisicao.question('Digite o novo endereco: ')
            usuario_modificado = new Usuario(id, nome, endereco, historicoReservas)
            usuarios[i] = usuario_modificado
        }
    }
    return usuarios;
}

// funcao ver lista de propriedades (ordem alfabetica)

function verPropriedades(propriedades){
    var propriedades = propriedades
    var nomes_p=[]
    for (let i=0; i<propriedades.length; i+=1){
        var propriedade=propriedades[i]
        var nomep = propriedade.nome
        nomes_p.push(nomep)
    }
    var nomes_ordem = nomes_p.sort()
    for (let i=0; i<nomes_ordem.length; i+=1){
        let nome_o = nomes_ordem[i]
        for (let j=0; j<propriedades.length; j+=1){
            let propriedade = propriedades[j]
            if (propriedade.nome == nome_o){
                console.log(propriedade)
            }
        }
    }
}



// funcao ver lista de reservas (ordem cronologica)

function ordenarDatas(listaDatas) {
    return listaDatas.sort((data1, data2) => data1.getTime() - data2.getTime());
  }

function verReservas (reservas){
    var datas = []
    for (let i = 0; i<reservas.length; i+=1){
        var reserva = reservas[i]
        var data = reserva.checkIn
        datas.push(data)
    }
    for (let j = 0; j<datas.length; j+=1){
        var data = datas[j]
        for (let i = 0; i<reservas.length; i+=1){
            var reserva = reservas[i]
           if (data==reserva.checkIn){
            console.log(reserva)
           }
        }
    } 
}



// funcao ver lista de anuncios (ordem alfabetica)

function verAnuncios(anuncios){
    var anuncios = anuncios
    var nomes_a=[]
    for (let i=0; i<anuncios.length; i+=1){
        var anuncio=anuncios[i]
        var nomea = anuncio.nome
        nomes_a.push(nomea)
    }
    var nomes_ordem = nomes_a.sort()
    for (let i=0; i<nomes_ordem.length; i+=1){
        let nome_o = nomes_ordem[i]
        for (let j=0; j<anuncios.length; j+=1){
            let anuncio = anuncios[j]
            if (anuncio.nome == nome_o){
                console.log(anuncio)
            }
        }
    }

}


// funcao reservar propriedade 

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

function calcularDiferencaEmDias(data1, data2) {
    const diferencaEmMilissegundos = Math.abs(data2 - data1);
  
    const umDiaEmMilissegundos = 24 * 60 * 60 * 1000; // 1 dia em milissegundos
    const diferencaEmDias = Math.floor(diferencaEmMilissegundos / umDiaEmMilissegundos);
  
    return diferencaEmDias;
  }

function reservarPropriedade(usuarios, propriedades, reservas){
    while (true){
        var id = requisicao.question('Escolha um id de 5 digitos: ')
        if (idExisteR(id, reservas)==false){
            var idn = id
            break
        }
        else if (idExisteR(id, reservas) == true){
            console.log('Esse id ja existe, por favor escolha outro')
        } 
    }

    while (true){
        var propriedadeId = requisicao.question('Digite o id da propriedade: ')
        if (idExistep(propriedadeId, propriedades)==false){
            console.log('Esse id nao existe, por favor escolha outro')
        }
        else if (idExistep(propriedadeId, propriedades) == true){
            var idPropriedade = propriedadeId
            break
        } 
    }

    while (true){
        var usuarioId = requisicao.question('Digite o id do usuario: ')
        if (idExiste(usuarioId, usuarios)==false){
            console.log('Esse id nao existe, por favor escolha outro')
        }
        else if (idExistep(usuarioId, usuarios) == true){
            var idUsuario = usuarioId
            break
        } 
    }
    for (let i = 0; i<propriedades.length; i+=1){
        var propriedade = propriedades[i]
        if (idPropriedade==propriedade.id){
            var propriedadeA = propriedade
            break
        }
    }
    if (disponibilidade(propriedadeA) == false){
        return ('Nao eh possivel realizar a reserva, pois a propriedade nao tem disponibilidade')
    }

    var numP = requisicao.question('Digite o numero de pessoas: ')
    var numPessoas = number(numP)

    
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

    var diarias = calcularDiferencaEmDias(checkin, checkOut)
    var valorTotal = (propriedade.precoPorNoite)*diarias

    var statusPagamento = requisicao.question('Digite o status do pagamento: ')

    propriedadeA.numQuartos = propriedadeA.numQuartos - 1
    propriedadeA.capacidadeHospedes = propriedadeA.capacidadeHospedes - numPessoas

    for (let i = 0; i<propriedades.length; i+=1){
        var propriedade = propriedades[i]
        if (propriedadeA.id==propriedade.id){
            propriedades[i] = propriedadeA
            break
        }
    }

    var reserva = new Reserva (idn, idPropriedade, idUsuario, checkin, checkOut, valorTotal, statusPagamento)
    var reservas_atualizadas = reservas.push(reserva)

    for (let i = 0; i<usuarios.length; i+=1){
        var usuario = usuarios[i]
        if (idUsuario==usuario.id){
            usuario.historicoReservas = usuario.historicoReservas.push(reserva)
            break
        }
    }
    
    return {res1:propriedades, res2: reservas_atualizadas, res3: usuarios}

}

// funcao cancelar reserva (antecedencia de no minimo 24h)
function cancelarReserva(reservas){
    var data_atual = new Date()
    var requisicao = require('readline-sync')
    var id = requisicao.question('Digite o id da reserva: ')
    if (idExisteR(id,reservas) == false){
        return ('Nao eh possivel cancelar uma reserva que nao existe')
    }
    for (let i = 0; i<reservas.length; i+=1){
        var reserva = reservas[i]
        if (calcularDiferencaEmDias(data_atual, reserva.checkIn) >= 1 && reserva.id == id) {
            var reservas_atualizadas = reservas.slice(i, 1)
            console.log('A reserva foi cancelada')  
        }
    }
    return reservas_atualizadas
}


// funcao disponibilidade da propriedade, para conferir se a propriedade pode receber hospedes 

function disponibilidade(propriedade){
    if (propriedade.numQuartos > 0 && propriedade.capacidadeHospedes > 0){
        var disp = true
    }
    else if (propriedade.numQuartos==0 || propriedade.capacidadeHospedes==0){
        var disp = false
    }
    return disp
}


// funcao adicionar propriedade

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

function adicionarPropriedade(propriedades){
    var requisicao = require('readline-sync')
    var nome = requisicao.question('Digite o nome da propriedade: ')
    while (true){
        var id = requisicao.question('Escolha um id: ')
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
    var propriedade = new Propriedade (idn, nome, endereco, capacidadeHospedes, numQuartos, precoPorNoite, disponibilidade)
    var propriedades_atualizadas = propriedades.push(propriedade)
    return propriedades_atualizadas
}

// funcao excluir propriedade 

function excluirPropriedade(propriedades, reservas){
    var propriedades_atualizadas = null
    var requisicao = require('readline-sync')
    var idp = requisicao.question('Qual o id da propriedade que voce deseja excluir?  ')
    var tem_reserva = false
        for (let i = 0; i<reservas.length; i+=1){
            var reserva = reservas[i]
            if (idp == reserva.propriedadeId){
                console.log('Nao eh possivel excluir, pois ha reserva.')
                tem_reserva == true
                break
            }
        }
    if (tem_reserva == false){
        for (let i = 0; i<propriedades.length; i+=1){
            var propriedade = propriedades[i]
            if (idp == propriedade.id){
                var propriedades_atualizadas = propriedades.slice(i, 1)
                console.log('A propriedade foi excluida')
            }
        }
    }
    return propriedades_atualizadas
}

// funcao fazer anuncio 
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

function fazerAnuncio(anuncios, propriedades){
    var requisicao = require('readline-sync')
    var titulo = requisicao.question('Digite o titulo do anuncio: ')
    while (true){
        var id = requisicao.question('Escolha um id: ')
        if (idExistea(id, anuncios)==false){
            var idn = id
            break
        }
        else if (idExistea(id, anuncios) == true){
            console.log('Esse id ja existe, por favor escolha outro')
        } 
    }

    var proprietarioId = requisicao.question('Digite o id do proprietario: ')
    
    while (true){
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
    
    for (let i = 0; i<propriedades.length; i+=1){
        var propriedade = propriedades[i]
        if (idPropriedade==propriedade.id){
            var propriedadeA = propriedade
        }
    }
    if (disponibilidade(propriedadeA) == true){
        disp = 'disponivel'
    }
    else if (disponibilidade(propriedadeA) == false){
        disp = 'indisponivel'
    }

    var anuncio = new Anuncio (idn, proprietarioId, idPropriedade, titulo, descricao, disp)
    anuncios_atualizados = anuncios.push(anuncio)
    return anuncios_atualizados 
}

// funcao excluir anuncio 

function excluirAnuncio(anuncios){
    var anuncios_atualizados = null
    var requisicao = require('readline-sync')
    var ido = requisicao.question('Qual o id do anuncio que voce deseja excluir?  ')
    for (let i = 0; i<anuncios.length; i+=1){
        var anuncio = anuncios[i]
        if (ido == anuncio.id){
            anuncios_atualizados = anuncios.slice(i, 1)
        }
    }
    return anuncios_atualizados
}

// funcao avaliar estadia

function avaliarEstadia(avaliacoes){
    var requisicao = require('readline-sync')
    var id = requisicao.question('Digite o id da propriedade: ')
    if (idExistep(id) != true){
        return ('Nao eh possivel avaliar uma propriedade nao registrada')
    }
    var nota = requisicao.question('Digite a nota: ')
    var comentario = requisicao.question('Digite o comentario: ')
    var avaliacao = new Avaliacao (id, nota, comentario)
    var avaliacoes_atualizadas = avaliacoes.push(avaliacao)
    return avaliacoes_atualizadas
}

// funcao visualizar avaliacoes

function verAvaliacoes(avaliacoes){
    for (let i = 0; i<avaliacoes.length; i+=1){
        var avaliacao = avaliacoes[i]
        console.log(avaliacao)
    }
}


// funcao main: o menu

function main(){
    var sistema = new Sistema()
    while (true){
        console.log('Seja bem-vindo ao sistema digital de reservas da Pousada Eclipse!');
        console.log('1. Fazer login');
        console.log('2. Fazer cadastro');
        console.log('3. Encerrar programa');

        var requisicao = require('readline-sync');
        var opcao = requisicao.question('Digite uma opcao: ');

        if (opcao=='1'){
            var usuarios = sistema.usuarios
            var resultado = fazerLogin(usuarios)
            var logado = resultado.chave1
            var id = resultado.chave2
            if (logado==true){
                sistema.usuarioLogado = id
                while (true){
                    console.log('Opcoes do usuario logado:');
                    console.log('1. Ver meus dados');
                    console.log('2. Modificar meus dados');
                    console.log('3. Ver lista de propriedades');
                    console.log('4. Ver listas de reservas');
                    console.log('5. Ver lista de anuncios');
                    console.log('6. Reservar propriedade');
                    console.log('7. Cancelar reserva');
                    console.log('8. Adicionar propriedade');
                    console.log('9. Excluir propriedade');
                    console.log('10. Fazer anuncio');
                    console.log('11. Excluir anuncio');
                    console.log('12. Avaliar estadia')
                    console.log('13. Visualizar avaliacoes');
                    console.log('14. Voltar ao menu inicial');

                    var requisicao = require('readline-sync')
                    var opcao = requisicao.question('Digite uma opcao: ')

                    if (opcao=='1'){
                        var id = sistema.usuarioLogado;
                        var usuarios = sistema.propriedades;
                        verDados(id, usuarios)
                    }

                    if (opcao=='2'){
                        var id = sistema.usuarioLogado;
                        var usuarios = sistema.propriedades;
                        var usuariosmodificado = modificarDados(id, usuarios)
                        sistema.propriedades = usuariosmodificado
                    }

                    if (opcao=='3'){
                        var propriedades = sistema.propriedades
                        verPropriedades(propriedades)
                    }

                    if (opcao =='4'){
                        var reservas = sistema.reservas
                        verReservas(reservas)
                    }

                    if (opcao =='5'){
                        var anuncios = sistema.anuncios
                        verAnuncios(anuncios)
                    }

                    if (opcao =='6'){
                        let usuarios = sistema.usuarios
                        let propriedades = sistema.propriedades
                        let reservas = sistema.reservas
                        let resultadoo = reservarPropriedade(usuarios, propriedades, reservas)
                        let usuarios_atualizados = resultadoo.res3
                        let reservas_atualizadas = resultadoo.res2
                        let propriedades_atualizada = resultadoo.res1
                        sistema.propriedades = propriedades_atualizada
                        sistema.reservas = reservas_atualizadas
                        sistema.usuarios = usuarios_atualizados
                    }

                    if (opcao == '7'){
                        let reservas = sistema.reservas
                        let reservas_atualizadas = cancelarReserva(reservas)
                        sistema.reservas = reservas_atualizadas
                    }

                    if (opcao == '8'){
                        let propriedades = sistema.propriedades
                        let propriedades_atualizadas = adicionarPropriedade(propriedades)
                        sistema.propriedades = propriedades_atualizadas
                    }

                    if (opcao == '9'){
                        let reservas = sistema.reservas
                        let propriedades = sistema.propriedades
                        let propriedades_atualizadas = excluirPropriedade(propriedades, reservas)
                        sistema.propriedades = propriedades_atualizadas
                    }

                    if (opcao == '10'){
                        let anuncios = sistema.anuncios
                        let propriedades = sistema.propriedades
                        anuncios_atualizados = fazerAnuncio(anuncios, propriedades)
                        sistema.anuncios = anuncios_atualizados 
                    }

                    if (opcao == '11'){
                        let anuncios = sistema.anuncios
                        let anuncios_atualizados = excluirAnuncio(anuncios)
                        sistema.anuncios = anuncios_atualizados
                    }

                    if (opcao == '12'){
                        let avaliacoes = sistema.avaliacoes
                        let avaliacoes_atualizadas = avaliarEstadia(avaliacoes)
                        sistema.avaliacoes = avaliacoes_atualizadas
                    }

                    if (opcao == '13'){ 
                        var avaliacoes = sistema.avaliacoes
                        verAvaliacoes(avaliacoes)
                    }

                    if (opcao == '14'){
                        break
                    }
                    

                }
            }
            else if (logado==false){
                console.log('O login nao pode ser realizado. Tente novamente.')
            }
        }

        else if (opcao=='2'){
            var usuarios = sistema.propriedades
            var propriedades_atualizadas = fazerCadastro(usuarios)
            sistema.propriedades = propriedades_atualizadas
        }

        else if (opcao=='3'){
            console.log('programa encerrado')
            break
        }
    }
    
}



main()



