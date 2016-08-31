var _ = require('lodash');

function Classe() {
    'use strict';

    if (arguments.length === 0) {
        throw new Error('pyoo.js: Esperado object, obteve undefined.');
    }

    var corpo = arguments[0];

    if (arguments.length > 1) {
        corpo = arguments[arguments.length - 1];
    }

    if (corpo === null) {
        throw new Error('pyoo.js: Esperado object, obteve null.');
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
        if ((!valor) || (valor === null)) {
            throw new Error('pyoo.js: Superclasse inválida, obteve ' + valor);
        }
        
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

    var __estatico = {};
    var __superclasses = _(argumentos).initial();

    _(__superclasses).each(function(superclasse) {
        _(superclasse).omit(['__superclasses']).each(function(valor, atributo) {
            __estatico[atributo] = valor;
        });
    });

    _(corpo).each(function(valor, atributo) {
        __estatico[atributo] = valor;
    });

    var __classe = (function() {
        var self = {};

        _(__estatico).each(function(valor, atributo) {
            if ((typeof valor) === "function") {
                self[atributo] = function() {
                    return __estatico[atributo].
                        apply(self, [self].concat(Array.prototype.slice.call(arguments)));
                };
            }

            else {
                self[atributo] = valor;
            }
        });

        if (__estatico.__init__) {
            __estatico.__init__.apply(self, [self].concat(Array.prototype.slice.call(arguments)));
        }
        return self;
    });

    __classe.__superclasses = __superclasses;
    _(__estatico).each(function(valor, atributo) {
        __classe[atributo] = valor;
    });

    return __classe;
}

module.exports = Classe;
