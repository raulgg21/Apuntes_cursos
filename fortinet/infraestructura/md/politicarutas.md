# Objetivo

Aprender a utilizar el **enrutamiento basado en políticas** para desviar un tipo concreto de tráfico por una interfaz diferente a la ruta habitual.

La idea principal es poder decidir el camino del tráfico según criterios como:

* Interfaz de entrada.
* Dirección IP de origen.
* Dirección IP de destino.
* Protocolo.
* Puerto de origen.
* Puerto de destino.

---

# 1. Diferencia con una ruta estática normal

En la clase anterior se configuraron rutas estáticas para comunicar dos redes:

```text
Legales:       10.0.1.0/24
Contabilidad:  10.0.2.0/24
```

Todo el tráfico entre ambas redes utilizaba el enlace directo entre los FortiGate:

```text
FortiGate A port7 ↔ FortiGate B port7
```

La ruta estática indicaba únicamente:

* La red de destino.
* El gateway.
* La interfaz de salida.

No diferenciaba entre protocolos o servicios.

---

# 2. Qué permite una Policy Route

Una **Policy Route** permite aplicar condiciones más específicas.

Por ejemplo:

```text
ICMP → usar port7
HTTP → usar port2 / ISP1
```

Aunque ambos tráficos tengan el mismo origen y destino, pueden enviarse por caminos diferentes.

---

# 3. Reponer los enlaces de Internet

Antes de realizar la práctica se vuelven a conectar los enlaces que se habían eliminado.

En GNS3:

1. Seleccionar la herramienta del cable.
2. Conectar las interfaces respetando el orden original.

## Conexiones

```text
FortiGate Site A port2 → Internet port1
FortiGate Site A port3 → Internet port2

FortiGate Site B port2 → Internet port3
FortiGate Site B port3 → Internet port4
```

> Es importante respetar las interfaces porque ya tienen direcciones IP configuradas.

El enlace privado por `port7` se mantiene conectado.

---

# 4. Acceder al menú de Policy Routes

## Ruta

**Network → Policy Routes**

Aquí se crean las políticas de enrutamiento.

Seleccionar:

**Create New**

---

# 5. Importante: las Policy Routes no sustituyen las rutas estáticas

Las Policy Routes necesitan que exista enrutamiento válido.

No reemplazan completamente las rutas estáticas.

La ruta estática configurada anteriormente sigue siendo necesaria para la comunicación normal entre ambos sitios.

La Policy Route actúa como una excepción para determinados tipos de tráfico.

---

# 6. Escenario de la práctica

Desde el equipo Windows de Contabilidad:

```text
IP origen: 10.0.2.10
```

Se quiere acceder al controlador de dominio de Legales:

```text
IP destino: 10.0.1.10
```

Inicialmente funcionan dos tipos de tráfico:

## ICMP

```cmd
ping 10.0.1.10
```

## HTTP

```text
http://10.0.1.10
```

El servidor tiene un servicio IIS funcionando en el puerto TCP 80.

Antes de crear la Policy Route, ambos tráficos utilizan:

```text
port7
```

---

# 7. Objetivo de la Policy Route

Se quiere conseguir lo siguiente:

```text
ICMP → continuar por port7
HTTP → desviarse por port2 / ISP1
```

La Policy Route únicamente afectará al tráfico:

```text
TCP destino 80
```

Todo el resto seguirá usando la tabla de rutas normal.

---

# 8. Crear la Policy Route en Site B

## Ruta

**Network → Policy Routes → Create New**

Configurar los siguientes campos.

---

## Incoming Interface

```text
port4
```

Es la interfaz por donde entra el tráfico procedente de la LAN de Contabilidad.

---

## Source Address

```text
10.0.2.10/32
```

Es la dirección IP del equipo Windows.

También podría utilizarse un objeto Address.

> Al tratarse de un único host se utiliza máscara `/32`.

---

## Destination Address

```text
10.0.1.10/32
```

Es la dirección IP del controlador de dominio.

También podría seleccionarse mediante un objeto Address.

---

## Protocol

```text
TCP
```

La regla solo debe aplicarse al tráfico HTTP.

---

## Source Port

Se deja sin especificar.

El puerto de origen normalmente es dinámico.

---

## Destination Port

```text
80
```

Corresponde al servicio HTTP.

---

## Action

```text
Forward Traffic
```

La acción indica que el tráfico debe reenviarse.

---

## Outgoing Interface

```text
port2
```

Es la interfaz correspondiente a ISP1.

