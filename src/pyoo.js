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

    // Gambiarra velha. Transforma 'arguments' em um Array.
    var argumentos = Array.prototype.slice.call(arguments);

    // Os primeiros argumentos de Classe são as superclasses.
    // Portanto, para cada elemento de 'argumentos', exceto o último...
    _(argumentos).initial().each(function(valor) {
        // Certifica que a superclasse existe...
        if ((!valor) || (valor === null)) {
            throw new Error('pyoo.js: Superclasse inválida, obteve ' + valor);
        }
        
        // Certifica que a superclasse é do tipo 'Classe'.
        if (!valor.__superclasses) {
            throw new Error('pyoo.js: Esperado Classe, obteve ' + (typeof valor));
        }
    });

    // Verifica se algum método declarado não possui o argumento self
    // Desnecessário, por ser opcional
    // _(corpo).each(function(valor) {
    //     if ((typeof valor) === "function") {
    //         if (valor.length < 1) {
    //             throw new Error('pyoo.js: Um método deve aceitar, no mínimo, o argumento self.');
    //         }
    //     }
    // });

    // Armazena as propriedades estáticas
    var __estatico = {};
    // Armazena as superclasses
    var __superclasses = _(argumentos).initial();

    // Copia todas as propriedades estáticas de cada superclasse,
    // exceto a propriedade '__superclasses' para evitar referências
    // circulares.
    _(__superclasses).each(function(superclasse) {
        _(superclasse).omit(['__superclasses']).each(function(valor, atributo) {
            __estatico[atributo] = valor;
        });
    });

    // As propriedades do corpo são, por definição, estáticas.
    // Isso inclui os métodos, o que difere da metodologia
    // do Python. No entanto, acho uma vantagem não precisar
    // de decoradores.
    _(corpo).each(function(valor, atributo) {
        __estatico[atributo] = valor;
    });

    // O construtor
    var __classe = (function() {
        var self = {};

        // Copia as propriedades estáticas para 'self'
        // Se for um método, ele é armazenado na parte estática.
        // Quando o método for invocado pela instência,
        // a função estática é invocada passando o 'self'
        // como primero parâmetro
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

        // Invoca o método __init__
        if (__estatico.__init__) {
            __estatico.__init__.apply(self, [self].concat(Array.prototype.slice.call(arguments)));
        }

        // Retorna o 'self' configurado e com
        // o escopo 'bindado', o que possibilita todas
        // essas gambiarras.
        return self;
    });

    // Copia o corpo estático para a função construtora
    // Também seta a propriedade '__superclasses__'
    __classe.__superclasses = __superclasses;
    _(__estatico).each(function(valor, atributo) {
        __classe[atributo] = valor;
    });

    return __classe;
}

module.exports = Classe;
