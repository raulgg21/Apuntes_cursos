# Clase: Crear una Firewall Policy desde la CLI

## Objetivo

Crear una **Firewall Policy** desde la línea de comandos (CLI) para permitir el acceso a Internet, replicando la política creada previamente desde la interfaz gráfica.

---

# Eliminar la Policy existente

## Ruta

**Policy & Objects → Firewall Policy**

1. Localizar la policy **Internet**.
2. Clic derecho sobre ella.
3. Seleccionar **Delete**.

> Al eliminar la policy, el equipo Windows pierde inmediatamente la conectividad a Internet.

---

# Menú contextual de una Firewall Policy

Al hacer **clic derecho** sobre una policy se muestran varias opciones:

- **Enable / Disable**
  - Habilita o deshabilita una policy.
  - Una policy deshabilitada aparece con una **X roja**.

- **Filter**
  - Permite buscar policies por:
    - Nombre.
    - Acción (Accept, Deny).
    - Otros campos.

- **Copy**
  - Copia una policy existente.

- **Paste Above / Paste Below**
  - Pega la policy copiada encima o debajo de otra.

- **Insert Policy**
  - Inserta una nueva policy vacía.

- **View Logs**
  - Muestra los registros generados por esa policy.

- **Edit**
  - Edita la policy desde la GUI.

- **Edit in CLI**
  - Abre la configuración de la policy directamente en la CLI.

- **Delete**
  - Elimina la policy.

---

# Orden de evaluación de las Policies

Las Firewall Policies se procesan:

```
De arriba hacia abajo
```

Cuando una regla coincide con el tráfico (**match**):

- Se aplica esa policy.
- No se siguen evaluando las siguientes reglas.

> Por ello, el orden de las policies es muy importante.

---

# Acceder a la CLI

Entrar al modo de configuración:

```bash
config firewall policy
```

---

# Comprobar si existen Policies

Mostrar únicamente la configuración creada:

```bash
show
```

Mostrar toda la configuración (incluyendo valores por defecto):

```bash
show full-configuration
```

Como la policy fue eliminada, no aparecerá ninguna configuración.

---

# Crear una nueva Policy

Crear la primera policy:

```bash
edit 1
```

> El número **1** es el identificador interno de la policy.

---

# Consultar los parámetros disponibles

Mostrar todos los parámetros configurables:

```bash
get
```

Este comando permite ver todas las opciones que pueden configurarse dentro de una Firewall Policy.

---

# Configurar la Policy

## Nombre

```bash
set name "Internet"
```

---

## Interfaz de entrada (LAN)

```bash
set srcintf "port4"
```

---

## Interfaz de salida (ISP)

```bash
set dstintf "port2"
```

---

## Dirección origen

```bash
set srcaddr "all"
```

Permite cualquier origen.

---

## Dirección destino

```bash
set dstaddr "all"
```

Permite cualquier destino.

---

## Horario

```bash
set schedule "always"
```

La policy permanecerá activa permanentemente.

---

## Servicios

```bash
set service "ALL"
```

Permite todos los protocolos y puertos.

> **Importante:** `ALL` debe escribirse en mayúsculas, ya que la CLI distingue entre mayúsculas y minúsculas.

---

## Acción

```bash
set action accept
```

Permite el tráfico.

---

## Habilitar NAT

Una vez configurada la acción **accept**, ya es posible habilitar NAT.

```bash
set nat enable
```

NAT traduce la dirección IP privada del cliente por la IP pública de la interfaz de salida para permitir el acceso a Internet.

---

# Verificar la configuración

Mostrar toda la configuración de la policy:

```bash
show full-configuration
```

Comprobar especialmente:

- `action accept`
- `nat enable`
- `inspection-mode flow` (valor por defecto)

---

# Guardar la configuración

Salir del modo de configuración:

```bash
end
```

La Firewall Policy queda guardada.

---

# Comprobar desde la GUI

Ruta:

**Policy & Objects → Firewall Policy**

Refrescar la página.

La policy creada desde la CLI aparecerá igual que una creada desde la interfaz gráfica.

---

# Verificar el funcionamiento

Desde el equipo Windows ejecutar:

```cmd
ping google.com
```

Resultado esperado:

- ✅ El equipo vuelve a tener acceso a Internet.

También puede verificarse desde la GUI revisando la policy creada y comprobando que:

- Incoming Interface = **port4**
- Outgoing Interface = **port2**
- Source = **all**
- Destination = **all**
- Schedule = **always**
- Service = **ALL**
- Action = **Accept**
- NAT = **Enable**

---

# Comandos utilizados

```bash
config firewall policy

show

show full-configuration

edit 1

get

set name "Internet"

set srcintf "port4"

set dstintf "port2"

set srcaddr "all"

set dstaddr "all"

set schedule "always"

set service "ALL"

set action accept

set nat enable

show full-configuration

end
```

---

# Ideas clave

- Una Firewall Policy puede crearse tanto desde la GUI como desde la CLI.
- `show` muestra únicamente la configuración realizada.
- `show full-configuration` muestra toda la configuración, incluidos los valores por defecto.
- `get` permite consultar todos los parámetros configurables de la policy.
- NAT solo debe habilitarse cuando el tráfico necesita salir hacia Internet.
- El orden de las Firewall Policies es fundamental, ya que FortiGate aplica la **primera regla que coincide** con el tráfico.