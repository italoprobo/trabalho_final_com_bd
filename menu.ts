import prompt from "prompt-sync";
import { Musica, Playlist, App, Usuario, UsuarioFree, UsuarioPremium} from "./classfy";
import { PlaylistJaCriadaError, BancodeDadosError, FormatoInvalidoError, UsuarioNaoEncontradoError, MusicaNaoEncontradaError, MusicaJaCadastradaError, PlaylistNaoEncontradaError, UsuarioJaCadastradoError } from "./ErrosAplicacao";
import { salvarUsuarioFree,salvarUsuarioPremium, salvarMusica, deletarUsuarioFree, deletarUsuarioPremium, deletarMusica } from "./bancodedados"; 
import { banco_de_dados, zerarIdUsuario, zerarIdMusica, zerarIdPlaylist } from "./bancodedados";

let input = prompt();
export let app: App= new App();

let opcao: String = '';

do {
    console.log('\nBem vindo ao CLASSFY\nDigite uma opção:');
    console.log('1 - Adicionar Usuário      2 - Exibir Dados Usuário     3 - Alterar Usuário\n' +
        '4 - Remover Usuário       5 - Adicionar Música       6 - Exibir Dados Música\n' +
        '7 - Remover Musica       8 - Adicionar Favoritos        9 - Exibir Favoritos\n' +      
        '10 - Remover Favoritos        11 - Criar Playlist        12 - Inserir Música na Playlist\n' +
        '13 - Exibir Playlist        14 - Modo Aleatório Playlist        15 - Remover Música da Playlist\n' +
        '16 - Remover Playlist\n'+
        '0 - Sair\n');
    opcao = get_text("Opção: ");
    switch (opcao) {
        case "1":
            try {
            inserirUsuarioApp();
            } catch(e: any) {
                tratamentoErros(e)
            }
            break
        case "2":
            try{
            exibirUsuario();
            } catch(e: any) {
                tratamentoErros(e)
            }
            break
        case "3":
            try{
            alterarUsuarioApp();
            } catch(e: any) {
                tratamentoErros(e)
            }
            break;
        case "4":
            try {
            removerUsuarioApp();
            } catch(e: any) {
                tratamentoErros(e)
            }
            break;
        case "5":
            try {
            inserirMusicaApp();
            } catch(e: any) {
                tratamentoErros(e)
            }
            break;
        case "6":
            try{
            exibirMusica();
            } catch(e: any) {
                tratamentoErros(e)
            }
            break;
        case "7":
            try{
            removerMusicaApp();
            } catch(e: any) {
                tratamentoErros(e)
            }
            break;
        case "8":
            try{
            adicionarAosFavoritos();
            } catch (e: any) {
                tratamentoErros(e)
            }
            break;
        case "9": 
            try{
            exibirFavoritos();
            } catch(e: any) {
                tratamentoErros(e)
            }
            break;
        case "10":
            try{
            removerDosFavoritos();
            } catch(e: any) {
                tratamentoErros(e)
            }
            break;
        case "11":
            try{
            criarPlaylist();
            } catch(e: any) {
                tratamentoErros(e)
            }
            break;
        case "12":
            try{
            inserir_musica_na_playlistApp();
            } catch(e: any) {
                tratamentoErros(e)
            }
            break;
        case "13":
            try{
            exibirPlaylist();
            } catch(e: any) {
                tratamentoErros(e)
            }
            break;
        case "14":
            try{
            ordemAleatoriaApp();
            } catch(e: any) {
                tratamentoErros(e)
            }
            break;
        case "15":
            try{
            remover_musica_da_playlistApp();
            } catch(e: any) {
                tratamentoErros(e)
            }
            break;
        case "16":
            try{
            removerPlaylistApp();
            } catch(e: any) {
                tratamentoErros(e)
            }
            break;
    }
    input('Operação finalizada. Pressione <enter>');
    console.clear();
} while (opcao != "0");
console.log("Aplicação encerrada");

function get_number(msg: string): number{
    let valor = Number(input(msg))
    if (isNaN(valor)){
        throw new FormatoInvalidoError('Valor passado não numérico!')
    }
    return valor
}

export function get_text(msg: string): string{
    const valor = input(msg)
    if (valor.length === 0){
        throw new FormatoInvalidoError('Valor vazio!')
    }
    return valor
}

function inserirUsuarioApp(): void {
    console.log("\nCadastrar Usuário\n");
    let nome: string = get_text('Digite o seu nome: ')
    let usuariofree!: UsuarioFree;
    let usuariopremium!: UsuarioPremium

    
    let op: string = ''
    
    do {
    
        op = get_text('Você deseja criar uma Premium ou Free? (p/f) ').toLowerCase();
            
        if(op == "f"){
            usuariofree = new UsuarioFree(nome);
            salvarUsuarioFree(usuariofree)
            break;
        } else if(op == "p"){
            usuariopremium = new UsuarioPremium(nome);
            salvarUsuarioPremium(usuariopremium)
            break;
        }
            
    } while (op != 'f' || 'p')
    
    
}

