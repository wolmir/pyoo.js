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

    });



});

})();
