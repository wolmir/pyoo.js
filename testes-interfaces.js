(function() {
'use strict';
describe("Uma interface", function() {

    it("deve ser declarada sem erros", function() {
        expect(function() {
            return Interface(['a', 'b', 'c']);
        }).not.toThrow();
    });

    it("não pode ser declarada sem argumentos", function() {

        var msg_erro = 'pyoo.js: Erro na declaração de interface.' +
            ' Esperado um Array, obteve undefined.';

        expect(function() {
            return Interface();
        }).toThrowError(msg_erro);
    });

    it("não pode ser declarada com um argumento que não seja um Array", function() {

        var msg_erro = 'pyoo.js: Erro na declaração de interface.' +
            ' Esperado um Array, obteve string.';

        expect(function() {
            return Interface('abc');
        }).toThrowError(msg_erro);
    });

    it("deve retornar um objeto", function() {
        var cobaia = Interface(['a']);

        expect(cobaia).toBeDefined();
        expect(cobaia).not.toBe(null);
        expect(typeof cobaia).toBe('object');
    });

    it("deve retornar um objeto com métodos cujos nomes estavam no Array", function() {

        var cobaia = Interface(['a', 'b', 'c']);
        expect(cobaia.a).toBeDefined();
        expect(cobaia.b).toBeDefined();
        expect(cobaia.c).toBeDefined();
        expect(cobaia.d).not.toBeDefined();

    });

    it("deve retornar um objeto com métodos que não podem ser invocados diretamente", function() {
        var cobaia = Interface(['a', 'b', 'c']);

        expect(function() {cobaia.a();}).toThrowError('pyoo.js: Método não implementado.');
        expect(function() {cobaia.b();}).toThrowError('pyoo.js: Método não implementado.');
        expect(function() {cobaia.c();}).toThrowError('pyoo.js: Método não implementado.');
    });
});
})();
