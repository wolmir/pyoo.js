(function() {
'use strict';





describe('Uma subclasse', function() {



    it('deve ser declarada sem erros', function() {

        expect(function() {
            var CSuper = Classe({
                __init__: function(self) {
                    self.a = 2;
                },

                metodo: function(self) {
                    return self.a;
                }
            });

            var CSub = Classe(CSuper, {
                __init__: function(self) {
                    invocaSuper();
                    self.b = 4;
                },

                metodo: function(self) {
                    return self.b + self.a;
                }
            });
        }).not.toThrow();

    });



    it('não poder ser declarada com superclasses inexistentes', function() {
        expect(function() {
            var CCobaia = Classe(undefined, {});
        }).toThrowError('pyoo.js: Superclasse inválida, obteve undefined');

        expect(function() {
            var CCobaia = Classe(null, {});
        }).toThrowError('pyoo.js: Superclasse inválida, obteve null');
    });



    it('deve ser instanciada sem erros', function() {
        var CSuper = Classe({
            __init__: function(self) {
                self.a = 2;
            },

            metodo: function(self) {
                return self.a;
            }
        });

        var CSub = Classe(CSuper, {
            __init__: function(self) {
                self.b = 4;
            },

            metodo: function(self) {
                return self.b + self.a;
            }
        });

        expect(function() {
            CSub();
        }).not.toThrow();

        expect(CSub()).toBeDefined();
        expect(CSub()).not.toBe(null);
    });



    it('deve herdar as propriedades da classe mãe', function() {
        var CSuper = Classe({
            a: 2,
            __init__: function(self) {

            },

            metodo1: function(self) {
                return self.a + 3;
            }
        });

        var CSub = Classe(CSuper, {
            __init__: function(self) {
                self.b = 4;
            },

            metodo2: function(self) {
                return self.b + self.a;
            }
        });

        expect(CSub().a).toBeDefined();
        expect(CSub().a).toBe(2);
        expect(CSub().metodo2()).toBe(6);

    });



    it('deve herdar os métodos da classe mãe', function() {
        var CSuper = Classe({
            a: 2,
            __init__: function(self) {

            },

            metodo1: function(self) {
                return self.a + 3;
            }
        });

        var CSub = Classe(CSuper, {
            __init__: function(self) {
                self.b = 4;
            },

            metodo2: function(self) {
                return self.b + self.a;
            }
        });


        expect(CSub().metodo1).toBeDefined();

        expect(function() {
            CSub().metodo1();
        }).not.toThrow();

        expect(CSub().metodo1()).toBe(5);
    });



    it('deve poder sobrecarregar os métodos da classe mãe', function() {
        var CSuper = Classe({
            a: 2,
            __init__: function(self) {

            },

            metodo1: function(self) {
                return self.a + 3;
            }
        });

        var CSub = Classe(CSuper, {
            __init__: function(self) {
                self.b = 4;
            },

            metodo1: function(self) {
                return self.b + self.a;
            }
        });

        expect(function() {
            CSub().metodo1();
        }).not.toThrow();

        expect(CSub().metodo1()).toBe(6);
    });



    it('deve poder invocar os métodos originais da classe mãe', function() {

        var CSuper = Classe({
            a: 'teste1',
            __init__: function(self) {

            },

            metodo1: function(self) {
                return self.a + ' teste2';
            }
        });

        var CSub = Classe(CSuper, {
            __init__: function(self) {
                self.b = ' teste3';
            },

            metodo1: function(self) {
                return CSuper.metodo1(self) + self.b;
            }
        });


        expect(function() {
            CSub().metodo1();
        }).not.toThrow();

        expect(CSub().metodo1()).toBe('teste1 teste2 teste3');
    });



    it('deve poder invocar o construtor da classe mãe', function() {

        var CSuper = Classe({
            __init__: function(self, a) {
                self.a = a;
            }
        });

        var CSub = Classe({
            __init__: function(self, b) {
                CSuper.__init__(self, b);
            }
        });


        expect(function() {
            CSub(2);
        }).not.toThrow();

        expect(CSub(2).a).toBe(2);
    });



    it('deve evitar dependências cíclicas', function() {
        expect(function() {

            var CSuper = Classe(CSub, {
                a: 2
            });

            var CSub = Classe(CSuper, {
                a: 3
            });
        }).toThrowError('pyoo.js: Superclasse inválida, obteve undefined');
    });



});





describe('A subclasse de uma subclasse', function() {

    it('deve ser declarada sem erros', function() {
        var CSuper = Classe({
            a: 'teste1',

            metodo: function(self) {
                return self.a;
            }
        });

        var CSub = Classe(CSuper, {
            b: 'teste2',

            metodo: function(self) {
                return self.a + self.b;
            }
        });

        expect(function() {
            var CSubSub = Classe(CSub, {
                __init__: function(self) {
                    self.c = self.a + self.b;
                }
            });
        }).not.toThrow();
    });



    it('deve herdar as propriedades da classe avó', function() {
        var CSuper = Classe({
            a: 'teste1',

            metodo: function(self) {
                return self.a;
            }
        });

        var CSub = Classe(CSuper, {
            b: 'teste2',

            metodo: function(self) {
                return self.a + self.b;
            }
        });

        var CSubSub = Classe(CSub, {
            metodo: function(self) {
                return self.a + ' ' + self.b;
            }
        });

        expect(CSubSub().a).toBeDefined();
        expect(CSubSub().metodo()).toBe('teste1 teste2');
    });
});

})();
