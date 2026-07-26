# Objetivo

Aprender a crear y utilizar **objetos** en FortiGate para hacer las Firewall Policies más flexibles y fáciles de administrar.

> Los objetos por sí solos **no tienen efecto**; deben utilizarse dentro de una **Firewall Policy**.

---

# Menú de Objetos

Ruta:

**Policy & Objects**

Desde este menú se administran diferentes tipos de objetos:

- **Addresses**
- **Services**
- **Schedules**
- **Internet Service Database (ISDB)**

---

# Objetos Address

## Ruta

**Policy & Objects → Addresses**

Permiten identificar equipos, redes o destinos que posteriormente podrán utilizarse en las Firewall Policies.

### Tipos de objetos disponibles

- **Subnet**
  - Una red o una IP individual.
  - Si es una IP única, debe utilizar máscara **/32**.

- **IP Range**
  - Rango de direcciones IP.

- **FQDN**
  - Nombre DNS.
  - Ejemplo:
    ```
    microsoft.com
    ```

- **Geography**
  - Permite crear reglas según países.

- **Dynamic Address**
  - Objetos dinámicos.

- **Device**
  - Identifica un equipo por MAC u otros atributos, útil cuando la IP cambia.

---

# Crear un Address Object

Ruta:

**Policy & Objects → Addresses → Create New**

Ejemplo:

| Campo | Valor |
|--------|-------|
| Name | ActiveDirectory |
| Type | Subnet |
| IP | 10.0.1.10/32 |
| Interface | Any |

Opcionalmente se puede:

- Cambiar el color.
- Añadir un comentario.
- Habilitar **Static Route Configuration** para utilizar el objeto en rutas estáticas.

---

# Utilizar el objeto en una Firewall Policy

Ruta:

**Policy & Objects → Firewall Policy**

Editar la política **Internet**.

En:

```
Source
```

Cambiar:

```
all
```

por:

```
ActiveDirectory
```

## Resultado

Solo el servidor **10.0.1.10** podrá navegar por Internet.

El resto de equipos quedarán bloqueados.

---

# Objetos Service

## Ruta

**Policy & Objects → Services**

Los Services representan:

- Protocolos.
- Puertos TCP.
- Puertos UDP.
- ICMP.
- Otros protocolos IP.

---

# Servicios predefinidos

FortiGate ya incluye numerosos servicios, por ejemplo:

- HTTP
- HTTPS
- DNS
- SSH
- FTP

No es necesario crearlos manualmente.

---

# Crear un Service

Ruta:

**Policy & Objects → Services → Create New**

Campos principales:

- Name
- Protocol (TCP / UDP / ICMP / IP)
- Puerto(s)

---

# Restringir los servicios permitidos

Editar la Firewall Policy.

En:

```
Service
```

Cambiar:

```
ALL
```

por:

- HTTP
- HTTPS
- DNS

## Resultado

Permitido:

- Navegación web.
- Resolución DNS.

Bloqueado:

- ICMP (Ping)

### Comprobación

```cmd
ping google.com
```

Resultado:

- ❌ No responde.

Sin embargo:

```
https://google.com
```

funciona correctamente desde el navegador.

---

# Objetos Schedule

## Ruta

**Policy & Objects → Schedules**

Permiten limitar cuándo una Firewall Policy estará activa.

---

# Crear un Schedule

Ruta:

**Policy & Objects → Schedules → Create New**

Tipos disponibles:

- **One Time**
  - Se ejecuta una sola vez.

- **Recurring**
  - Se repite según el horario configurado.

---

# Ejemplo

Nombre:

```
HorarioLaboral
```

Configuración:

- Lunes a Viernes
- 09:00
- 18:00

---

# Aplicar un Schedule

Editar la Firewall Policy.

En:

```
Schedule
```

Seleccionar:

```
HorarioLaboral
```

## Resultado

La política únicamente funcionará:

- Lunes a Viernes.
- De 09:00 a 18:00.

Fuera de ese horario:

- No funciona la navegación.
- Tampoco funcionan las consultas DNS porque la Firewall Policy deja de aplicarse.

---

# Información adicional de la Policy

Al editar una Firewall Policy, FortiGate también muestra:

- Consumo de tráfico.
- Equipos que utilizan la regla.
- Gráficas de uso.
- Contadores de sesiones.
- Estadísticas de los últimos días.

Esto facilita la monitorización de la regla.

---

# Internet Service Database (ISDB)

## Ruta

**Policy & Objects → Internet Service Database**

FortiGate incorpora miles de servicios de Internet ya identificados.

Ejemplos:

- Microsoft Teams
- Telegram
- Gmail
- Dropbox
- Office 365

Estos objetos pueden utilizarse como destino en las Firewall Policies.

---

# Ejemplo: Bloquear Telegram

Crear una nueva Firewall Policy.

Configuración:

| Campo | Valor |
|--------|-------|
| Source | all |
| Destination | Internet Service → Telegram |
| Action | Deny |

---

# Orden de las Policies

Muy importante:

Las políticas de **bloqueo** deben colocarse **por encima** de las políticas de **permiso**.

```
1. Deny Telegram
2. Allow Internet
```

Si la política **Allow Internet** estuviera primero:

```
Allow Internet
Deny Telegram
```

El tráfico coincidiría con la primera regla y nunca llegaría a la de bloqueo.

---

# Restaurar la configuración

Para finalizar la práctica:

- Eliminar la Policy de bloqueo.
- Restaurar la Policy de Internet.
- Volver a permitir:
  - Source = all
  - Service = ALL
  - Schedule = always

---

# Resumen

## Address Objects

Ruta:

```
Policy & Objects
    └── Addresses
```

Permiten representar:

- Hosts
- Redes
- Rangos IP
- FQDN
- Países
- Dispositivos

---

## Services

Ruta:

```
Policy & Objects
    └── Services
```

Permiten definir:

- Protocolos
- Puertos
- Servicios personalizados

---

## Schedules

Ruta:

```
Policy & Objects
    └── Schedules
```

Permiten controlar cuándo una Firewall Policy estará activa.

---

## Internet Service Database

Ruta:

```
Policy & Objects
    └── Internet Service Database
```

Contiene miles de servicios de Internet predefinidos para crear reglas más específicas.

---

# Ideas clave

- Los objetos facilitan reutilizar configuraciones en varias Firewall Policies.
- Un Address Object puede representar una IP, una red, un FQDN o incluso un país.
- Los Services permiten limitar los protocolos y puertos permitidos.
- Los Schedules controlan el horario de funcionamiento de una política.
- La Internet Service Database permite crear reglas específicas para aplicaciones y servicios conocidos.
- Las Firewall Policies se evalúan de arriba hacia abajo; las reglas de bloqueo deben colocarse antes que las de permiso.