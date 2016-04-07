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



function Classe(corpo) {
    'use strict';

    if (!corpo) {
        throw new Error('pyoo.js: Esperado object, obteve undefined.');
    }

    if ((typeof corpo) !== "object") {
        throw new Error('pyoo.js: Esperado object, obteve ' + (typeof corpo) + '.');
    }

    if (Array.isArray(corpo)) {
        throw new Error('pyoo.js: Esperado object, obteve Array.');
    }

    // Retorna uma função equivalente a um construtor.
    return (function() {
        var self = {};
        var __metodos = {};

        // copia os atributos definidos no corpo da classe para self.
        // Os métodos resultantes são closures que invocam os métodos originais
        // com self.
        _(corpo).each(function(valor, atributo) {
            if ((typeof valor) === "function") {
                __metodos['__' + atributo] = valor;
                self[atributo] = function() {
                    return __metodos['__' + atributo].
                        apply(self, [self].concat(Array.prototype.slice.call(arguments)));
                };
            }

            else {
                self[atributo] = valor;
            }
        });

        if (corpo.__init__)
            corpo.__init__(self);

        return self;
    });
}
