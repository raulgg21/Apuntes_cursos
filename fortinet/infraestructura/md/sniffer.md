# Apuntes FortiGate: Captura de Tráfico con Sniffer (CLI)

El comando `diagnose sniffer packet` es una herramienta clave de diagnóstico por línea de comandos (CLI) en FortiOS. Permite capturar y analizar tráfico en tiempo real directamente desde el firewall para solucionar problemas de conectividad que no son visibles a través de la interfaz gráfica.

---

## 1. Sintaxis General del Comando

```bash
diagnose sniffer packet <interface> '<filter>' <verbose> <count> <tsformat>
```

| Parámetro | Descripción |
| :--- | :--- |
| **`<interface>`** | Nombre de la interfaz física/lógica (ej. `port4`) o `any` para capturar en todas las interfaces. |
| **`'<filter>'`** | Expresión de filtrado entre comillas simples (protocolos, IPs, puertos). |
| **`<verbose>`** | Nivel de detalle/verbosidad de la salida (del `1` al `6`). |
| **`<count>`** | *(Opcional)* Número exacto de paquetes a capturar antes de detenerse automáticamente. |
| **`<tsformat>`** | *(Opcional)* Formato de la marca de tiempo (`a` para UTC absoluto, `l` para hora local). |

---

## 2. Construcción de Filtros (`<filter>`)

Los filtros se definen usando sintaxis estándar tipo pcap / tcpdump. Para combinar criterios se utiliza el operador lógico `and` (`&&`).

### Filtros Básicos por Protocolo
* **Capturar ICMP:**
  ```bash
  diagnose sniffer packet port4 'icmp'
  ```
* **Capturar tráfico UDP en puerto 53 (DNS):**
  ```bash
  diagnose sniffer packet port4 'udp and port 53'
  ```

### Filtros por Dirección IP (Host, Origen y Destino)
* **Filtrar por dirección IP específica (ida y vuelta):**
  ```bash
  diagnose sniffer packet port4 'icmp and host 10.0.1.10'
  ```
* **Filtrar únicamente cuando la IP sea el origen (`src host`):**
  ```bash
  diagnose sniffer packet port4 'icmp and src host 10.0.1.10'
  ```
  *(Captura únicamente los paquetes de solicitud / `echo request` enviados desde la IP)*.
* **Filtrar únicamente cuando la IP sea el destino (`dst host`):**
  ```bash
  diagnose sniffer packet port4 'icmp and dst host 10.0.1.10'
  ```
  *(Captura únicamente las respuestas / `echo reply` dirigidas a la IP)*.

---

## 3. Niveles de Verbosidad (`<verbose>`)


El parámetro de verbosidad determina cuánta información de cada paquete se imprime en pantalla:

![Niveles de Verbosidad](./fortinet/infraestructura/img/Verbosidad+del+sniffer.png)

| Nivel | Descripción de la Salida | Uso Recomendado |
| :---: | :--- | :--- |
| **`1`** | Encabezados de la capa IP (Origen, Destino, Protocolo). | Diagnóstico rápido de flujo básico. |
| **`2`** | Encabezados IP + Carga útil de los datos (*Payload*). | Inspección de datos transmitidos. |
| **`3`** | Encabezados IP + *Payload* + Encabezados Ethernet (Capa 2). | Análisis detallado de tramas a nivel de enlace. |
| **`4`** | Encabezados IP + **Nombre de las Interfaces de entrada y salida**. | **Recomendado para Debug:** Identifica por qué puerto entra y sale cada paquete. |
| **`5`** | Encabezados IP + *Payload* + Nombre de las Interfaces. | Diagnóstico profundo de interfaz y contenido. |
| **`6`** | Encabezados IP + Ethernet + *Payload* + Marcas de tiempo avanzadas. | Análisis forense completo. |


---

## 4. Ejemplos Prácticos de Uso

### Ejemplo A: Diagnóstico con Interfaz `any` (Seguimiento Multi-interfaz)
Al usar `any` con nivel de verbosidad `4`, es posible rastrear todo el recorrido de un paquete a través del FortiGate (interfaz de entrada LAN e interfaz de salida WAN):

```bash
diagnose sniffer packet any 'icmp' 4
```

**Flujo trazado en pantalla:**
1. `port4 in`: Paquete ICMP Request entra por la LAN.
2. `port2 out`: Paquete ICMP Request sale por la interfaz WAN hacia Internet.
3. `port2 in`: Paquete ICMP Reply ingresa desde Internet.
4. `port4 out`: Paquete ICMP Reply sale de vuelta al cliente en la LAN.

### Ejemplo B: Límite de Paquetes (`count`)
Para evitar llenar la consola con salida continua al realizar pruebas en un equipo que genera pings infinitos:

```bash
diagnose sniffer packet port4 'icmp and src host 10.0.1.10' 4 5
```
*Detiene la captura automáticamente al procesar **5 paquetes**.*

---

## 5. Teclas de Control

* **Detener captura manual:** `Ctrl + C`
