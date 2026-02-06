
# M4 — Pokédex 


## Descripción
  Pokédex proyecto estudiantil para poner en practica los contenidos del modulo 4 en relación al consumo de las API Rest atraves de fetch y asyn/await. este proyecto contiene los primeros 9 pokémones de la lista y 3 adicionales del tipo psiquico.

## Tecnologías utilizadas
- HTML5. 
- CSS3. 
- Bootstrap 5.
- JavaScript ES6+. 
- ![PokeAPI](https://pokeapi.co/).

## Estructura edl Proyecto
M4-pokedex-api/
│
├─ assets/
│   ├─ img/      # Imágenes del proyecto (pikachu, charizard, etc.)
│   ├─ css/      # Estilos CSS (styles.css)
│   └─ js/       # Lógica JavaScript (app.js)
│
├─ index.html    # Página principal
└─ README.md     # Documentación del proyecto

## Funcionalidades

- Muestra una lista de 9 Pokémon iniciales y algunos de tipo psiquico.
- Renderizado dinámico de cards con nombre, imagen, ID y tipo.
- Búsqueda en tiempo real: filtra Pokémon por nombre mientras escribes.
- Alerta con mensaje cuando no se encuentra el Pokémon.
- Hacer clic en la Pokébola de la card para abrir el modal con detalles.
- Diseño responsive, adaptable a pantallas pequeñas.

# Manejo de errores![alt text](image.png)
 El proyecto implementa manejo de errores básico enfocado en la experiencia del usuario:

- Uso de try / catch en la carga inicial de datos para detectar fallos en la PokeAPI.
- Mensaje visual cuando no es posible obtener los Pokémon.
- Validación del campo de búsqueda para evitar resultados inválidos.
- Alerta visual cuando no se encuentran coincidencias en la búsqueda.
- El modal utiliza datos previamente cargados, por lo que no se implementó manejo de errores  adicional en esta sección.

## Capturas
- 

 

# Ver Proyecto
-![Link al Proyecto]( ).

## Créditos
- Datos e imágenes obtenidos desde la PokeAPI 
- Proyecto educativo Sence – Módulo 4
 
