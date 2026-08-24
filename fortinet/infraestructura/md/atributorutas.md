🎛️ Atributos de las rutas en FortiGate

[!IMPORTANT]
Cuando varias rutas llegan al mismo destino, FortiGate compara sus atributos. En general, el valor menor es el preferido.

🎯 Objetivos

Comprender distancia, prioridad, métrica y peso.

Saber por qué una ruta entra o no en la tabla de enrutamiento.

Comprobar por qué ISP se envía el tráfico.

Interpretar los atributos desde la GUI y la CLI.

Preparar la base para estudiar ECMP y balanceo de carga.

🗺️ Orden de decisión

flowchart TD
    A["Varias rutas al mismo destino"] --> B["1 · Comparar distancia"]
    B -->|Distinta| C["Gana la menor"]
    B -->|Igual| D["2 · Comparar prioridad"]
    D -->|Distinta| E["Se usa la menor"]
    D -->|Igual| F["Rutas de igual coste · ECMP"]

Regla rápida

Mismo destino
     ↓
Menor distancia
     ↓ si empatan
Menor prioridad
     ↓ si empatan
Posible ECMP / balanceo

1. 🧭 Los cuatro atributos

Atributo

Para qué sirve

Regla general

Distancia

Compara rutas procedentes de distintas fuentes

Menor = preferida

Prioridad

Desempata rutas estáticas con igual destino y distancia

Menor = preferida

Métrica

Expresa el coste calculado por protocolos dinámicos

Menor = preferida

Peso (weight)

Atributo adicional usado en decisiones específicas

Se estudiará más adelante

[!TIP]
Aunque la palabra «prioridad» parezca sugerir lo contrario, en FortiGate una prioridad numérica menor es la preferida.

2. 🥇 Distancia administrativa

La distancia ya se utilizó para configurar un enlace principal y otro de respaldo.

Situación inicial

Ruta

Destino

Interfaz

Distancia

Estado

ISP1

0.0.0.0/0

Puerto 2

10

🟢 Activa

ISP2

0.0.0.0/0

Puerto 3

15

⚪ Inactiva

Ambas rutas tienen el mismo destino, pero ISP1 tiene menor distancia. Por eso se instala en la tabla de enrutamiento y la de ISP2 queda como respaldo.

ISP1 · distancia 10  ← SELECCIONADA
ISP2 · distancia 15  ← RESPALDO

Ver rutas activas e inactivas

get router info routing-table database

La ruta sin indicador de activa existe en la base de datos, pero no está instalada como ruta activa en la tabla de reenvío.

3. 🤝 ¿Qué pasa si la distancia es igual?

Se modifica ISP1 para que ambas rutas tengan distancia 15.

Ruta

Destino

Distancia

Prioridad

ISP1

0.0.0.0/0

15

0

ISP2

0.0.0.0/0

15

0

Ahora las dos pueden aparecer activas e insertadas en la tabla. Para decidir la salida, FortiGate también considera la prioridad.

4. 🎚️ Prioridad

Ante dos rutas con:

el mismo destino;

la misma distancia;

interfaces diferentes;

se prefiere la ruta con menor prioridad numérica.

Ejemplo

Ruta

Distancia

Prioridad

Resultado

ISP1 · Puerto 2

15

3

No preferida

ISP2 · Puerto 3

15

0

✅ Preferida

flowchart LR
    A["Destino 0.0.0.0/0"] --> B["ISP1 · d15 · p3"]
    A --> C["ISP2 · d15 · p0"]
    C --> D["Salida elegida"]

[!NOTE]
La prioridad predeterminada es 0. Al ser menor que 3, ISP2 se convierte en la salida preferida.

5. 🧪 Prueba práctica: comprobar el ISP utilizado

Para probar la selección de ruta, el tráfico debe estar permitido por una política de firewall para cada salida.

Política adicional para ISP2

Campo

Valor del ejemplo

Nombre

Internet_ISP2

Interfaz de entrada

Puerto 4 / LAN

Interfaz de salida

Puerto 3 / ISP2

Origen

Active Directory / red interna