function exibirUsuario(): void {
    let id: string = get_text('Digite o id da sua conta: ');
    let usuario = app.consultarIdUsuario(id)
    if(usuario!= null) {
        console.log(`Id: ${app.consultarIdUsuario(id).id_usuario}\n` +
        `Nome: ${app.consultarIdUsuario(id).nome_usuario}\n`);
        if (usuario instanceof UsuarioPremium) {
            console.log("Playlists:")
            for(let p of usuario.playlists) {
                console.log(`Nome: ${p.nome_playlist}, Quantidade de músicas: ${p.qtd_musicas}`);
            }
        }
    } else {
        throw new UsuarioNaoEncontradoError("Usuário não encontrado")
    }

}

function alterarUsuarioApp() {
    console.log("\nAlterar Dados do Usuário\n")
    let id: string = get_text('Digite o id da sua conta: ');
    let usuario = app.consultarIdUsuario(id);
    if(usuario!= null ) {
        app.alterarUsuario(id, get_text("Novo nome: "))
    } else {
        throw new UsuarioNaoEncontradoError("Usuário não encontrado")
    }
}

function removerUsuarioApp() {
    console.log("\nRemover Usuário\n");
    let id: string = get_text('Digite o id da sua conta: ');
    let usuario: Usuario = app.consultarIdUsuario(id)
    if(usuario instanceof UsuarioPremium) {
        deletarUsuarioPremium(id)
    } else {
        deletarUsuarioFree(id)
    }
    console.log("\nUsuário Removido!")
}

function inserirMusicaApp(): void {
    console.log("\nCadastrar Música\n");
    let nome: string = get_text('Digite o nome da música: ')
    let artista: string = get_text('Digite o nome do artista: ')
    let tempo: string = get_text('Digite o tempo da Música (mm:ss): ')
    if(Number(tempo.split(":")[0]) >= 60 || Number(tempo.split(":")[1]) >= 60) {
        throw new FormatoInvalidoError("Formato inválido!")
    }
    let anoLancamento: string = get_text('Digite o ano de lançamento: ')
    let genero: string = get_text('Digite o gênero: ')
    let musica: Musica = new Musica(nome, artista, tempo, anoLancamento, genero);

    salvarMusica(musica)
}

function exibirMusica(): void {
    let id: string = get_text('Digite o id da musica: ');
    let musicaProcurada = app.consultarIdMusica(id)

    if(musicaProcurada!= null) {
        console.log(`Id: ${musicaProcurada.id_musica}\n` +
        `Nome: ${musicaProcurada.nome_musica}\n` +
        `Artista: ${musicaProcurada.nome_artista}\n` +
        `Tempo da Música: ${musicaProcurada.tempo_musica}\n` +
        `Ano Lançamento: ${musicaProcurada.anoLancamento}\n` +
        `Gênero: ${musicaProcurada.genero}\n`);
    } else {
        throw new MusicaNaoEncontradaError("Música não encontrada")
    }

}

function removerMusicaApp() {
    console.log("\nRemover Música\n");
    let id: string = get_text('Digite o id da música: ');
    deletarMusica(id)
    console.log("\nMúsica Removida!")
}

function adicionarAosFavoritos() {
    console.log('\nAdicionar aos Favoritos\n')
    let idUsuario: string = get_text('Digite o id do usuário: ')
    let idMusica: string = get_text('Digite o id da música: ')
    app.inserirFavorito(idUsuario, idMusica)
    console.log('Música adicionada aos favoritos!')
}

function exibirFavoritos(): void {
    let id: string = get_text('Digite o id do usuário: ')
    let usuario: Usuario = app.consultarIdUsuario(id)
    if(usuario!= null) {
        for(let f of usuario.favoritos) {
            console.log(`Nome: ${f.nome_musica}, Tempo: ${f.tempo_musica} , Artista: ${f.nome_artista}\n`)
        }
    } else {
        throw new UsuarioNaoEncontradoError("Usuário não encontrado")
    }
}

function removerDosFavoritos() {
    console.log('\nRemover dos Favoritos\n')
    let idUsuario: string = get_text('Digite o id do usuário: ')
    let idMusica: string = get_text('Digite o id da música: ')
    app.removerFavorito(idUsuario, idMusica)
    console.log("Música removida dos favoritos")
}

function criarPlaylist() {
    let nome: string = get_text('Digite o nome da Playlist: ')
    let idUsuario: string = get_text('Digite o id do usuário: ');

    let usuario = app.consultarIdUsuario(idUsuario)
    let ultimoId = banco_de_dados.get("/lastIdPlaylist")
    let novoId = (Number(ultimoId) + 1).toString()
    banco_de_dados.set("/lastIdPlaylist", novoId)
    let playlist: Playlist = new Playlist(nome)
    playlist.id_playlist = novoId

    if(usuario instanceof UsuarioPremium) {
        usuario.inserirPlaylist(playlist, idUsuario)
    } else {
        console.log("Você não possui uma conta Premium");
    }
}

