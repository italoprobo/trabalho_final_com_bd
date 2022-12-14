import {Musica, Usuario, UsuarioFree, UsuarioPremium, Playlist} from "./classfy"
import {TypedJsonDB, ContentBase, Dictionary } from "ts-json-db";
import { MusicaNaoEncontradaError, UsuarioNaoEncontradoError, BancodeDadosError} from "./ErrosAplicacao";

interface Guardar extends ContentBase {
    paths: {
        "/lastIdMusica" : {
            entryType: "single"
            valueType: string
        },
        '/musicas': {
            entryType: "array",
            valueType: Musica
        },
        "/lastIdUsuario" : {
            entryType: "single"
            valueType: string
        },
        '/usuariosfree': {
            entryType: "array",
            valueType: UsuarioFree 
        },
        '/usuariospremium': {
            entryType: "array",
            valueType: UsuarioPremium 
        },
        "/lastIdPlaylist" : {
            entryType: "single"
            valueType: string
        },
        '/playlist': {
            entryType: "array",
            valueType: Playlist
        }
    }
}

export let banco_de_dados = new TypedJsonDB<Guardar>("./config.json");

banco_de_dados.exists("/lastIdUsuario")
if(!banco_de_dados.exists("/lastIdUsuario")) {
    banco_de_dados.set("/lastIdUsuario", "0")
}

banco_de_dados.exists("/lastIdMusica")
if(!banco_de_dados.exists("/lastIdMusica")) {
    banco_de_dados.set("/lastIdMusica", "0")
}

banco_de_dados.exists("/lastIdPlaylist")
if(!banco_de_dados.exists("/lastIdPlaylist")) {
    banco_de_dados.set("/lastIdPlaylist", "0")
}
    
export function salvarUsuarioPremium(usuario: UsuarioPremium): void {
    let ultimoId = banco_de_dados.get("/lastIdUsuario")
    let novoId = (Number(ultimoId) + 1).toString()
    banco_de_dados.set("/lastIdUsuario", novoId)
    usuario.id_usuario = novoId
    banco_de_dados.push("/usuariospremium", usuario)
    console.log(`Usuário Cadastrado, ID: ${usuario.id_usuario}`)
}

export function salvarUsuarioFree(usuario: UsuarioFree): void {
    let ultimoId = banco_de_dados.get("/lastIdUsuario")
    let novoId = (Number(ultimoId) + 1).toString()
    banco_de_dados.set("/lastIdUsuario", novoId)
    usuario.id_usuario = novoId
    banco_de_dados.push("/usuariosfree", usuario)
    console.log(`Usuário Cadastrado, ID: ${usuario.id_usuario}`)
}

export function salvarMusica(musica: Musica): void {
    let ultimoId = banco_de_dados.get("/lastIdMusica")
    let novoId = (Number(ultimoId) + 1).toString()
    banco_de_dados.set("/lastIdMusica", novoId)
    musica.id_musica = novoId
    banco_de_dados.push("/musicas", musica)
    console.log(`Música Cadastrada, ID: ${musica.id_musica}`)
}



export function deletarUsuarioPremium(id: string) {
    let resultado: UsuarioPremium[] = get_UsuariosPremium()
    let i: number = 0

    for(; i < resultado.length; i++) {
        if(resultado[i].id_usuario == id) {
            break;
        }
    }

    if(i < resultado.length) {
        resultado.splice(i, 1)
        banco_de_dados.set("/usuariospremium", resultado);
        return;
    }

    throw new UsuarioNaoEncontradoError("Usuário não encontrado.");
}

export function deletarUsuarioFree(id: string) {
    let resultado: UsuarioFree[] = get_UsuariosFree()
    let i: number = 0

    for(; i < resultado.length; i++) {
        if(resultado[i].id_usuario == id) {
            break;
        }
    }

    if(i < resultado.length) {
        resultado.splice(i, 1)
        banco_de_dados.set("/usuariosfree", resultado);
        return;
    }

    throw new UsuarioNaoEncontradoError("Usuário não encontrado.");
}

export function deletarMusica(id: string) {
    let resultado: Musica[] = get_Musicas()
    let i: number = 0

    for(; i < resultado.length; i++) {
        if(resultado[i].id_musica == id) {
            break;
        }
    }

    if(i < resultado.length) {
        resultado.splice(i, 1)
        banco_de_dados.set("/musicas", resultado);
        return;
    }

    throw new MusicaNaoEncontradaError("Música não encontrada.");
}

export function get_Musicas(): Musica[] {
    let busca: Musica[] | null = banco_de_dados.get("/musicas")
    if(busca == null){
        throw new BancodeDadosError("!")
    }
    return busca
}

export function get_UsuariosFree(): UsuarioFree[] {
    let busca: UsuarioFree[]| null = banco_de_dados.get("/usuariosfree")
    if(busca == null) {
        throw new BancodeDadosError('!')
    }
    return busca
}

export function get_UsuariosPremium(): UsuarioPremium[]{
    let busca: UsuarioPremium[]| null = banco_de_dados.get("/usuariospremium")
    if(busca == null) {
        throw new BancodeDadosError('!')
    }
    return busca
}

export function zerarIdUsuario() {
    banco_de_dados.set("/lastIdUsuario", "0")
}

export function zerarIdMusica() {
    banco_de_dados.set("/lastIdMusica", "0")
}

export function zerarIdPlaylist() {
    banco_de_dados.set("/lastIdPlaylist", "0")
}

export function listavaziafree() {
    let listavazia: UsuarioFree[] = []
    banco_de_dados.set("/usuariosfree", listavazia)
}
export function listavaziapremium() {
    let listavazia: UsuarioPremium[] = []
    banco_de_dados.set("/usuariospremium", listavazia)
}
export function listavaziamusica() {
    let listavazia: Musica[] = []
    banco_de_dados.set("/musicas", listavazia)
}

function resetarBD() {
    listavaziafree()
    listavaziapremium()
    listavaziamusica()
    zerarIdMusica()
    zerarIdUsuario()
    zerarIdPlaylist()
}