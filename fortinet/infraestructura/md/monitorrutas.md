🧭 Monitoreo de rutas en FortiGate

[!IMPORTANT]
Idea central: el widget de la GUI muestra principalmente rutas activas. Para ver también las inactivas, utiliza get router info routing-table database.

🎯 Qué aprenderás

Al terminar podrás…

Herramienta

Reconocer rutas conectadas, estáticas y dinámicas

GUI / CLI

Diferenciar una ruta activa de una inactiva

GUI / CLI

Saber por dónde saldrá un tráfico

Route Lookup

Detectar rutas ausentes o con distancia incorrecta

CLI

Consultar reglas de encaminamiento por políticas

Policy Routes

🗺️ Mapa general

flowchart TD
    A["Tabla de enrutamiento"] --> B["Rutas conectadas"]
    A --> C["Rutas estáticas"]
    A --> D["Rutas dinámicas"]
    B --> E["Creadas al configurar interfaces"]
    C --> F["Configuradas manualmente"]
    D --> G["RIP · OSPF · BGP · IS-IS"]

1. 🧩 Tipos de rutas

🔌 Rutas conectadas — Connected

FortiGate las crea automáticamente cuando una interfaz está habilitada, conectada y tiene una dirección IP con máscara.

Puerto 4: 10.0.1.254/24
           ↓
Ruta automática: 10.0.1.0/24 → Puerto 4
Gateway: no necesario

🧱 Rutas estáticas — Static

Se crean manualmente:

Dato

Función

Destino

Red a la que se quiere llegar

Interfaz

Puerto de salida

Gateway

Próximo salto

Distancia

Prioridad de la ruta

🔄 Rutas dinámicas

Protocolo

Uso general

RIP

Redes pequeñas o educativas

OSPF

Enrutamiento interno escalable

BGP

Intercambio entre sistemas autónomos

IS-IS

Grandes redes de operadores

2. 🚦 Rutas activas e inactivas

flowchart TD
    A["¿La interfaz está disponible?"] -->|No| B["Ruta inactiva"]
    A -->|Sí| C["¿Hay otra ruta al mismo destino?"]
    C -->|No| D["Ruta activa"]
    C -->|Sí| E["Comparar distancia"]
    E --> F["Menor distancia = preferida"]

Una ruta puede quedar inactiva porque:

Otra ruta al mismo destino tiene menor distancia.

Su interfaz está deshabilitada, caída o desconectada.

ISP principal y respaldo

Enlace

Interfaz

Destino

Distancia

Estado normal

🟢 ISP1

Puerto 2

0.0.0.0/0

10

Activa

🟡 ISP2

Puerto 3

0.0.0.0/0

15

En espera

Internet
   ↑
   ├── ISP1 · Puerto 2 · distancia 10  ← ACTIVA
   └── ISP2 · Puerto 3 · distancia 15  ← RESPALDO

Si el puerto 2 cae, la ruta de ISP1 deja de estar disponible y la de ISP2 pasa a estar activa.

[!TIP]
Menor distancia = mayor preferencia. Una ruta inactiva puede estar correctamente configurada como respaldo.

3. 🖥️ Monitoreo desde la GUI

Dashboard → Network → Routing

El widget Routing permite:

consultar el total de rutas activas;

separarlas en conectadas, estáticas y dinámicas;

ver cuántas usan cada interfaz;

aplicar filtros y editar rutas;

ejecutar Route Lookup.

[!WARNING]
Si una ruta configurada no aparece, revisa su distancia y el estado de su interfaz.

✏️ Editar una ruta estática

Seleccionar ruta → Edit → Network → Static Routes

🏷️ Crear un objeto de dirección

Al seleccionar una ruta conectada y pulsar Create Address:

✅ Crea un objeto con la red y máscara ya rellenadas.
❌ No asigna una nueva IP a la interfaz.

4. 🔎 Route Lookup

Simula una consulta y muestra qué ruta elegiría FortiGate.

Campo

Ejemplo

IP de destino

10.0.2.10

IP de origen

Equipo de la LAN

Puerto de destino

80 o 443

Protocolo

TCP / UDP

Interfaz de origen

LAN

Tres resultados típicos