Destino

all

Horario

always

Servicio

ALL

NAT

Habilitado

Conviene renombrar la política existente como Internet_ISP1 para distinguirlas visualmente.

Procedimiento

flowchart TD
    A["Crear política para ISP2"] --> B["Poner contadores a cero"]
    B --> C["Generar tráfico desde Windows Server"]
    C --> D["Actualizar contadores"]
    D --> E["Identificar qué política aumenta"]

Haz clic derecho sobre el contador de cada política y selecciona Reset Count.

Desde Windows Server, genera tráfico, por ejemplo:

ping google.com

Actualiza la lista de políticas.

Comprueba qué contador aumenta.

Resultado esperado: aumenta el contador de la política de ISP2 porque su prioridad 0 es menor que la prioridad 3 de ISP1.

[!WARNING]
Una ruta seleccionada no basta por sí sola: debe existir una política de firewall que permita el tráfico por esa interfaz.

6. ⚖️ ¿Y si distancia y prioridad son iguales?

Destino

Distancia

Prioridad

Consecuencia

Igual

Igual

Igual

Las rutas pueden considerarse de igual coste

Esto abre la puerta a ECMP (Equal-Cost Multi-Path), utilizado para distribuir tráfico entre varias rutas equivalentes.

[!NOTE]
El funcionamiento detallado de ECMP y el balanceo de carga se estudia por separado.

7. 📏 Métrica

La métrica se utiliza principalmente en protocolos de enrutamiento dinámico:

RIP

OSPF

BGP

En términos generales, una ruta con menor métrica se considera más favorable dentro del proceso correspondiente.

Ruta A · métrica 10  ← preferida
Ruta B · métrica 30

En el laboratorio de rutas estáticas suele aparecer con valor 0 y no afecta a la práctica.

8. ⌨️ Lectura de atributos en la CLI

get router info routing-table database

La salida permite reconocer:

[ distancia / métrica ] ... priority <valor> ... weight <valor>

Posición o etiqueta

Atributo

Ejemplo

Primer valor entre corchetes

Distancia

15

Segundo valor entre corchetes

Métrica

0

priority

Prioridad

3

weight

Peso

0

[!TIP]
Un valor predeterminado puede no mostrarse explícitamente. Por ejemplo, la prioridad 0 puede quedar omitida, mientras que una prioridad 3 sí aparece.

Ejemplo conceptual

Ruta ISP1 → [15/0] ... priority 3 ... weight 0
              │ │                │          │
              │ └─ métrica       │          └─ peso
              └─── distancia     └──────────── prioridad

9. 🔄 Restaurar el laboratorio

Al finalizar, devuelve la configuración al estado inicial:

Ruta

Distancia final

Prioridad final

ISP1 · Puerto 2

10

0

ISP2 · Puerto 3

15

0

ISP1 → principal
ISP2 → respaldo

Después, genera tráfico desde Windows Server y comprueba que el contador de la política Internet_ISP1 aumenta.

10. 🩺 Checklist de diagnóstico

¿Las rutas tienen exactamente el mismo destino y prefijo?

¿Qué distancia tiene cada una?

Si la distancia empata, ¿qué prioridad tiene cada ruta?

¿Las interfaces están activas?

¿Existen políticas de firewall para todas las salidas?

¿NAT está habilitado cuando corresponde?

¿Qué muestra routing-table database?

¿Qué contador de política aumenta al generar tráfico?

¿Se restauró el laboratorio al terminar?

🧾 Resumen exprés

[!IMPORTANT]
Orden simplificado: destino más específico → menor distancia → menor prioridad → posible ECMP si persiste el empate.

Concepto

Qué debes recordar

Distancia

Decide qué ruta se prefiere; menor gana

Prioridad

Desempata rutas con igual destino y distancia; menor gana

Métrica

Coste asociado sobre todo a protocolos dinámicos

Peso

Atributo adicional que se verá más adelante

Política de firewall

Debe permitir el tráfico por la interfaz elegida

database

Muestra rutas activas e inactivas

Comando imprescindible

get router info routing-table database