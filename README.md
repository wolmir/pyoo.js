# pyoo.js

Uma biblioteca *JavaScript* que oferece orientação a objetos
no estilo *Python*.

A versão atual contém uma implementação de classe simples, sem herança, e
de interfaces, embora estas últimas não existam no Python.

## Exemplo

### Python

```python
class Foo:
    def __init__(self, b):
        self.a = b

    def metodo1(self, c):
        return self.a + c

j = Foo(6)

# Escreve 10
print j.metodo1(4)
```

### JavaScript

```javascript
var Foo = Class({
    __init__: function(self, b) {
        self.a = b;
    },

    metodo1: function(self, c) {
        self.a = 3
        return(self.a + c);
    }
});

var j = Foo(6)

// Escreve 10
console.log(j.metodo1(4));
```

## Documentação

### Interfaces

```javascript
//Declara uma interface com dois métodos
var IExemplo = Interface(['metodo1', 'metodo2']);
```

### Classes

```javascript
var CExemplo = Classe({
    __init__: function(self) {
        self.attr1 = 'Olá';
        self.attr2 = 'Mundo';
    },

    metodoExemplo: function(self) {
        return self.attr1 + ', ' + self.attr2 + '!';
    }
});

var objExemplo = CExemplo();
console.log(objExemplo.metodoExemplo());
```
