import { UsuarioNaoEncontradoError, MusicaNaoEncontradaError, PlaylistNaoEncontradaError, UsuarioJaCadastradoError, MusicaJaCadastradaError, PlaylistJaCriadaError} from "./ErrosAplicacao";
import { get_UsuariosFree, get_UsuariosPremium, get_Musicas } from "./bancodedados";
import { banco_de_dados } from "./bancodedados";
import { get_text } from "./menu";
import { app } from "./menu";

export class Usuario {

    id_usuario: string;
    nome_usuario: string;
    favoritos : Musica[] = []
    qtd_Favoritos: number = this.favoritos.length

    constructor(nome_usuario: string){
        this.id_usuario = '';
        this.nome_usuario = nome_usuario;
    }

    consultarFavorito(musica: Musica): string {
        for (let f of this.favoritos) {
            if(f.id_musica === f.id_musica){
                return f.id_musica
            }
            break
        }

        throw new MusicaNaoEncontradaError("Música não encontrada")
    }

    consultarIndexFavorito(id: string): number {
        let indiceProcurado: number = -1;
        for (let i = 0; i < this.favoritos.length; i++) {
            if (this.favoritos[i].id_musica== id) {
                indiceProcurado = i;
            }
        }

        return indiceProcurado;
    }

}

export class UsuarioPremium extends Usuario {

    playlists: Playlist[] = []
    qtd_Playlists: number = this.playlists.length

    constructor(nome_usuario: string){
        super(nome_usuario);
    }

    consultarPlaylist(playlist: Playlist): string {
        for (let p of this.playlists) {
            if(p.id_playlist === playlist.id_playlist){
                return p.id_playlist
            }
            break
        }

        throw new PlaylistNaoEncontradaError("Playlist não encontrada")
    }

    consultarIndexPlaylist(id: string): number {
        let indiceProcurado: number = -1;
        for (let i = 0; i < this.playlists.length; i++) {
            if (this.playlists[i].id_playlist== id) {
                indiceProcurado = i;
            }
        }

        return indiceProcurado;
    }

    consultarIdPlaylist(id: string): Playlist {
        let playlistProcurada!: Playlist
        for (let i = 0; i < this.playlists.length; i++) {
            if (this.playlists[i].id_playlist== id) {
                playlistProcurada = this.playlists[i];
            }
        }

        return playlistProcurada
    }

    alterarPlaylist(playlist: Playlist, nome: string): void {
        try{
            this.consultarPlaylist(playlist)
            playlist.nome_playlist = nome
        } catch(PlaylistNaoEncontrada){
            throw new PlaylistNaoEncontradaError("Playlist não encontrada")
        }
    }

    inserirPlaylist(playlist: Playlist, id: string): void {
        //this.playlists.push(playlist)

        let resultado: UsuarioPremium[] = get_UsuariosPremium()
        let i: number = 0

        for(; i < resultado.length; i++) {
            if(resultado[i].id_usuario == id) {
                break;
            }
        }

        let usuario = app.consultarIdUsuario(id)

        if(i < resultado.length) {

            if(usuario instanceof UsuarioPremium) {
                usuario.playlists.push(playlist)
                usuario.qtd_Playlists++
                resultado[i] = usuario
                banco_de_dados.set("/usuariospremium", resultado);
                return;
            }
        }
    }

    excluirPlaylist(id: string): void {
        let indice: number = this.consultarIndexPlaylist(id);
    
        if (indice != -1) {
            for (let i = indice; i < this.playlists.length; i++) {
                this.playlists[i] = this.playlists[i + 1];
            }
            this.playlists.pop();
        } else {
            throw new PlaylistNaoEncontradaError("Playlist não encontrada")
        }
    }
}

export class UsuarioFree extends Usuario {

    constructor(nome_usuario: string){
        super(nome_usuario);
    }
}

export class Musica {

    id_musica: string
    nome_musica: string;
    nome_artista: string;
    tempo_musica: string;
    anoLancamento: string;
    genero: string;
    
    constructor(nome_musica: string, nome_artista: string, 
        tempo_musica: string, anoLancamento: string, genero: string) {
        
        this.id_musica = '';
        this.nome_musica = nome_musica;
        this.nome_artista = nome_artista;
        this.tempo_musica = tempo_musica;
        this.anoLancamento = anoLancamento;
        this.genero = genero; 
    }
    
}

export class Playlist {

    id_playlist: string;
    nome_playlist: string;
    musicas: Musica[] = []
    qtd_musicas: number = 0;

    constructor(nome_playlist: string){
        this.id_playlist = ''
        this.nome_playlist = nome_playlist
    }

    inserir_musica_na_playlist(musica: Musica): void {
        this.musicas.push(musica)
        this.qtd_musicas++
    }

