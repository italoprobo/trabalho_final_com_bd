"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = exports.Playlist = exports.Musica = exports.UsuarioFree = exports.UsuarioPremium = exports.Usuario = void 0;
const ErrosAplicacao_1 = require("./ErrosAplicacao");
const bancodedados_1 = require("./bancodedados");
const bancodedados_2 = require("./bancodedados");
const menu_1 = require("./menu");
class Usuario {
    id_usuario;
    nome_usuario;
    favoritos = [];
    qtd_Favoritos = this.favoritos.length;
    constructor(nome_usuario) {
        this.id_usuario = '';
        this.nome_usuario = nome_usuario;
    }
    consultarFavorito(musica) {
        for (let f of this.favoritos) {
            if (f.id_musica === f.id_musica) {
                return f.id_musica;
            }
            break;
        }
        throw new ErrosAplicacao_1.MusicaNaoEncontradaError("Música não encontrada");
    }
    consultarIndexFavorito(id) {
        let indiceProcurado = -1;
        for (let i = 0; i < this.favoritos.length; i++) {
            if (this.favoritos[i].id_musica == id) {
                indiceProcurado = i;
            }
        }
        return indiceProcurado;
    }
}
exports.Usuario = Usuario;
class UsuarioPremium extends Usuario {
    playlists = [];
    qtd_Playlists = this.playlists.length;
    constructor(nome_usuario) {
        super(nome_usuario);
    }
    consultarPlaylist(playlist) {
        for (let p of this.playlists) {
            if (p.id_playlist === playlist.id_playlist) {
                return p.id_playlist;
            }
            break;
        }
        throw new ErrosAplicacao_1.PlaylistNaoEncontradaError("Playlist não encontrada");
    }
    consultarIndexPlaylist(id) {
        let indiceProcurado = -1;
        for (let i = 0; i < this.playlists.length; i++) {
            if (this.playlists[i].id_playlist == id) {
                indiceProcurado = i;
            }
        }
        return indiceProcurado;
    }
    consultarIdPlaylist(id) {
        let playlistProcurada;
        for (let i = 0; i < this.playlists.length; i++) {
            if (this.playlists[i].id_playlist == id) {
                playlistProcurada = this.playlists[i];
            }
        }
        return playlistProcurada;
    }
    alterarPlaylist(playlist, nome) {
        try {
            this.consultarPlaylist(playlist);
            playlist.nome_playlist = nome;
        }
        catch (PlaylistNaoEncontrada) {
            throw new ErrosAplicacao_1.PlaylistNaoEncontradaError("Playlist não encontrada");
        }
    }
    inserirPlaylist(playlist, id) {
        //this.playlists.push(playlist)
        let resultado = (0, bancodedados_1.get_UsuariosPremium)();
        let i = 0;
        for (; i < resultado.length; i++) {
            if (resultado[i].id_usuario == id) {
                break;
            }
        }
        let usuario = menu_1.app.consultarIdUsuario(id);
        if (i < resultado.length) {
            if (usuario instanceof UsuarioPremium) {
                usuario.playlists.push(playlist);
                usuario.qtd_Playlists++;
                resultado[i] = usuario;
                bancodedados_2.banco_de_dados.set("/usuariospremium", resultado);
                return;
            }
        }
    }
    excluirPlaylist(id) {
        let indice = this.consultarIndexPlaylist(id);
        if (indice != -1) {
            for (let i = indice; i < this.playlists.length; i++) {
                this.playlists[i] = this.playlists[i + 1];
            }
            this.playlists.pop();
        }
        else {
            throw new ErrosAplicacao_1.PlaylistNaoEncontradaError("Playlist não encontrada");
        }
    }
}
exports.UsuarioPremium = UsuarioPremium;
class UsuarioFree extends Usuario {
    constructor(nome_usuario) {
        super(nome_usuario);
    }
}
exports.UsuarioFree = UsuarioFree;
class Musica {
    id_musica;
    nome_musica;
    nome_artista;
    tempo_musica;
    anoLancamento;
    genero;
    constructor(nome_musica, nome_artista, tempo_musica, anoLancamento, genero) {
        this.id_musica = '';
        this.nome_musica = nome_musica;
        this.nome_artista = nome_artista;
        this.tempo_musica = tempo_musica;
        this.anoLancamento = anoLancamento;
        this.genero = genero;
    }
}
exports.Musica = Musica;
class Playlist {
    id_playlist;
    nome_playlist;
    musicas = [];
    qtd_musicas = 0;
    constructor(nome_playlist) {
        this.id_playlist = '';
        this.nome_playlist = nome_playlist;
    }
    inserir_musica_na_playlist(musica) {
        this.musicas.push(musica);
        this.qtd_musicas++;
    }
    remover_musica_da_playlist(musica, index) {
        for (let m of this.musicas) {
            if (musica.id_musica == m.id_musica) {
                this.musicas.splice(index, 1);
                this.qtd_musicas--;
            }
        }
    }
    ordemAleatoria() {
        for (let i = this.musicas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.musicas[i], this.musicas[j]] = [this.musicas[j], this.musicas[i]];
        }
        return this.musicas;
    }
    consultarIdMusicaPlaylist(id) {
        let musicaProcurada;
        for (let i = 0; i < this.musicas.length; i++) {
            if (this.musicas[i].id_musica == id) {
                musicaProcurada = this.musicas[i];
            }
        }
        return musicaProcurada;
    }
}
exports.Playlist = Playlist;
class App {
    repUsuarioFree = (0, bancodedados_1.get_UsuariosFree)();
    repUsuarioPremium = (0, bancodedados_1.get_UsuariosPremium)();
    repMusica = (0, bancodedados_1.get_Musicas)();
    consultarUsuario(usuario) {
        if (usuario instanceof UsuarioPremium) {
            for (let u of this.repUsuarioPremium) {
                if (u.id_usuario === usuario.id_usuario) {
                    return u.id_usuario;
                }
                break;
            }
            throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
        }
        else {
            for (let u of this.repUsuarioFree) {
                if (u.id_usuario === usuario.id_usuario) {
                    return u.id_usuario;
                }
                break;
            }
            throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
        }
    }
    consultarMusica(musica) {
        for (let m of this.repMusica) {
            if (m.id_musica === musica.id_musica) {
                return m.id_musica;
            }
            break;
        }
        throw new ErrosAplicacao_1.MusicaNaoEncontradaError("Música não encontrada");
    }
    consultarIndexUsuario(id) {
        let indiceProcurado = -1;
        let usuario = this.consultarIdUsuario(id);
        if (usuario instanceof UsuarioPremium) {
            for (let i = 0; i < this.repUsuarioPremium.length; i++) {
                if (this.repUsuarioPremium[i].id_usuario == id) {
                    indiceProcurado = i;
                }
            }
            return indiceProcurado;
        }
        else {
            for (let i = 0; i < this.repUsuarioFree.length; i++) {
                if (this.repUsuarioFree[i].id_usuario == id) {
                    indiceProcurado = i;
                }
            }
            return indiceProcurado;
        }
    }
    consultarIndexMusica(id) {
        let indiceProcurado = -1;
        for (let i = 0; i < this.repMusica.length; i++) {
            if (this.repMusica[i].id_musica == id) {
                indiceProcurado = i;
            }
        }
        return indiceProcurado;
    }
    alterarUsuario(id, nome) {
        let usuario = this.consultarIdUsuario(id);
        if (usuario instanceof UsuarioPremium) {
            let resultado = (0, bancodedados_1.get_UsuariosPremium)();
            let i = 0;
            for (; i < resultado.length; i++) {
                if (resultado[i].id_usuario == id) {
                    break;
                }
            }
            if (i < resultado.length) {
                resultado[i].nome_usuario = nome;
                bancodedados_2.banco_de_dados.set("/usuariospremium", resultado);
                return;
            }
        }
        else {
            let resultado = (0, bancodedados_1.get_UsuariosFree)();
            let i = 0;
            for (; i < resultado.length; i++) {
                if (resultado[i].id_usuario == id) {
                    break;
                }
            }
            if (i < resultado.length) {
                resultado[i].nome_usuario = nome;
                bancodedados_2.banco_de_dados.set("/usuariosfree", resultado);
                return;
            }
        }
    }
    alterarMusica(musica, nome) {
        try {
            this.consultarMusica(musica);
            musica.nome_musica = nome;
        }
        catch (MusicaNaoEncontrada) {
            throw new ErrosAplicacao_1.MusicaNaoEncontradaError("Música não encontrada");
        }
    }
    inserirUsuario(usuario) {
        if (usuario instanceof UsuarioPremium) {
            this.repUsuarioPremium.push(usuario);
        }
        else {
            this.repUsuarioFree.push(usuario);
        }
    }
    inserirMusica(musica) {
        this.repMusica.push(musica);
    }
    excluirUsuario(id) {
        let indice = this.consultarIndexUsuario(id);
        let usuario = this.consultarIdUsuario(id);
        if (usuario instanceof UsuarioPremium) {
            if (indice != -1) {
                for (let i = indice; i < this.repUsuarioPremium.length; i++) {
                    this.repUsuarioPremium[i] = this.repUsuarioPremium[i + 1];
                }
                this.repUsuarioPremium.pop();
            }
            else {
                throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
            }
        }
        else {
            if (indice != -1) {
                for (let i = indice; i < this.repUsuarioFree.length; i++) {
                    this.repUsuarioFree[i] = this.repUsuarioFree[i + 1];
                }
                this.repUsuarioFree.pop();
            }
            else {
                throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
            }
        }
    }
    excluirMusica(id) {
        let indice = this.consultarIndexMusica(id);
        if (indice != -1) {
            for (let i = indice; i < this.repMusica.length; i++) {
                this.repMusica[i] = this.repMusica[i + 1];
            }
            this.repMusica.pop();
        }
        else {
            throw new ErrosAplicacao_1.MusicaNaoEncontradaError("Música não encontrada");
        }
    }
    inserirFavorito(idUsuario, idMusica) {
        let indiceUsuario = this.consultarIndexUsuario(idUsuario);
        let indiceMusica = this.consultarIndexMusica(idMusica);
        let musica = this.repMusica[indiceMusica];
        let usuario = this.consultarIdUsuario(idUsuario);
        if (usuario instanceof UsuarioPremium) {
            if (indiceUsuario != -1 && indiceMusica != -1) {
                let resultado = (0, bancodedados_1.get_UsuariosPremium)();
                let i = 0;
                for (; i < resultado.length; i++) {
                    if (resultado[i].id_usuario == idUsuario) {
                        break;
                    }
                }
                if (i < resultado.length) {
                    resultado[i].favoritos.push(musica);
                    resultado[i].qtd_Favoritos++;
                    bancodedados_2.banco_de_dados.set("/usuariospremium", resultado);
                    return;
                }
            }
            else if (indiceUsuario == -1) {
                throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
            }
            else if (indiceMusica == -1) {
                throw new ErrosAplicacao_1.MusicaNaoEncontradaError("Música não encontrada");
            }
        }
        else {
            if (indiceUsuario != -1 && indiceMusica != -1) {
                let resultado = (0, bancodedados_1.get_UsuariosFree)();
                let i = 0;
                for (; i < resultado.length; i++) {
                    if (resultado[i].id_usuario == idUsuario) {
                        break;
                    }
                }
                if (i < resultado.length) {
                    resultado[i].favoritos.push(musica);
                    resultado[i].qtd_Favoritos++;
                    bancodedados_2.banco_de_dados.set("/usuariosfree", resultado);
                    return;
                }
            }
            else if (indiceUsuario == -1) {
                throw new ErrosAplicacao_1.UsuarioNaoEncontradoError("Usuário não encontrado");
            }
            else if (indiceMusica == -1) {
                throw new ErrosAplicacao_1.MusicaNaoEncontradaError("Música não encontrada");
            }
        }
    }
    removerFavorito(idUsuario, idMusica) {
        let usuario = this.consultarIdUsuario(idUsuario);
        if (usuario instanceof UsuarioPremium) {
            let resultado = (0, bancodedados_1.get_UsuariosPremium)();
            let i = 0;
            for (; i < resultado.length; i++) {
                if (resultado[i].id_usuario == idUsuario) {
                    break;
                }
            }
            let aux = 0;
            if (i < resultado.length) {
                for (let k = 0; k < usuario.favoritos.length; k++) {
                    if (usuario.favoritos[k].id_musica == idMusica) {
                        aux = k;
                        break;
                    }
                }
                resultado[i].favoritos.splice(aux, 1);
                resultado[i].qtd_Favoritos--;
                bancodedados_2.banco_de_dados.set("/usuariospremium", resultado);
                return;
            }
        }
        else {
            let resultado = (0, bancodedados_1.get_UsuariosFree)();
            let i = 0;
            for (; i < resultado.length; i++) {
                if (resultado[i].id_usuario == idUsuario) {
                    break;
                }
            }
            let aux = 0;
            if (i < resultado.length) {
                for (let k = 0; k < usuario.favoritos.length; k++) {
                    if (usuario.favoritos[k].id_musica == idMusica) {
                        aux = k;
                        break;
                    }
                }
                resultado[i].favoritos.splice(aux, 1);
                resultado[i].qtd_Favoritos--;
                bancodedados_2.banco_de_dados.set("/usuariosfree", resultado);
                return;
            }
        }
    }
    consultarIdUsuario(id) {
        let usuarioProcurado;
        for (let i = 0; i < this.repUsuarioFree.length; i++) {
            if (this.repUsuarioFree[i].id_usuario == id) {
                usuarioProcurado = this.repUsuarioFree[i];
            }
        }
        if (usuarioProcurado == null) {
            for (let i = 0; i < this.repUsuarioPremium.length; i++) {
                if (this.repUsuarioPremium[i].id_usuario == id) {
                    usuarioProcurado = this.repUsuarioPremium[i];
                }
            }
        }
        return usuarioProcurado;
    }
    consultarIdMusica(id) {
        let musicaProcurada;
        for (let i = 0; i < this.repMusica.length; i++) {
            if (this.repMusica[i].id_musica == id) {
                musicaProcurada = this.repMusica[i];
            }
        }
        return musicaProcurada;
    }
}
exports.App = App;
