describe("Uma interface", function() {

    it("deve ser declarada sem erros,", function() {
        expect(function() {
            return Interface(['a', 'b', 'c']);
        }).not.toThrow();
    });

    it("e não pode ser declarada sem argumentos", function() {

        var msg_erro = 'pyoo.js: Erro na declaração de interface.' +
            ' Esperado um Array, obteve undefined.';

        expect(function() {
            return Interface();
        }).toThrowError(msg_erro);
    });

    it("ou cujo argumento não seja um Array,", function() {

        var msg_erro = 'pyoo.js: Erro na declaração de interface.' +
            ' Esperado um Array, obteve string.';

        expect(function() {
            return Interface('abc');
        }).toThrowError(msg_erro);
    });

    it("e deve retornar um objeto", function() {
        var cobaia = Interface(['a']);

        expect(cobaia).toBeDefined();
        expect(cobaia).not.toBe(null);
        expect(typeof cobaia).toBe('object');
    });

    it("com métodos cujos nomes estavam no Array", function() {

        var cobaia_com_um_metodo = Interface(['a']);
        expect(cobaia_com_um_metodo.a).toBeDefined();

    });
});
