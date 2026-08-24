# Objetivo

Configurar **rutas estáticas** para comunicar dos redes diferentes protegidas por dos FortiGate.

Escenario del laboratorio:

```text
Departamento de Legales
Red: 10.0.1.0/24
FortiGate A
        │
        │ Red de enlace: 172.21.0.0/30
        │
FortiGate B
Red: 10.0.2.0/24
Departamento de Contabilidad
```

El objetivo es que:

- El equipo de Contabilidad pueda acceder a la red de Legales.
- El equipo de Legales pueda acceder a la red de Contabilidad.
- El tráfico pueda viajar en ambos sentidos.

---

# 1. Modificar el laboratorio

Para esta práctica se simula que ambos FortiGate están en la misma empresa.

Los enlaces de Internet se eliminan temporalmente.

Esto no borra la configuración de los FortiGate, solo desconecta las interfaces utilizadas para Internet.

Después se conecta:

```text
FortiGate A port7 ↔ FortiGate B port7
```

Este enlace representa una conexión física entre ambos departamentos.

---

# 2. Configurar la interfaz del FortiGate de Legales

## Ruta

**Network → Interfaces**

1. Localizar `port7`.
2. Hacer doble clic para editarlo.
3. Configurar:

| Campo | Valor |
|---|---|
| Alias | Legales |
| Role | LAN |
| IP/Netmask | 172.21.0.1/30 |
| Administrative Access | PING |

4. Guardar con **OK**.

---

# 3. Configurar la interfaz del FortiGate de Contabilidad

## Ruta

**Network → Interfaces**

1. Localizar `port7`.
2. Editar la interfaz.
3. Configurar:

| Campo | Valor |
|---|---|
| Alias | Contabilidad |
| Role | LAN |
| IP/Netmask | 172.21.0.2/30 |
| Administrative Access | PING |

4. Guardar con **OK**.

---

# 4. Comprobar el enlace entre los FortiGate

Desde la CLI del FortiGate de Contabilidad:

```bash
execute ping 172.21.0.1
```

Si responde, significa que las interfaces `port7` tienen conectividad.

Desde el FortiGate de Legales también puede probarse:

```bash
execute ping 172.21.0.2
```

---

# 5. Por qué todavía no existe conectividad entre las LAN

Aunque los FortiGate ya están conectados entre sí, cada uno solo conoce:

- Sus redes directamente conectadas.
- Las rutas que tenga configuradas.

El FortiGate de Contabilidad no sabe cómo alcanzar:

```text
10.0.1.0/24
```

El FortiGate de Legales no sabe cómo alcanzar:

```text
10.0.2.0/24
```

Por este motivo es necesario crear rutas estáticas.

---

# 6. Crear la ruta estática en Contabilidad

El FortiGate de Contabilidad debe saber cómo llegar a la red de Legales.

## Ruta

**Network → Static Routes**

Seleccionar:

**Create New**

Configurar:

| Campo | Valor |
|---|---|
| Destination | 10.0.1.0/24 |
| Gateway | 172.21.0.1 |
| Interface | port7 |
| Administrative Distance | Valor predeterminado |
| Priority | 0 |

Guardar con **OK**.

## Explicación

```text
Destino: 10.0.1.0/24
Gateway: 172.21.0.1
```

Esto significa:

> Para llegar a la red de Legales, envía el tráfico al FortiGate cuya dirección en el enlace es 172.21.0.1.

---

# 7. Crear la ruta estática en Legales

El FortiGate de Legales debe conocer la ruta de retorno hacia Contabilidad.

## Ruta

**Network → Static Routes → Create New**

Configurar:

| Campo | Valor |
|---|---|
| Destination | 10.0.2.0/24 |
| Gateway | 172.21.0.2 |
| Interface | port7 |
| Administrative Distance | Valor predeterminado |
| Priority | 0 |

Guardar con **OK**.

## Explicación

```text
Destino: 10.0.2.0/24
Gateway: 172.21.0.2
```

Esto indica:

> Para llegar a la red de Contabilidad, utiliza como siguiente salto el FortiGate 172.21.0.2.

---

