# clima_mx

Aplicación para la visualización de datos del pronóstico del clima para México a través del API del SMN. 

Esta aplicación esta hecha con NextJS, React, TailwindCSS, DaisyUI y Python.

## Copyright
Todos los derechos reservados cdelaof26 y ZeroMaru001

## Historial de cambios

#### v0.1.0
- Se agregó el script `deploy` en `package.json`

#### v0.0.9
- Se quitó el `typing` de Python ya que las versiones anteriores a 3.9 no lo soportan
- Se corrigió problema con el componente de presentación donde el texto no se visualizaba correctamente
  al hacer más pequeño el navegador de forma vertical

#### v0.0.8
- Se renombró el componente `Pronostico` por `pronostico` y se movió al directorio `componentes`
- Se agregó sección de notas de prensa del SMN (Servicio Meteorológico Nacional)
- Se agregaron validaciones requeridas para el despliegue con `npm run build`
- Se cambio el puerto de inicio del servidor de desarrollo y producción a 8080
  - **Se requiere del redireccionamiento del puerto 80 a 8080 en producción**
- Se agregó mensaje de error en caso de que no se puedan recuperar los datos del clima
- Se agregó un _footer_

#### v0.0.7
- Se quitó el directorio de `.idea` del repositorio
- Se mejoró el diseño responsivo para algunas resoluciones de pantalla
- Se agregó sección de presentación de la _empresa_
- Se cambio el icono de favoritos

#### v0.0.6
- Carga y muestra datos de un municipio según su estado

#### v0.0.5
- Se agregó API pública para obtener los datos de los JSON generados
- Se documento un poco el código

#### v0.0.4
- Mejora de la muestra de los datos del pronóstico
- Descarga de FontAwesome de forma local, **requiere que wget y unzip estén instalados**
- Los mensajes de ejecución de scripts en Python ahora son un poco más descriptivos
- El fondo donde se muestran los datos del clima ahora es dinámico
- Al seleccionar un estado, se cargan los municipios disponibles [WIP]

#### v0.0.3
- Se dividieron componentes
- Carga y muestra mínima de datos: CDMX, Gustavo A. Madero

#### v0.0.2
- Se agregó una vista básica y selectores [WIP]

#### v0.0.1
- Proyecto inicial
