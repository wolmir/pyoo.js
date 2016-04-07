function Interface(metodos) {
    'use strict';
    if (arguments.length === 0) {
        throw new Error('pyoo.js: Erro na declaração de interface. Esperado um Array, obteve undefined.');
    }

    if (!Array.isArray(metodos)) {
        var msg_erro = 'pyoo.js: Erro na declaração de interface. Esperado um Array, obteve ' +
            (typeof metodos) + '.';
        throw new Error(msg_erro);
    }

    var _interface = {};

    _(metodos).each(function(nome) {
        _interface[nome] = function() {
            throw new Error('pyoo.js: Método não implementado.');
        };
    });

    return _interface;
}
