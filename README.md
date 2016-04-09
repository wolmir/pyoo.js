# pyoo.js

Uma biblioteca *JavaScript* que oferece orientação a objetos
no estilo *Python*.


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
var Foo = Classe({
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

### Setup

A pyoo.js depende da lodash. Portanto ela deve ser inclusa primeiro.

```html
<script type="text/javascript" src="lodash.js"></script>
<script type="text/javascript" src="pyoo.js"></script>
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

### Herança

As classes suportam múltipla herança e múltiplos níveis de herança.

```javascript
var Animal = Classe({
    __init__: function(self, nome) {
        self.nome = nome;
    },

    falar: function(self) {
        return 'Olá, meu nome é ' + self.nome + '!';
    }
});


var Reptil = Classe(Animal, {
    __init__: function(self, nome) {
        Animal.__init__(self, nome);
    },

    falar: function(self) {
        var fala_animal = Animal.falar(self);
        return fala_animal + ' Eu sou um réptil!'
    }
});
```



## Funcionalidades Futuras

* Variáveis privadas
* isinstance()
* issubclass()
* Decoradores
