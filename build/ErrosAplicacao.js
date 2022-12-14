"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BancodeDadosError = exports.FormatoInvalidoError = exports.PlaylistJaCriadaError = exports.PlaylistNaoEncontradaError = exports.MusicaJaCadastradaError = exports.MusicaNaoEncontradaError = exports.UsuarioJaCadastradoError = exports.UsuarioNaoEncontradoError = void 0;
class UsuarioNaoEncontradoError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UsuarioNaoEncontradoError = UsuarioNaoEncontradoError;
class UsuarioJaCadastradoError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.UsuarioJaCadastradoError = UsuarioJaCadastradoError;
class MusicaNaoEncontradaError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.MusicaNaoEncontradaError = MusicaNaoEncontradaError;
class MusicaJaCadastradaError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.MusicaJaCadastradaError = MusicaJaCadastradaError;
class PlaylistNaoEncontradaError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.PlaylistNaoEncontradaError = PlaylistNaoEncontradaError;
class PlaylistJaCriadaError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.PlaylistJaCriadaError = PlaylistJaCriadaError;
class FormatoInvalidoError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.FormatoInvalidoError = FormatoInvalidoError;
class BancodeDadosError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.BancodeDadosError = BancodeDadosError;
