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



function Classe() {
    'use strict';

    if (arguments.length === 0) {
        throw new Error('pyoo.js: Esperado object, obteve undefined.');
    }

    var corpo = arguments[0];

    if (arguments.length > 1) {
        corpo = arguments[arguments.length - 1];
    }

    if (!corpo) {
        throw new Error('pyoo.js: Esperado object, obteve undefined.');
    }

    if ((typeof corpo) !== "object") {
        throw new Error('pyoo.js: Esperado object, obteve ' + (typeof corpo) + '.');
    }

    if (Array.isArray(corpo)) {
        throw new Error('pyoo.js: Esperado object, obteve Array.');
    }

    var argumentos = Array.prototype.slice.call(arguments);

    _(argumentos).initial().each(function(valor) {
        if (!valor.__superclasses) {
            throw new Error('pyoo.js: Esperado Classe, obteve ' + (typeof valor));
        }
    });

    // Verifica se algum método declarado não possui o argumento self
    _(corpo).each(function(valor) {
        if ((typeof valor) === "function") {
            if (valor.length < 1) {
                throw new Error('pyoo.js: Um método deve aceitar, no mínimo, o argumento self.');
            }
        }
    });

    // Retorna uma função equivalente a um construtor.
    var classe = (function() {
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

    classe.__superclasses = [Classe];

    return classe;
}
