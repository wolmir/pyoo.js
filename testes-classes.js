(function() {
'use strict';





describe('Uma classe', function() {



    it('deve ser declarada sem erros', function() {
        expect(function() {
            var CCobaia = Classe({
                __init__: function(self) {
                    self.atributo_cobaia = 'valor de teste';
                },

                metodo_cobaia: function(self) {
                    console.log(self.atributo_cobaia);
                }
            });
        }).not.toThrow();
    });



    it('não pode ser declarada sem argumentos', function() {
        expect(function() {
            Classe();
        }).toThrowError('pyoo.js: Esperado object, obteve undefined.');
    });



    it('não pode ser declarada com um argumento que não seja object', function() {
        var args = ['teste', 1, function() {}, -1, 4.678];

        _(args).each(function(arg) {
            expect(function() {
                Classe(arg);
            }).toThrowError('pyoo.js: Esperado object, obteve ' + (typeof arg) + '.');
        });

        expect(function() {
            Classe([1,2]);
        }).toThrowError('pyoo.js: Esperado object, obteve Array.');

        expect(function() {
            Classe(null);
        }).toThrowError('pyoo.js: Esperado object, obteve null.');
    });



    it('deve ser instanciada sem erros', function() {
        var CCobaia = Classe({
            __init__: function(self) {
                self.atributo_cobaia = 'valor de teste';
            },

            metodo_cobaia: function(self) {
                console.log(self.atributo_cobaia);
            }
        });

        expect(function() {
            var icobaia = CCobaia();
        }).not.toThrow();
    });



    it('deve possiblitar sua declaração sem uma função __init__', function() {
        expect(function() {
            Classe({
                metodo: function(self) {}
            });
        }).not.toThrow();
    });



    it('deve possiblitar sua instanciação sem uma função __init__', function() {
        expect(function() {
            Classe({
                metodo: function(self) {}
            })();
        }).not.toThrow();
    });



    it('não deve permitir, em sua declaração, métodos com menos de um argumento', function() {
        expect(function() {
            Classe({
                metodoParaDarErro: function() {}
            });
        }).toThrowError('pyoo.js: Um método deve aceitar, no mínimo, o argumento self.');
    });
});






describe('Uma instância de classe', function() {

    var CCobaia = Classe({
        __init__: function(self) {
            self.atributo_cobaia = 'valor de teste';
        },

        metodo_cobaia: function(self) {
            return (self.atributo_cobaia);
        }
    });

    var icobaia = CCobaia();



    it('deve existir', function() {
        expect(icobaia).toBeDefined();
        expect(icobaia).not.toBe(null);
    });



    it('deve conter as propriedades declaradas na classe', function() {
        expect(icobaia.atributo_cobaia).toBeDefined();
        expect(icobaia.metodo_cobaia).toBeDefined();
    });



    it('deve conter métodos que se comportem como esperado', function() {
        expect(function() {
            icobaia.metodo_cobaia();
        }).not.toThrow();

        expect(icobaia.metodo_cobaia()).toBeDefined();

        expect(icobaia.metodo_cobaia()).toBe('valor de teste');
    });



    it('deve aceitar argumentos em __init__', function() {

        var CCobaia = Classe({
            __init__: function(self, a, b) {
                self.c = a + b;
            }
        });

        expect(function() {
            CCobaia();
        }).not.toThrow();

        expect(CCobaia(4, 9)).toBeDefined();
        expect(CCobaia(4, 9)).not.toBe(null);

        expect(CCobaia(4, 9).c).toBeDefined();
        expect(CCobaia(4, 9).c).toBe(13);
    });





    describe('declarada sem uma função __init__', function() {

        var CCobaiaSemInit = Classe({
            a: 1,
            b: 2,
            metodo: function(self) {
                return self.a + self.b;
            }
        });



        it('deve existir', function() {
            expect(CCobaiaSemInit()).toBeDefined();
            expect(CCobaiaSemInit()).not.toBe(null);
        });



        it('deve conter as propriedades definidas em sua declaração', function() {
            var icobaiaSemInit = CCobaiaSemInit();

            expect(icobaiaSemInit.a).toBeDefined();
            expect(icobaiaSemInit.b).toBeDefined();
            expect(icobaiaSemInit.metodo).toBeDefined();

            expect(icobaiaSemInit.a).toBe(1);
            expect(icobaiaSemInit.b).toBe(2);
            expect(icobaiaSemInit.metodo()).toBe(3);
        });

    });
});

})();