A) Cliente LAN → DNS público → Ruta por defecto → ISP1
B) Cliente LAN → 10.0.2.10 → Ruta estática → Puerto 7
C) Red desconocida → No hay ruta específica → Ruta por defecto → Internet

flowchart LR
    A["Destino 10.0.3.0/24"] --> B["No existe ruta específica"]
    B --> C["Coincide la ruta por defecto"]
    C --> D["Intenta salir a Internet"]

[!CAUTION]
Que FortiGate encuentre una ruta no significa que sea la correcta para el diseño. Muestra la mejor coincidencia disponible.

5. 🧠 Policy Routes

Las Policy Routes no son rutas: son reglas que indican qué salida debe usar cierto tráfico.

Origen + Destino + Protocolo + Puerto + Interfaz de entrada
                              ↓
                  Gateway / salida indicada

[!IMPORTANT]
Una Policy Route necesita una ruta subyacente válida para alcanzar el siguiente salto o destino.

6. ⌨️ Chuleta de CLI

get router info routing-table ?

Qué quieres ver

Comando

Rutas conectadas

get router info routing-table connected

Rutas estáticas activas

get router info routing-table static

Todas las rutas activas

get router info routing-table all

Activas e inactivas

get router info routing-table database

Información detallada

get router info routing-table details

Rutas RIP

get router info routing-table rip

Rutas OSPF

get router info routing-table ospf

Rutas BGP

get router info routing-table bgp

Rutas IS-IS

get router info routing-table isis

⭐ Comando clave

get router info routing-table database

Situación

Interpretación

Ruta con indicador de activa

Está instalada y puede utilizarse

Ruta sin indicador

Existe, pero otra ruta es preferida

Ruta e interfaz inactivas

El puerto está caído o deshabilitado

Consultar Policy Routes

diagnose firewall proute list

7. ⚖️ GUI vs. CLI

Característica

🖥️ GUI

⌨️ CLI

Lectura visual rápida

✅

◑

Ver rutas activas

✅

✅

Ver rutas inactivas

Limitado

✅

Ejecutar Route Lookup

✅

—

Editar rutas fácilmente

✅

◑

Información completa

◑

✅

Diagnóstico avanzado

◑

✅

8. 🩺 Flujo de diagnóstico

flowchart TD
    A["1 · Revisar widget Routing"] --> B["2 · Ejecutar Route Lookup"]
    B --> C["3 · Consultar routing-table database"]
    C --> D["4 · Comparar destino, gateway y distancia"]
    D --> E["5 · Revisar interfaces y Policy Routes"]
    E --> F["6 · Confirmar la salida esperada"]

Checklist

¿Existe una ruta hacia el destino?

¿Es la coincidencia más específica?

¿Su interfaz está habilitada?

¿El gateway es correcto?

¿La distancia refleja la prioridad deseada?

¿Una Policy Route está alterando la salida?

¿Route Lookup devuelve el camino esperado?

9. 🧪 Mini caso práctico

Problema: el tráfico hacia una red remota intenta salir a Internet.

Paso

Comprobación

Hallazgo posible

1

Route Lookup

Selecciona 0.0.0.0/0

2

routing-table database

No existe la red remota

3

Interfaces

El puerto correcto está activo

4

Configuración

Falta la ruta estática

5

Nueva prueba

Ya se elige la ruta específica

Conclusión: la ruta por defecto funcionaba, pero no era el camino correcto.

10. 🧾 Resumen exprés

[!NOTE]

Connected: creada al configurar una interfaz.

Static: configurada manualmente.

Dynamic: aprendida mediante RIP, OSPF, BGP o IS-IS.

Menor distancia: ruta preferida.

Route Lookup: muestra el camino que FortiGate elegiría.

Policy Route: dirige tráfico, pero no sustituye la tabla de rutas.

routing-table database: muestra rutas activas e inactivas.

Comandos que debes memorizar

# Todas las entradas de la base de enrutamiento
get router info routing-table database

# Rutas estáticas activas
get router info routing-table static

# Policy Routes
diagnose firewall proute list

[TIP]
Al terminar una práctica, elimina las Policy Routes temporales para evitar que afecten a ejercicios posteriores.