function inserir_musica_na_playlistApp() {
    let idMusica = get_text('Digite o id da música: ')
    let idUsuario = get_text('Digite o id do usuário: ')
    let idPlaylist = get_text('Digite o id da Playlist: ')

    let usuario = app.consultarIdUsuario(idUsuario)

    if(usuario != null) {
        if ( usuario instanceof UsuarioPremium) {
                let indexofPlaylist = usuario.consultarIndexPlaylist(idPlaylist)
                if(indexofPlaylist != -1) {
                    let musica = app.consultarIdMusica(idMusica)
                    if(musica != null) {
                        usuario.playlists[indexofPlaylist].inserir_musica_na_playlist(musica)
                    } else {
                        throw new MusicaNaoEncontradaError("Música não encontrada!")
                    }
                } else {
                    throw new PlaylistNaoEncontradaError("Playlist não encontrada")
                }
            } else {
                console.log("Você não possui uma conta Premium");
        }
    } else {
        throw new UsuarioNaoEncontradoError("Usuário não encontrado")
    }
}

function exibirPlaylist() {
    let idUsuario: string = get_text('Digite o id do usuário: ')
    let idPlaylist: string = get_text('Digite o id do playlist: ')
    console.log("\n")
    let usuario: Usuario = app.consultarIdUsuario(idUsuario)
    
    if(usuario!= null) {
        if(usuario instanceof UsuarioPremium) {
            let playlist: Playlist = usuario.consultarIdPlaylist(idPlaylist)
            if(playlist != null) {
                console.log(`Nome Playlist: ${playlist.nome_playlist}`)
                console.log(`Quantidade de músicas na playlist: ${playlist.qtd_musicas}`);
                if(playlist.qtd_musicas > 0) {
                    for(let m of playlist.musicas) {
                        console.log(`Nome: ${m.nome_musica}, Artista: ${m.nome_artista}\n`)
                    }
                } else {
                    console.log("Playlist vazia!");
                }
            } else {
                throw new PlaylistNaoEncontradaError('Playlist não encontrada')
            }
        } else {
            console.log("Você não possui uma conta Premium");
        }
    } else {
        throw new UsuarioNaoEncontradoError("Usuário não encontrado")
    }
}

function ordemAleatoriaApp() {
    let idUsuario: string = get_text('Digite o id do usuário: ')
    let idPlaylist: string = get_text('Digite o id do playlist: ')

    let usuario = app.consultarIdUsuario(idUsuario)
    
    if(usuario != null) {
        if(usuario instanceof UsuarioPremium) {
            let playlist = usuario.consultarIdPlaylist(idPlaylist)
            if(playlist != null) {
                playlist.ordemAleatoria()
            }
        } else {
            console.log("Você não possui uma conta Premium");
        }
    } else {
        throw new UsuarioNaoEncontradoError("Usuário não encontrado")
    }

}

function removerPlaylistApp() {
    let idUsuario: string = get_text('Digite o id do usuário: ')
    let idPlaylist: string = get_text('Digite o id do playlist: ')

    let usuario = app.consultarIdUsuario(idUsuario)
    
    if(usuario != null) {
        if(usuario instanceof UsuarioPremium) {
            let playlist = usuario.consultarIdPlaylist(idPlaylist)
            if(playlist != null) {
                usuario.excluirPlaylist(idPlaylist)
            }
        } else {
            console.log("Você não possui uma conta Premium");
        }
    } else {
        throw new UsuarioNaoEncontradoError("Usuário não encontrado")
    }
}

function remover_musica_da_playlistApp() {
    let idMusica = get_text('Digite o id da música: ')
    let idUsuario = get_text('Digite o id do usuário: ')
    let idPlaylist = get_text('Digite o id da Playlist: ')

    let usuario = app.consultarIdUsuario(idUsuario)
    
    if ( usuario instanceof UsuarioPremium) {
            let indexofPlaylist = usuario.consultarIndexPlaylist(idPlaylist)
            let musica = app.consultarIdMusica(idMusica)
            usuario.playlists[indexofPlaylist].remover_musica_da_playlist(musica, indexofPlaylist)
            console.log("Música removida")
        } else {
            console.log("Você não possui uma conta Premium");
    }
}

function tratamentoErros(e: any) {
    if(e instanceof UsuarioNaoEncontradoError) {
        console.log("Usuário não encontrado!")
    } else if(e instanceof UsuarioJaCadastradoError) {
        console.log("Usuário já cadastrado!")
    } else if(e instanceof MusicaNaoEncontradaError) {
        console.log("Música não encontrada!")
    } else if(e instanceof MusicaJaCadastradaError) {
        console.log("Música já cadastrada!")
    } else if(e instanceof PlaylistNaoEncontradaError) {
        console.log("Playlist não encontrada!")
    } else if(e instanceof PlaylistJaCriadaError) {
        console.log("Playlist já cadastrada!")
    } else if(e instanceof FormatoInvalidoError) {
        console.log("Valor vazio!")
    } else if(e instanceof BancodeDadosError) {
        console.log("Array vazio!")
    }
}