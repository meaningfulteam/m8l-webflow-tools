# **Meaningful | Tiempo de lectura automático**

Usualmente los artículos de blog en internet, poseen un indicador del tiempo de lectura para que los usuarios puedan identificar el tiempo de consumo estimado al momento de considerar leer un determinado contenido.

En muchas ocasiones, los Blog que se encuentran construidos dentro de Webflow, incorporan un campo de "CMS" en el que, el administrador del blog, declara el tiempo de lectura estimado del artículo. Dicha práctica puede ser muy manual y un tanto tediosa de realizar. Es por ello que desde m8l, desarrollamos una funcionalidad para calcular el tiempo de lectura de nuestros artículos del blog, de forma automática.

&nbsp;

---

&nbsp;

## **Primeros pasos**

&nbsp;

Para instalar la funcionalidad de tiempo de lectura dentro de tu página de artículos del blog, sigue los pasos que te describimos a continuación:

&nbsp;

![Reading time block on a blog post](../assets/readingTime/readingTime-example.png "Reading time block on a blog post.")

&nbsp;

### **Paso 1:** _*Agregar atributos*_.

Para que esta funcionalidad, se encuentre correctamente configurada, es necesario identificar los siguientes elementos dentro de nuestro proyecto:

&nbsp;

#### **Cuerpo del artículo**:

Corresponde a las fuentes de información que contendrán todo el contenido de nuestro artículo. Es todo el contenido sobre el cual queremos estimar el tiempo total de lectura.

Para la identificación de estos elementos, se utilizará el atributo:

```
 m8l-readingTime = 'content'
```

El mismo se deberá colocar a los elementos que queremos vincular en el cálculo del tiempo de lectura, tal como se muestra en la imagen a continuación:

![Set an article body attribute](../assets/readingTime/readingTime-articleBody.png "Set an article body attribute")

&nbsp;

#### **Indicadores**:

Corresponden a los bloques de texto que queremos utilizar como indicador de tiempo de lectura en nuestros artículos del blog.

Para la identificación de estos elementos, se utilizará el atributo:

```
 m8l-readingTime = 'label'
```

El mismo se deberá colocar a los elementos con los que queremos mostrar el tiempo de lectura, tal como se muestra en la imagen a continuación:

![Set label attribute](../assets/readingTime/readingTime-label.png "Set label attribute")

&nbsp;

**PD:** Podemos añadir más de un indicador y más de una fuente de contenido. Para ello, solo debemos asignar los atributos tal como lo hicimos con los primeros elementos. Los mismos funcionarán bajo las siguientes premisas:

-   Todos los elementos de contenido vinculados contarán para el tiempo de lectura total.
-   Todos los elementos de indicador vinculados, mostrarán el mismo tiempo de lectura total.

&nbsp;

### **Paso 2:** _*Variable de configuración de m8l*_.

A continuación, procederemos con la implementación de variable de configuración dentro de nuestro proyecto. Para ello deberemos copiar y pegar el siguiente bloque de código dentro de nuestra etiqueta `<head>`:

```html
<script>
    var m8lConfig = {
        readingTime: {},
    };
</script>
```

&nbsp;

### **Paso 3:** _*Instalación*_.

A continuación, procederemos con la instalación del script de funcionalidad. Para ello deberemos copiar y pegar el siguiente bloque de código dentro de nuestra etiqueta `<head>`:

```html
<!-- [Start: Reading time Script] -->
<script defer type="module" src="https://cdn.jsdelivr.net/gh/meaningfulteam/m8l-webflow-tools@latest/tools/ReadingTime/m8l-readingTime.js"></script>
<!-- [End: Reading time Script] -->
```
