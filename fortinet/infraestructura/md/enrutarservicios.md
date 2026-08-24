# Enrutamiento por servicios de Internet en FortiGate

## 1. Introducción

### 1.1. ¿Qué es?

- Es una forma de crear rutas estáticas basadas en un **servicio de Internet**.
- En lugar de indicar manualmente una dirección o red de destino, se selecciona un servicio reconocido por FortiGate.
- FortiGate incluye una base de datos con numerosos servicios precargados.

### 1.2. ¿Para qué sirve?

- Permite enviar el tráfico de un servicio concreto por un enlace determinado.
- Resulta útil cuando existen varios proveedores de Internet o enlaces dedicados.
- Facilita la aplicación de decisiones de enrutamiento específicas para determinados servicios.

> **Idea clave:** se puede indicar que el tráfico dirigido a un servicio de Internet concreto salga por ISP1, ISP2 u otro enlace disponible.

---

## 2. Internet Service Database

### 2.1. Definición

- La **Internet Service Database (ISDB)** es una base de datos utilizada por FortiGate.
- Agrupa direcciones IP, rangos y otros datos asociados a servicios conocidos de Internet.
- Contiene entradas de proveedores y plataformas como Google, Microsoft, Amazon y otros servicios públicos.

### 2.2. Ventaja principal

- No es necesario introducir manualmente todas las direcciones IP utilizadas por un servicio.
- FortiGate utiliza la información almacenada en su base de datos para reconocer el destino.

### 2.3. Requisito

- El equipo debe disponer de acceso a la información de servicios de Internet correspondiente.
- En el laboratorio de la clase no puede probarse correctamente debido a las limitaciones de la licencia de evaluación.
- Si FortiGate no puede consultar o actualizar esta información, podría no reconocer el destino y la ruta no se aplicaría.

---

## 3. Creación de una ruta por servicio de Internet

### 3.1. Acceso al menú

1. Ir a **Network**.
2. Entrar en **Static Routes**.
3. Seleccionar **Create New**.
4. Activar o seleccionar la opción **Internet Service**.

### 3.2. Campos principales

- **Internet Service:** servicio que se desea enrutar.
- **Interface:** interfaz de salida.
- **Gateway:** siguiente salto correspondiente al proveedor elegido.
- Otros atributos de la ruta, si fueran necesarios.

### 3.3. Funcionamiento

- FortiGate identifica el tráfico que pertenece al servicio seleccionado.
- Después, utiliza la interfaz y el *gateway* configurados en la ruta.
- La ruta se interpreta de forma similar a cualquier otra ruta estática, pero su destino se basa en un servicio reconocido por la ISDB.

---

## 4. Ejemplo: DNS de Google por ISP2

### 4.1. Objetivo

- Enviar el tráfico destinado a los servidores DNS de Google por el segundo enlace de Internet.

### 4.2. Configuración de ejemplo

| Campo | Valor |
|---|---|
| Internet Service | Servicio DNS de Google |
| Interfaz de salida | Puerto 3 / ISP2 |
| Gateway | Gateway de ISP2 |

### 4.3. Interpretación

- Cuando un equipo interno intente llegar al servicio DNS de Google, FortiGate deberá identificar ese destino mediante la ISDB.
- El tráfico se enviará por **ISP2**, utilizando el **puerto 3** y su *gateway*.

### 4.4. Flujo esperado

1. El servidor interno genera una consulta hacia el DNS de Google.
2. FortiGate reconoce que el destino pertenece al servicio seleccionado.
3. La ruta por servicio de Internet coincide con el tráfico.
4. El paquete sale por ISP2.

```text
Servidor interno
      ↓
Servicio DNS de Google
      ↓
Ruta basada en Internet Service
      ↓
Puerto 3 → Gateway ISP2 → Internet
```

---

## 5. Ejemplo adicional: Microsoft 365 por un enlace dedicado

### 5.1. Escenario

- Una empresa dispone de dos salidas:
  - ISP1 para la navegación general.
  - ISP2 para aplicaciones corporativas.

### 5.2. Objetivo

- Enviar el tráfico reconocido como Microsoft 365 por ISP2.
- Mantener el resto de la navegación por ISP1.

### 5.3. Resultado esperado

- Microsoft 365 utiliza ISP2.
- Los destinos no incluidos en ese servicio continúan utilizando la ruta por defecto de ISP1.

---

## 6. Ejemplo adicional: servicio en la nube por una salida concreta

### 6.1. Escenario

- La organización utiliza un servicio en la nube que funciona mejor mediante un proveedor específico.

### 6.2. Configuración conceptual

- Seleccionar el servicio de Internet correspondiente.
- Elegir la interfaz conectada al proveedor deseado.
- Configurar su *gateway*.

### 6.3. Posibles motivos

- Mejor rendimiento.
- Menor latencia.
- Acuerdo comercial con un proveedor.
- Separación del tráfico corporativo.
- Uso de un enlace dedicado.