---

## Gateway

Configurar el gateway del proveedor ISP1.

El gateway debe ser alcanzable a través de `port2`.

---

# 9. Resumen de la Policy Route

La regla queda conceptualmente así:

```text
Si el tráfico:

- Entra por port4
- Tiene origen 10.0.2.10
- Tiene destino 10.0.1.10
- Utiliza TCP
- Va al puerto 80

Entonces:

- Reenviarlo por port2
- Utilizando el gateway de ISP1
```

---

# 10. Comportamiento después de crearla

## Prueba ICMP

Desde Windows:

```cmd
ping 10.0.1.10
```

Resultado:

```text
Funciona
```

El ping sigue utilizando el enlace directo por `port7`.

Esto ocurre porque la Policy Route solo coincide con TCP puerto 80.

---

## Prueba HTTP

Desde el navegador:

```text
http://10.0.1.10
```

Resultado:

```text
No funciona
```

La conexión queda esperando porque el tráfico HTTP está siendo enviado por ISP1 en lugar de utilizar el enlace privado.

La conexión no puede completarse por Internet en este laboratorio, pero demuestra que la Policy Route está actuando.

---

# 11. Verificar el contador de coincidencias

Volver a:

**Network → Policy Routes**

Refrescar la pantalla.

En la columna:

```text
Hit Count
```

debe aparecer tráfico coincidente.

Esto confirma que la Policy Route recibió paquetes que cumplían las condiciones.

---

# 12. Flujo del tráfico HTTP

El funcionamiento es el siguiente:

```text
Windows 10.0.2.10
        │
        │ TCP/80
        ▼
FortiGate Site B — port4
        │
        │ Coincide con la Policy Route
        ▼
port2 / ISP1
        │
        ▼
Internet
```

En lugar de utilizar:

```text
port7 → FortiGate de Legales
```

---

# 13. Flujo del tráfico ICMP

Como ICMP no coincide con la Policy Route, se consulta la tabla de rutas normal.

```text
Windows 10.0.2.10
        │
        │ ICMP
        ▼
FortiGate Site B
        │
        │ Ruta estática normal
        ▼
port7
        │
        ▼
FortiGate de Legales
        │
        ▼
10.0.1.10
```

---

# 14. Orden de decisión

De forma simplificada, FortiGate revisa si el tráfico coincide con una Policy Route.

```text
¿Coincide con la Policy Route?
        │
        ├── Sí → usa la interfaz y gateway indicados
        │
        └── No → utiliza la tabla de enrutamiento normal
```

---

# 15. Campos principales de una Policy Route

## Criterios de coincidencia

* Incoming Interface
* Source Address
* Destination Address
* Protocol
* Source Port
* Destination Port
* Internet Service

## Acción

* Forward Traffic
* Outgoing Interface
* Gateway

---

# 16. Casos de uso

El enrutamiento basado en políticas puede utilizarse para:

* Enviar HTTP por un proveedor específico.
* Enviar VoIP por un enlace dedicado.
* Desviar tráfico de una red concreta.
* Utilizar un ISP diferente según el origen.
* Elegir una salida según el puerto o protocolo.
* Crear excepciones a la ruta estática habitual.

---

# Configuración del ejemplo

| Campo              | Valor           |
| ------------------ | --------------- |
| Incoming Interface | port4           |
| Source             | 10.0.2.10/32    |
| Destination        | 10.0.1.10/32    |
| Protocol           | TCP             |
| Destination Port   | 80              |
| Action             | Forward Traffic |
| Outgoing Interface | port2           |
| Gateway            | Gateway de ISP1 |

---

# Resultado de las pruebas

| Tráfico          | Ruta utilizada       | Resultado                     |
| ---------------- | -------------------- | ----------------------------- |
| ICMP             | port7                | Funciona                      |
| TCP/80           | port2 / ISP1         | No funciona en el laboratorio |
| Otros protocolos | Ruta estática normal | Utilizan port7                |

---

# Ideas clave

* Una Policy Route permite enrutar tráfico según criterios más específicos que una ruta estática.
* Puede filtrar por origen, destino, protocolo y puertos.
* No reemplaza necesariamente las rutas estáticas.
* Solo afecta al tráfico que coincide con todas sus condiciones.
* El tráfico que no coincide continúa usando la tabla de rutas normal.
* El contador **Hit Count** permite comprobar si la regla está recibiendo tráfico.
* En el ejemplo, ICMP utiliza el enlace privado y HTTP se desvía por ISP1.
