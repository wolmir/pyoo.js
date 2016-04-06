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
var Foo = Class({
    __init__: function(self, b) {
        self.a = b;
    },

    metodo1: function(self) {
        self.a = 3
        return(self.a + 4);
    }
});

var j = Foo(6)

// Escreve 10
console.log(j.metodo1(4));
```