# 8. Importancia de la ruta de retorno

No basta con configurar una ruta en un solo FortiGate.

El tráfico debe poder:

```text
Ir al destino
        ↓
Regresar al origen
```

Si solo existe la ruta de ida:

- El tráfico puede llegar al destino.
- La respuesta no sabe cómo regresar.
- La comunicación falla.

Por eso se necesitan rutas en ambos extremos.

---

# 9. Crear la Firewall Policy en Contabilidad

Las rutas indican el camino, pero también se necesitan políticas que permitan el tráfico.

## Ruta

**Policy & Objects → Firewall Policy → Create New**

Crear la política de Contabilidad hacia Legales.

| Campo | Valor |
|---|---|
| Name | To-Legales |
| Incoming Interface | port4 |
| Outgoing Interface | port7 |
| Source | all |
| Destination | all |
| Schedule | always |
| Service | ALL |
| Action | Accept |
| NAT | Disable |

Guardar con **OK**.

---

# 10. Por qué no se utiliza NAT

En esta comunicación no se necesita NAT.

Ambos FortiGate conocen las redes remotas mediante rutas estáticas:

```text
Legales conoce 10.0.2.0/24
Contabilidad conoce 10.0.1.0/24
```

Por tanto, las direcciones IP privadas pueden mantenerse sin traducción.

Configuración:

```text
NAT: Disabled
```

---

# 11. Crear la política inversa en Contabilidad

También debe permitirse el tráfico que entra desde Legales hacia la LAN de Contabilidad.

En lugar de crearla manualmente:

1. Clic derecho sobre `To-Legales`.
2. Seleccionar **Clone Reverse**.
3. Cambiar el nombre:

```text
From-Legales
```

4. Habilitar la policy.

La política inversa queda así:

| Campo | Valor |
|---|---|
| Incoming Interface | port7 |
| Outgoing Interface | port4 |
| Action | Accept |
| NAT | Disable |

> Las políticas clonadas pueden quedar deshabilitadas por defecto. Es necesario activarlas.

---

# 12. Por qué las Policies sin NAT necesitan reversa

Una policy de Internet con NAT normalmente no requiere una regla inversa manual.

FortiGate mantiene una tabla de sesiones y permite el tráfico de respuesta de una conexión establecida.

En este caso, como se quiere permitir comunicación iniciada desde ambos lados y no se utiliza NAT, se crean policies en ambas direcciones.

```text
port4 → port7
port7 → port4
```

---

# 13. Crear las Policies en Legales

En el FortiGate de Legales:

## Policy hacia Contabilidad

Ruta:

**Policy & Objects → Firewall Policy → Create New**

| Campo | Valor |
|---|---|
| Name | To-Contabilidad |
| Incoming Interface | port4 |
| Outgoing Interface | port7 |
| Source | all |
| Destination | all |
| Schedule | always |
| Service | ALL |
| Action | Accept |
| NAT | Disable |

Guardar con **OK**.

## Policy inversa

1. Clic derecho sobre `To-Contabilidad`.
2. Seleccionar **Clone Reverse**.
3. Cambiar el nombre:

```text
From-Contabilidad
```

4. Habilitar la policy.

---

# 14. Comprobar la conectividad

Desde el equipo Windows de Contabilidad:

```cmd
ping 10.0.1.10
```

Debe responder el servidor de la red de Legales.

Desde el servidor de Legales:

```cmd
ping 10.0.2.10
```

Debe responder el equipo Windows de Contabilidad.

Resultado:

```text
10.0.1.0/24 ↔ 10.0.2.0/24
```

Ambas redes ya tienen conectividad.

---

# 15. Funcionamiento del enrutamiento

Cuando el equipo de Contabilidad quiere acceder a `10.0.1.10`:

1. Envía el tráfico a su gateway.
2. El FortiGate de Contabilidad consulta su tabla de rutas.
3. Encuentra la ruta:

```text
10.0.1.0/24 vía 172.21.0.1 por port7
```

4. Envía el tráfico al FortiGate de Legales.
5. El FortiGate de Legales entrega el tráfico a su red local.
6. La respuesta utiliza la ruta inversa:

```text
10.0.2.0/24 vía 172.21.0.2 por port7
```

---

# 16. Crear objetos Address para las redes

Para evitar escribir las subredes manualmente en varias configuraciones, pueden utilizarse objetos Address.

## Crear el objeto de Contabilidad

En el FortiGate de Legales:

**Policy & Objects → Addresses → Create New → Address**

Configurar:

| Campo | Valor |
|---|---|
| Name | Contabilidad |
| Type | Subnet |
| Subnet/IP Range | 10.0.2.0/24 |
| Static Route Configuration | Enable |

Guardar con **OK**.

---

# 17. Usar el objeto en la ruta estática

## Ruta

**Network → Static Routes**

Editar la ruta hacia Contabilidad.

Cambiar el destino escrito manualmente:

```text
10.0.2.0/24
```

por el objeto:

```text
Contabilidad
```

Esto hace que la configuración sea más mantenible.

---

# 18. Usar el objeto en las Firewall Policies

## Policy hacia Contabilidad

Ruta:

**Policy & Objects → Firewall Policy**

Editar:

```text
To-Contabilidad
```

Cambiar:

```text
Destination: all
```

por:

```text
Destination: Contabilidad
```

## Policy desde Contabilidad

Editar:

```text
From-Contabilidad
```

Cambiar:

```text
Source: all
```

por:

```text
Source: Contabilidad
```

---

# 19. Crear el objeto de la red local

En el FortiGate de Legales:

**Policy & Objects → Addresses → Create New → Address**

Configurar:

| Campo | Valor |
|---|---|
| Name | Red-Local |
| Type | Subnet |
| Subnet/IP Range | 10.0.1.0/24 |
| Static Route Configuration | Enable |

La red local no necesita una ruta estática porque está conectada directamente al FortiGate por `port4`.

Sin embargo, el objeto puede utilizarse en las policies.

---

# 20. Ajustar las Policies con objetos

## Policy hacia Contabilidad

```text
Source: Red-Local
Destination: Contabilidad
```

## Policy desde Contabilidad

```text
Source: Contabilidad
Destination: Red-Local
```

Así las reglas dejan de utilizar `all` y se vuelven más específicas.

---

# Ventajas de utilizar objetos Address

Si una red cambia, solo es necesario modificar el objeto.

Ejemplo:

```text
Objeto Contabilidad:
Antes: 10.0.2.0/24
Después: 10.0.20.0/24
```

El cambio se refleja automáticamente en:

- Rutas estáticas.
- Firewall Policies.
- Otras configuraciones que utilicen el objeto.

Esto permite una configuración:

- Más ordenada.
- Más fácil de mantener.
- Más escalable.
- Menos propensa a errores.

---

# Configuración final

## Enlace entre FortiGate

| Dispositivo | Interfaz | Dirección |
|---|---|---|
| FortiGate Legales | port7 | 172.21.0.1/30 |
| FortiGate Contabilidad | port7 | 172.21.0.2/30 |

## Redes locales

| Departamento | Red |
|---|---|
| Legales | 10.0.1.0/24 |
| Contabilidad | 10.0.2.0/24 |

## Rutas estáticas

### FortiGate de Legales

```text
Destino: 10.0.2.0/24
Gateway: 172.21.0.2
Interfaz: port7
```

### FortiGate de Contabilidad

```text
Destino: 10.0.1.0/24
Gateway: 172.21.0.1
Interfaz: port7
```

---

# Ideas clave

- Una ruta estática indica cómo llegar a una red no conectada directamente.
- El destino es la red remota que se quiere alcanzar.
- El gateway es el siguiente router o FortiGate del camino.
- Para que exista comunicación completa se necesita ruta de ida y de retorno.
- Las rutas no permiten tráfico por sí solas: también se necesitan Firewall Policies.
- Para conexiones internas entre redes conocidas no se utiliza NAT.
- Las policies deben permitir el tráfico en ambas direcciones cuando ambos lados pueden iniciar conexiones.
- Los objetos Address permiten reutilizar redes en rutas y policies.
- Usar objetos hace que la configuración sea más mantenible y escalable.