    remover_musica_da_playlist(musica: Musica, index: number): void {
        for(let m of this.musicas){
            if(musica.id_musica == m.id_musica) {
                this.musicas.splice(index, 1)
                this.qtd_musicas--
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

    consultarIdMusicaPlaylist(id: string): Musica {
        let musicaProcurada!: Musica;
        for (let i = 0; i < this.musicas.length; i++) {
            if (this.musicas[i].id_musica == id) {
                musicaProcurada = this.musicas[i];
            }
        }

        return musicaProcurada
    }
}

export class App implements metodosUsuario, metodosMusica {
    repUsuarioFree: UsuarioFree[] = get_UsuariosFree()
    repUsuarioPremium: UsuarioPremium[] = get_UsuariosPremium()
    repMusica: Musica[] = get_Musicas()

    consultarUsuario(usuario: Usuario): string {

        if(usuario instanceof UsuarioPremium) {
            for (let u of this.repUsuarioPremium) {
                if(u.id_usuario === usuario.id_usuario){
                    return u.id_usuario
                }
                break
            }
    
            throw new UsuarioNaoEncontradoError("Usuário não encontrado")
        } else {
            for (let u of this.repUsuarioFree) {
                if(u.id_usuario === usuario.id_usuario){
                    return u.id_usuario
                }
                break
            }
    
            throw new UsuarioNaoEncontradoError("Usuário não encontrado")
        }

    }

    consultarMusica(musica: Musica): string {
        for(let m of this.repMusica) {
            if(m.id_musica === musica.id_musica){
                return m.id_musica
            }
            break
        }

        throw new MusicaNaoEncontradaError("Música não encontrada")
    }
    
    consultarIndexUsuario(id: string): number {
        let indiceProcurado: number = -1;

        let usuario: Usuario = this.consultarIdUsuario(id)

        if(usuario instanceof UsuarioPremium) {
            for (let i = 0; i < this.repUsuarioPremium.length; i++) {
                if (this.repUsuarioPremium[i].id_usuario== id) {
                    indiceProcurado = i;
                }
            }
    
            return indiceProcurado;
        } else {
            for (let i = 0; i < this.repUsuarioFree.length; i++) {
                if (this.repUsuarioFree[i].id_usuario== id) {
                    indiceProcurado = i;
                }
            }
    
            return indiceProcurado;
        }

    }

    
    consultarIndexMusica(id: string): number {
        let indiceProcurado: number = -1;
        for (let i = 0; i < this.repMusica.length; i++) {
            if (this.repMusica[i].id_musica== id) {
                indiceProcurado = i;
            }
        }

        return indiceProcurado;
    }

    

    alterarUsuario(id: string, nome: string): void {
    
        let usuario: Usuario = this.consultarIdUsuario(id)

        if(usuario instanceof UsuarioPremium) {
            let resultado: UsuarioPremium[] = get_UsuariosPremium()
            let i: number = 0
    
            for(; i < resultado.length; i++) {
                if(resultado[i].id_usuario == id) {
                    break;
                }
            }
    
            if(i < resultado.length) {
                resultado[i].nome_usuario = nome
                banco_de_dados.set("/usuariospremium", resultado);
                return;
            }
        } else {
            let resultado: UsuarioFree[] = get_UsuariosFree()
            let i: number = 0
    
            for(; i < resultado.length; i++) {
                if(resultado[i].id_usuario == id) {
                    break;
                }
            }
    
            if(i < resultado.length) {
                resultado[i].nome_usuario = nome
                banco_de_dados.set("/usuariosfree", resultado);
                return;
            }
        }
    }
    
    alterarMusica(musica: Musica, nome: string): void {
        try{
            this.consultarMusica(musica)
            musica.nome_musica = nome
        } catch(MusicaNaoEncontrada) {
            throw new MusicaNaoEncontradaError("Música não encontrada")
        }
    }

    inserirUsuario(usuario: Usuario): void {
        if(usuario instanceof UsuarioPremium) {
            this.repUsuarioPremium.push(usuario)
        } else {
            this.repUsuarioFree.push(usuario)
        }
    }

    inserirMusica(musica: Musica): void {
        this.repMusica.push(musica)
    }

    excluirUsuario(id: string): void {
        let indice: number = this.consultarIndexUsuario(id);

        let usuario: Usuario = this.consultarIdUsuario(id)

        if(usuario instanceof UsuarioPremium) {
            if (indice != -1) {
                for (let i = indice; i < this.repUsuarioPremium.length; i++) {
                    this.repUsuarioPremium[i] = this.repUsuarioPremium[i + 1];
                }
                this.repUsuarioPremium.pop();
            } else {
                throw new UsuarioNaoEncontradoError("Usuário não encontrado")
            }
        } else {
            if (indice != -1) {
                for (let i = indice; i < this.repUsuarioFree.length; i++) {
                    this.repUsuarioFree[i] = this.repUsuarioFree[i + 1];
                }
                this.repUsuarioFree.pop();
            } else {
                throw new UsuarioNaoEncontradoError("Usuário não encontrado")
            }
        }
    
    }

    excluirMusica(id: string): void {
        let indice: number = this.consultarIndexMusica(id);
    
        if (indice != -1) {
            for (let i = indice; i < this.repMusica.length; i++) {
                this.repMusica[i] = this.repMusica[i + 1];
            }
            this.repMusica.pop();
        } else {
            throw new MusicaNaoEncontradaError("Música não encontrada")
        }
    }

    inserirFavorito(idUsuario: string, idMusica: string): void {
        let indiceUsuario: number = this.consultarIndexUsuario(idUsuario)
        let indiceMusica: number = this.consultarIndexMusica(idMusica)

        let musica = this.repMusica[indiceMusica]

        let usuario: Usuario = this.consultarIdUsuario(idUsuario)

        if(usuario instanceof UsuarioPremium) {
            if(indiceUsuario != -1 && indiceMusica != -1) {
    
                let resultado: UsuarioPremium[] = get_UsuariosPremium()
                let i: number = 0
    
                for(; i < resultado.length; i++) {
                    if(resultado[i].id_usuario == idUsuario) {
                        break;
                    }
                }
    
                if(i < resultado.length) {
                    resultado[i].favoritos.push(musica)
                    resultado[i].qtd_Favoritos++
                    banco_de_dados.set("/usuariospremium", resultado);
                    return;
                }
            } else if (indiceUsuario == -1) {
                throw new UsuarioNaoEncontradoError("Usuário não encontrado")
            } else if (indiceMusica == -1) {
                throw new MusicaNaoEncontradaError("Música não encontrada")
            }
        } else {
            if(indiceUsuario != -1 && indiceMusica != -1) {
    
                let resultado: UsuarioFree[] = get_UsuariosFree()
                let i: number = 0
    
                for(; i < resultado.length; i++) {
                    if(resultado[i].id_usuario == idUsuario) {
                        break;
                    }
                }
    
                if(i < resultado.length) {
                    resultado[i].favoritos.push(musica)
                    resultado[i].qtd_Favoritos++
                    banco_de_dados.set("/usuariosfree", resultado);
                    return;
                }
            } else if (indiceUsuario == -1) {
                throw new UsuarioNaoEncontradoError("Usuário não encontrado")
            } else if (indiceMusica == -1) {
                throw new MusicaNaoEncontradaError("Música não encontrada")
            }
        }

        
    }
    
    removerFavorito(idUsuario: string, idMusica: string): void {
        let usuario = this.consultarIdUsuario(idUsuario)
        
        if(usuario instanceof UsuarioPremium) {
            let resultado: UsuarioPremium[] = get_UsuariosPremium()
            let i: number = 0
    
            for(; i < resultado.length; i++) {
                if(resultado[i].id_usuario == idUsuario) {
                    break;
                }
            }
                
            let aux: number = 0
            if(i < resultado.length) {
                for(let k = 0; k < usuario.favoritos.length; k++) {
                    if(usuario.favoritos[k].id_musica == idMusica) {
                        aux = k
                        break
                    }
                }
    
                resultado[i].favoritos.splice(aux,1)
                resultado[i].qtd_Favoritos--
                banco_de_dados.set("/usuariospremium", resultado);
                return;
            }
        } else {
            let resultado: UsuarioFree[] = get_UsuariosFree()
            let i: number = 0
    
            for(; i < resultado.length; i++) {
                if(resultado[i].id_usuario == idUsuario) {
                    break;
                }
            }
                
            let aux: number = 0
            if(i < resultado.length) {
                for(let k = 0; k < usuario.favoritos.length; k++) {
                    if(usuario.favoritos[k].id_musica == idMusica) {
                        aux = k
                        break
                    }
                }
    
                resultado[i].favoritos.splice(aux,1)
                resultado[i].qtd_Favoritos--
                banco_de_dados.set("/usuariosfree", resultado);
                return;
            }
        }
    }

    consultarIdUsuario(id: string): UsuarioFree | UsuarioPremium {
        let usuarioProcurado!: UsuarioFree | UsuarioPremium

        for (let i = 0; i < this.repUsuarioFree.length; i++) {
            if (this.repUsuarioFree[i].id_usuario == id) {
                usuarioProcurado = this.repUsuarioFree[i];
            }
        }

        if(usuarioProcurado == null) {
            for (let i = 0; i < this.repUsuarioPremium.length; i++) {
                if (this.repUsuarioPremium[i].id_usuario == id) {
                    usuarioProcurado = this.repUsuarioPremium[i];
                }
            }
        }

        return usuarioProcurado
    }

    consultarIdMusica(id: string): Musica {
        let musicaProcurada!: Musica;
        for (let i = 0; i < this.repMusica.length; i++) {
            if (this.repMusica[i].id_musica == id) {
                musicaProcurada = this.repMusica[i];
            }
        }

        return musicaProcurada
    }
}

interface metodosUsuario{
    consultarUsuario(usuario: Usuario): string
    consultarIdUsuario(id: string) : UsuarioFree | UsuarioPremium
    consultarIndexUsuario(id: string): number
    alterarUsuario(id: string, nome: string): void
    inserirUsuario(usuario: Usuario): void
    excluirUsuario(id: string): void 
    inserirFavorito(idUsuario: string, idMusica: string): void   
}
interface metodosMusica{
    consultarMusica(musica: Musica): string
    consultarIdMusica(id: string) : Musica
    consultarIndexMusica(id: string): number 
    alterarMusica(musica: Musica, nome: string): void
    inserirMusica(musica: Musica): void
    excluirMusica(id: string): void    
}