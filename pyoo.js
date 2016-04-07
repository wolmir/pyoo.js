function Interface(metodos) {
    if (arguments.length == 0) {
        throw new Error('pyoo.js: Erro na declaração de interface. Esperado um Array, obteve undefined.');
    }

    if (!Array.isArray(metodos)) {
        var msg_erro = 'pyoo.js: Erro na declaração de interface. Esperado um Array, obteve ' +
            (typeof metodos) + '.';
        throw new Error(msg_erro);
    }

    var _interface = {};
    
    return {};
}
