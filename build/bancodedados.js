"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listavaziamusica = exports.listavaziapremium = exports.listavaziafree = exports.zerarIdPlaylist = exports.zerarIdMusica = exports.zerarIdUsuario = exports.get_UsuariosPremium = exports.get_UsuariosFree = exports.get_Musicas = exports.deletarMusica = exports.deletarUsuarioFree = exports.deletarUsuarioPremium = exports.salvarMusica = exports.salvarUsuarioFree = exports.salvarUsuarioPremium = exports.banco_de_dados = void 0;
const ts_json_db_1 = require("ts-json-db");
const ErrosAplicacao_1 = require("./ErrosAplicacao");
exports.banco_de_dados = new ts_json_db_1.TypedJsonDB("./config.json");
exports.banco_de_dados.exists("/lastIdUsuario");
if (!exports.banco_de_dados.exists("/lastIdUsuario")) {
    exports.banco_de_dados.set("/lastIdUsuario", "0");
}
exports.banco_de_dados.exists("/lastIdMusica");
if (!exports.banco_de_dados.exists("/lastIdMusica")) {
    exports.banco_de_dados.set("/lastIdMusica", "0");
}
exports.banco_de_dados.exists("/lastIdPlaylist");
if (!exports.banco_de_dados.exists("/lastIdPlaylist")) {
    exports.banco_de_dados.set("/lastIdPlaylist", "0");
}
function salvarUsuarioPremium(usuario) {
    let ultimoId = exports.banco_de_dados.get("/lastIdUsuario");
    let novoId = (Number(ultimoId) + 1).toString();
    exports.banco_de_dados.set("/lastIdUsuario", novoId);
    usuario.id_usuario = novoId;
    exports.banco_de_dados.push("/usuariospremium", usuario);
    console.log(`Usuário Cadastrado, ID: ${usuario.id_usuario}`);
}
exports.salvarUsuarioPremium = salvarUsuarioPremium;
function salvarUsuarioFree(usuario) {
    let ultimoId = exports.banco_de_dados.get("/lastIdUsuario");
    let novoId = (Number(ultimoId) + 1).toString();
    exports.banco_de_dados.set("/lastIdUsuario", novoId);
    usuario.id_usuario = novoId;
    exports.banco_de_dados.push("/usuariosfree", usuario);
    console.log(`Usuário Cadastrado, ID: ${usuario.id_usuario}`);
}
exports.salvarUsuarioFree = salvarUsuarioFree;
function salvarMusica(musica) {
    let ultimoId = exports.banco_de_dados.get("/lastIdMusica");
    let novoId = (Number(ultimoId) + 1).toString();
    exports.banco_de_dados.set("/lastIdMusica", novoId);
    musica.id_musica = novoId;
    exports.banco_de_dados.push("/musicas", musica);
    console.log(`Música Cadastrada, ID: ${musica.id_musica}`);
}
exports.salvarMusica = salvarMusica;
function deletarUsuarioPremium(id) {
    let resultado = get_UsuariosPremium();
    let i = 0;
    for (; i < resultado.length; i++) {
        if (resultado[i].id_usuario == id) {
            break;
        }
    }
    if (i < resultado.length) {
        resultado.splice(i, 1);
        exports.banco_de_dados.set("/usuariospremium", resultado);
        return;
    }
    throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado.");
}
exports.deletarUsuarioPremium = deletarUsuarioPremium;
function deletarUsuarioFree(id) {
    let resultado = get_UsuariosFree();
    let i = 0;
    for (; i < resultado.length; i++) {
        if (resultado[i].id_usuario == id) {
            break;
        }
    }
    if (i < resultado.length) {
        resultado.splice(i, 1);
        exports.banco_de_dados.set("/usuariosfree", resultado);
        return;
    }
    throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado.");
}
exports.deletarUsuarioFree = deletarUsuarioFree;
function deletarMusica(id) {
    let resultado = get_Musicas();
    let i = 0;
    for (; i < resultado.length; i++) {
        if (resultado[i].id_musica == id) {
            break;
        }
    }
    if (i < resultado.length) {
        resultado.splice(i, 1);
        exports.banco_de_dados.set("/musicas", resultado);
        return;
    }
    throw new ErrosAplicacao_1.MusicaNaoEncontradaError("Música não encontrada.");
}
exports.deletarMusica = deletarMusica;
function get_Musicas() {
    let busca = exports.banco_de_dados.get("/musicas");
    if (busca == null) {
        throw new ErrosAplicacao_1.BancodeDadosError("!");
    }
    return busca;
}
exports.get_Musicas = get_Musicas;
function get_UsuariosFree() {
    let busca = exports.banco_de_dados.get("/usuariosfree");
    if (busca == null) {
        throw new ErrosAplicacao_1.BancodeDadosError('!');
    }
    return busca;
}
exports.get_UsuariosFree = get_UsuariosFree;
function get_UsuariosPremium() {
    let busca = exports.banco_de_dados.get("/usuariospremium");
    if (busca == null) {
        throw new ErrosAplicacao_1.BancodeDadosError('!');
    }
    return busca;
}
exports.get_UsuariosPremium = get_UsuariosPremium;
function zerarIdUsuario() {
    exports.banco_de_dados.set("/lastIdUsuario", "0");
}
exports.zerarIdUsuario = zerarIdUsuario;
function zerarIdMusica() {
    exports.banco_de_dados.set("/lastIdMusica", "0");
}
exports.zerarIdMusica = zerarIdMusica;
function zerarIdPlaylist() {
    exports.banco_de_dados.set("/lastIdPlaylist", "0");
}
exports.zerarIdPlaylist = zerarIdPlaylist;
function listavaziafree() {
    let listavazia = [];
    exports.banco_de_dados.set("/usuariosfree", listavazia);
}
exports.listavaziafree = listavaziafree;
function listavaziapremium() {
    let listavazia = [];
    exports.banco_de_dados.set("/usuariospremium", listavazia);
}
exports.listavaziapremium = listavaziapremium;
function listavaziamusica() {
    let listavazia = [];
    exports.banco_de_dados.set("/musicas", listavazia);
}
exports.listavaziamusica = listavaziamusica;
function resetarBD() {
    listavaziafree();
    listavaziapremium();
    listavaziamusica();
    zerarIdMusica();
    zerarIdUsuario();
    zerarIdPlaylist();
}
