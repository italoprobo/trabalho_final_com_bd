"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_text = exports.app = void 0;
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const classfy_1 = require("./classfy");
const ErrosAplicacao_1 = require("./ErrosAplicacao");
const bancodedados_1 = require("./bancodedados");
const bancodedados_2 = require("./bancodedados");
let input = (0, prompt_sync_1.default)();
exports.app = new classfy_1.App();
let opcao = '';
do {
    console.log('\nBem vindo ao CLASSFY\nDigite uma opção:');
    console.log('1 - Adicionar Usuário      2 - Exibir Dados Usuário     3 - Alterar Usuário\n' +
        '4 - Remover Usuário       5 - Adicionar Música       6 - Exibir Dados Música\n' +
        '7 - Remover Musica       8 - Adicionar Favoritos        9 - Exibir Favoritos\n' +
        '10 - Remover Favoritos        11 - Criar Playlist        12 - Inserir Música na Playlist\n' +
        '13 - Exibir Playlist        14 - Modo Aleatório Playlist        15 - Remover Música da Playlist\n' +
        '16 - Remover Playlist\n' +
        '0 - Sair\n');
    opcao = get_text("Opção: ");
    switch (opcao) {
        case "1":
            try {
                inserirUsuarioApp();
            }
            catch (e) {
                tratamentoErros(e);
            }
            break;
        case "2":
            try {
                exibirUsuario();
            }
            catch (e) {
                tratamentoErros(e);
            }
            break;
        case "3":
            try {
                alterarUsuarioApp();
            }
            catch (e) {
                tratamentoErros(e);
            }
            break;
        case "4":
            try {
                removerUsuarioApp();
            }
            catch (e) {
                tratamentoErros(e);
            }
            break;
        case "5":
            try {
                inserirMusicaApp();
            }
            catch (e) {
                tratamentoErros(e);
            }
            break;
        case "6":
            try {
                exibirMusica();
            }
            catch (e) {
                tratamentoErros(e);
            }
            break;
        case "7":
            try {
                removerMusicaApp();
            }
            catch (e) {
                tratamentoErros(e);
            }
            break;
        case "8":
            try {
                adicionarAosFavoritos();
            }
            catch (e) {
                tratamentoErros(e);
            }
            break;
        case "9":
            try {
                exibirFavoritos();
            }
            catch (e) {
                tratamentoErros(e);
            }
            break;
        case "10":
            try {
                removerDosFavoritos();
            }
            catch (e) {
                tratamentoErros(e);
            }
            break;
        case "11":
            try {
                criarPlaylist();
            }
            catch (e) {
                tratamentoErros(e);
            }
            break;
        case "12":
            try {
                inserir_musica_na_playlistApp();
            }
            catch (e) {
                tratamentoErros(e);
            }
            break;
        case "13":
            try {
                exibirPlaylist();
            }
            catch (e) {
                tratamentoErros(e);
            }
            break;
        case "14":
            try {
                ordemAleatoriaApp();
            }
            catch (e) {
                tratamentoErros(e);
            }
            break;
        case "15":
            try {
                remover_musica_da_playlistApp();
            }
            catch (e) {
                tratamentoErros(e);
            }
            break;
        case "16":
            try {
                removerPlaylistApp();
            }
            catch (e) {
                tratamentoErros(e);
            }
            break;
    }
    input('Operação finalizada. Pressione <enter>');
    console.clear();
} while (opcao != "0");
console.log("Aplicação encerrada");
function get_number(msg) {
    let valor = Number(input(msg));
    if (isNaN(valor)) {
        throw new ErrosAplicacao_1.FormatoInvalidoError('Valor passado não numérico!');
    }
    return valor;
}
function get_text(msg) {
    const valor = input(msg);
    if (valor.length === 0) {
        throw new ErrosAplicacao_1.FormatoInvalidoError('Valor vazio!');
    }
    return valor;
}
exports.get_text = get_text;
function inserirUsuarioApp() {
    console.log("\nCadastrar Usuário\n");
    let nome = get_text('Digite o seu nome: ');
    let usuariofree;
    let usuariopremium;
    let op = '';
    do {
        op = get_text('Você deseja criar uma Premium ou Free? (p/f) ').toLowerCase();
        if (op == "f") {
            usuariofree = new classfy_1.UsuarioFree(nome);
            (0, bancodedados_1.salvarUsuarioFree)(usuariofree);
            break;
        }
        else if (op == "p") {
            usuariopremium = new classfy_1.UsuarioPremium(nome);
            (0, bancodedados_1.salvarUsuarioPremium)(usuariopremium);
            break;
        }
    } while (op != 'f' || 'p');
}
function exibirUsuario() {
    let id = get_text('Digite o id da sua conta: ');
    let usuario = exports.app.consultarIdUsuario(id);
    if (usuario != null) {
        console.log(`Id: ${exports.app.consultarIdUsuario(id).id_usuario}\n` +
            `Nome: ${exports.app.consultarIdUsuario(id).nome_usuario}\n`);
        if (usuario instanceof classfy_1.UsuarioPremium) {
            console.log("Playlists:");
            for (let p of usuario.playlists) {
                console.log(`Nome: ${p.nome_playlist}, Quantidade de músicas: ${p.qtd_musicas}`);
            }
        }
    }
    else {
        throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
    }
}
function alterarUsuarioApp() {
    console.log("\nAlterar Dados do Usuário\n");
    let id = get_text('Digite o id da sua conta: ');
    let usuario = exports.app.consultarIdUsuario(id);
    if (usuario != null) {
        exports.app.alterarUsuario(id, get_text("Novo nome: "));
    }
    else {
        throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
    }
}
function removerUsuarioApp() {
    console.log("\nRemover Usuário\n");
    let id = get_text('Digite o id da sua conta: ');
    let usuario = exports.app.consultarIdUsuario(id);
    if (usuario instanceof classfy_1.UsuarioPremium) {
        (0, bancodedados_1.deletarUsuarioPremium)(id);
    }
    else {
        (0, bancodedados_1.deletarUsuarioFree)(id);
    }
    console.log("\nUsuário Removido!");
}
function inserirMusicaApp() {
    console.log("\nCadastrar Música\n");
    let nome = get_text('Digite o nome da música: ');
    let artista = get_text('Digite o nome do artista: ');
    let tempo = get_text('Digite o tempo da Música (mm:ss): ');
    if (Number(tempo.split(":")[0]) >= 60 || Number(tempo.split(":")[1]) >= 60) {
        throw new ErrosAplicacao_1.FormatoInvalidoError("Formato inválido!");
    }
    let anoLancamento = get_text('Digite o ano de lançamento: ');
    let genero = get_text('Digite o gênero: ');
    let musica = new classfy_1.Musica(nome, artista, tempo, anoLancamento, genero);
    (0, bancodedados_1.salvarMusica)(musica);
}
function exibirMusica() {
    let id = get_text('Digite o id da musica: ');
    let musicaProcurada = exports.app.consultarIdMusica(id);
    if (musicaProcurada != null) {
        console.log(`Id: ${musicaProcurada.id_musica}\n` +
            `Nome: ${musicaProcurada.nome_musica}\n` +
            `Artista: ${musicaProcurada.nome_artista}\n` +
            `Tempo da Música: ${musicaProcurada.tempo_musica}\n` +
            `Ano Lançamento: ${musicaProcurada.anoLancamento}\n` +
            `Gênero: ${musicaProcurada.genero}\n`);
    }
    else {
        throw new ErrosAplicacao_1.MusicaNaoEncontradaError("Música não encontrada");
    }
}
function removerMusicaApp() {
    console.log("\nRemover Música\n");
    let id = get_text('Digite o id da música: ');
    (0, bancodedados_1.deletarMusica)(id);
    console.log("\nMúsica Removida!");
}
function adicionarAosFavoritos() {
    console.log('\nAdicionar aos Favoritos\n');
    let idUsuario = get_text('Digite o id do usuário: ');
    let idMusica = get_text('Digite o id da música: ');
    exports.app.inserirFavorito(idUsuario, idMusica);
    console.log('Música adicionada aos favoritos!');
}
function exibirFavoritos() {
    let id = get_text('Digite o id do usuário: ');
    let usuario = exports.app.consultarIdUsuario(id);
    if (usuario != null) {
        for (let f of usuario.favoritos) {
            console.log(`Nome: ${f.nome_musica}, Tempo: ${f.tempo_musica} , Artista: ${f.nome_artista}\n`);
        }
    }
    else {
        throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
    }
}
function removerDosFavoritos() {
    console.log('\nRemover dos Favoritos\n');
    let idUsuario = get_text('Digite o id do usuário: ');
    let idMusica = get_text('Digite o id da música: ');
    exports.app.removerFavorito(idUsuario, idMusica);
    console.log("Música removida dos favoritos");
}
function criarPlaylist() {
    let nome = get_text('Digite o nome da Playlist: ');
    let idUsuario = get_text('Digite o id do usuário: ');
    let usuario = exports.app.consultarIdUsuario(idUsuario);
    let ultimoId = bancodedados_2.banco_de_dados.get("/lastIdPlaylist");
    let novoId = (Number(ultimoId) + 1).toString();
    bancodedados_2.banco_de_dados.set("/lastIdPlaylist", novoId);
    let playlist = new classfy_1.Playlist(nome);
    playlist.id_playlist = novoId;
    if (usuario instanceof classfy_1.UsuarioPremium) {
        usuario.inserirPlaylist(playlist, idUsuario);
    }
    else {
        console.log("Você não possui uma conta Premium");
    }
}
function inserir_musica_na_playlistApp() {
    let idMusica = get_text('Digite o id da música: ');
    let idUsuario = get_text('Digite o id do usuário: ');
    let idPlaylist = get_text('Digite o id da Playlist: ');
    let usuario = exports.app.consultarIdUsuario(idUsuario);
    if (usuario != null) {
        if (usuario instanceof classfy_1.UsuarioPremium) {
            let indexofPlaylist = usuario.consultarIndexPlaylist(idPlaylist);
            if (indexofPlaylist != -1) {
                let musica = exports.app.consultarIdMusica(idMusica);
                if (musica != null) {
                    usuario.playlists[indexofPlaylist].inserir_musica_na_playlist(musica);
                }
                else {
                    throw new ErrosAplicacao_1.MusicaNaoEncontradaError("Música não encontrada!");
                }
            }
            else {
                throw new ErrosAplicacao_1.PlaylistNaoEncontradaError("Playlist não encontrada");
            }
        }
        else {
            console.log("Você não possui uma conta Premium");
        }
    }
    else {
        throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
    }
}
function exibirPlaylist() {
    let idUsuario = get_text('Digite o id do usuário: ');
    let idPlaylist = get_text('Digite o id do playlist: ');
    console.log("\n");
    let usuario = exports.app.consultarIdUsuario(idUsuario);
    if (usuario != null) {
        if (usuario instanceof classfy_1.UsuarioPremium) {
            let playlist = usuario.consultarIdPlaylist(idPlaylist);
            if (playlist != null) {
                console.log(`Nome Playlist: ${playlist.nome_playlist}`);
                console.log(`Quantidade de músicas na playlist: ${playlist.qtd_musicas}`);
                if (playlist.qtd_musicas > 0) {
                    for (let m of playlist.musicas) {
                        console.log(`Nome: ${m.nome_musica}, Artista: ${m.nome_artista}\n`);
                    }
                }
                else {
                    console.log("Playlist vazia!");
                }
            }
            else {
                throw new ErrosAplicacao_1.PlaylistNaoEncontradaError('Playlist não encontrada');
            }
        }
        else {
            console.log("Você não possui uma conta Premium");
        }
    }
    else {
        throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
    }
}
function ordemAleatoriaApp() {
    let idUsuario = get_text('Digite o id do usuário: ');
    let idPlaylist = get_text('Digite o id do playlist: ');
    let usuario = exports.app.consultarIdUsuario(idUsuario);
    if (usuario != null) {
        if (usuario instanceof classfy_1.UsuarioPremium) {
            let playlist = usuario.consultarIdPlaylist(idPlaylist);
            if (playlist != null) {
                playlist.ordemAleatoria();
            }
        }
        else {
            console.log("Você não possui uma conta Premium");
        }
    }
    else {
        throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
    }
}
function removerPlaylistApp() {
    let idUsuario = get_text('Digite o id do usuário: ');
    let idPlaylist = get_text('Digite o id do playlist: ');
    let usuario = exports.app.consultarIdUsuario(idUsuario);
    if (usuario != null) {
        if (usuario instanceof classfy_1.UsuarioPremium) {
            let playlist = usuario.consultarIdPlaylist(idPlaylist);
            if (playlist != null) {
                usuario.excluirPlaylist(idPlaylist);
            }
        }
        else {
            console.log("Você não possui uma conta Premium");
        }
    }
    else {
        throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
    }
}
function remover_musica_da_playlistApp() {
    let idMusica = get_text('Digite o id da música: ');
    let idUsuario = get_text('Digite o id do usuário: ');
    let idPlaylist = get_text('Digite o id da Playlist: ');
    let usuario = exports.app.consultarIdUsuario(idUsuario);
    if (usuario instanceof classfy_1.UsuarioPremium) {
        let indexofPlaylist = usuario.consultarIndexPlaylist(idPlaylist);
        let musica = exports.app.consultarIdMusica(idMusica);
        usuario.playlists[indexofPlaylist].remover_musica_da_playlist(musica, indexofPlaylist);
        console.log("Música removida");
    }
    else {
        console.log("Você não possui uma conta Premium");
    }
}
function tratamentoErros(e) {
    if (e instanceof ErrosAplicacao_1.UsuarioNaoEncontradoError) {
        console.log("Usuário não encontrado!");
    }
    else if (e instanceof ErrosAplicacao_1.UsuarioJaCadastradoError) {
        console.log("Usuário já cadastrado!");
    }
    else if (e instanceof ErrosAplicacao_1.MusicaNaoEncontradaError) {
        console.log("Música não encontrada!");
    }
    else if (e instanceof ErrosAplicacao_1.MusicaJaCadastradaError) {
        console.log("Música já cadastrada!");
    }
    else if (e instanceof ErrosAplicacao_1.PlaylistNaoEncontradaError) {
        console.log("Playlist não encontrada!");
    }
    else if (e instanceof ErrosAplicacao_1.PlaylistJaCriadaError) {
        console.log("Playlist já cadastrada!");
    }
    else if (e instanceof ErrosAplicacao_1.FormatoInvalidoError) {
        console.log("Valor vazio!");
    }
    else if (e instanceof ErrosAplicacao_1.BancodeDadosError) {
        console.log("Array vazio!");
    }
}