---

## 7. Comportamiento sin licencia o sin datos actualizados

### 7.1. Problema del laboratorio

- La licencia de evaluación no permite comprobar adecuadamente la función descrita en la clase.
- FortiGate puede ignorar la ruta si no dispone de la información necesaria para reconocer el servicio.

### 7.2. Resultado observable

- El servidor intenta comunicarse con el servicio de Google.
- FortiGate no identifica el destino como parte del servicio configurado.
- La ruta basada en Internet Service no coincide.
- El tráfico utiliza la ruta por defecto, por ejemplo, ISP1.

### 7.3. Ejemplo

```text
Ruta deseada: DNS de Google → ISP2

Sin reconocimiento del servicio:
DNS de Google → no coincide con la ruta ISDB → ruta por defecto → ISP1
```

> Que la ruta aparezca configurada no garantiza que pueda aplicarse si el equipo no reconoce las direcciones asociadas al servicio.

---

## 8. Diferencia frente a una ruta estática tradicional

### 8.1. Ruta estática tradicional

- El destino es una dirección IP o una red.
- Ejemplo: `10.0.2.0/24`.
- El administrador conoce y configura explícitamente el destino.

### 8.2. Ruta basada en Internet Service

- El destino es un servicio reconocido por FortiGate.
- Ejemplo: un servicio DNS de Google.
- FortiGate obtiene las direcciones relacionadas desde su base de datos.

### 8.3. Comparación

| Característica | Ruta tradicional | Ruta por Internet Service |
|---|---|---|
| Destino | IP o red | Servicio conocido |
| Direcciones configuradas manualmente | Sí | No necesariamente |
| Dependencia de una base de datos | No | Sí |
| Ejemplo | `10.0.2.0/24` por puerto 7 | DNS de Google por ISP2 |

---

## 9. Casos de uso

### 9.1. Varios enlaces de Internet

- Enviar ciertos servicios por ISP1.
- Enviar otros servicios por ISP2.
- Mantener una ruta por defecto para el tráfico restante.

### 9.2. Enlace dedicado

- Reservar un enlace para servicios críticos.
- Evitar que ese tráfico compita con la navegación general.

### 9.3. Optimización del tráfico

- Elegir el proveedor que ofrece mejor conectividad hacia una plataforma.
- Separar tráfico empresarial y tráfico general.

### 9.4. Aplicación de requisitos internos

- Forzar que determinadas aplicaciones utilicen un enlace concreto.
- Adaptar el enrutamiento a criterios técnicos u organizativos.

---

## 10. Limitaciones y precauciones

### 10.1. Dependencia de la base de datos

- FortiGate debe reconocer correctamente las direcciones del servicio.
- La información debe estar disponible y actualizada.

### 10.2. Cambios del proveedor

- Los servicios de Internet pueden modificar sus rangos de direcciones.
- Utilizar la ISDB evita mantener manualmente listas extensas, siempre que la base de datos esté actualizada.

### 10.3. Verificación de la salida

- Una vez configurada la ruta, conviene comprobar por qué interfaz circula el tráfico.
- También deben revisarse las políticas de firewall y NAT necesarias para permitir la comunicación.

### 10.4. Limpieza del laboratorio

- Si la ruta solo se creó para una demostración y no funciona con la licencia disponible, debe eliminarse.
- Así se evita dejar configuraciones innecesarias que puedan afectar prácticas posteriores.

---

## 11. Procedimiento resumido

### 11.1. Configuración

1. Entrar en `Network > Static Routes`.
2. Crear una ruta nueva.
3. Seleccionar **Internet Service**.
4. Elegir el servicio deseado.
5. Indicar la interfaz de salida.
6. Configurar el *gateway*.
7. Guardar la ruta.

### 11.2. Comprobación

1. Generar tráfico hacia el servicio.
2. Verificar por qué interfaz sale.
3. Confirmar que las políticas de firewall permiten el tráfico.
4. Revisar NAT si es necesario.
5. Comprobar que FortiGate dispone de datos actualizados del servicio.

---

## 12. Resumen final

### 12.1. Conceptos clave

- El enrutamiento por servicios de Internet es una variante de las rutas estáticas.
- Permite dirigir un servicio concreto por una salida determinada.
- Se basa en la **Internet Service Database** de FortiGate.
- Es especialmente útil cuando existen varios ISP o enlaces dedicados.
- Si el equipo no reconoce el servicio, el tráfico puede utilizar la ruta por defecto.

### 12.2. Ejemplo para memorizar

```text
DNS de Google → Internet Service → Puerto 3 → Gateway ISP2
```

### 12.3. Frase clave

> **Las rutas tradicionales seleccionan una salida mediante una IP o red; las rutas por Internet Service lo hacen mediante un servicio reconocido por FortiGate.**
