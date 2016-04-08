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
        pending('Se o spec anterior não funcionar, este não vai funcionar também.');
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

        expect();

    });



});

})();
