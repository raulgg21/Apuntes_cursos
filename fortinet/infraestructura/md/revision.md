# Configuration Revisions en FortiGate

> **Configuration Revisions** permite almacenar instantáneas (*snapshots*) de la configuración del FortiGate para mantener un historial de cambios, comparar versiones y restaurar configuraciones anteriores en caso de incidencia.

---

# ¿Qué es una Configuration Revision?

Una **Configuration Revision** es una copia de la configuración completa del FortiGate en un momento determinado. Cada revisión almacena el estado exacto de la configuración del dispositivo, permitiendo recuperar versiones anteriores cuando sea necesario.

Esta funcionalidad resulta especialmente útil durante tareas de administración, mantenimiento y resolución de incidencias, ya que permite controlar los cambios realizados sobre el firewall.

## Principales ventajas

- 📌 Mantener un historial de configuraciones.
- 🔍 Comparar dos versiones de la configuración.
- ↩️ Restaurar configuraciones anteriores.
- 📝 Facilitar auditorías y control de cambios.
- ⚡ Reducir el tiempo de recuperación ante errores (MTTR).

---

# Gestión mediante GUI

## Acceso

Dependiendo de la versión de FortiOS, acceder desde:

```
Dashboard → Configuration → Revisions
```

o bien

```
System → Configuration → Revisions
```

---

## Crear una revisión

1. Acceder a **Configuration → Revisions**.
2. Seleccionar **Create New**.
3. Introducir un comentario descriptivo *(opcional)*.
4. Guardar la revisión.

### Ejemplos de comentarios

- Antes de actualizar FortiOS
- Configuración previa de VPN SSL
- Cambio de políticas de Firewall
- Modificación de rutas estáticas
- Configuración antes de migración

> **Recomendación:** utilizar siempre comentarios descriptivos para facilitar futuras auditorías.

---

## Visualizar revisiones

Cada revisión muestra información como:

| Campo | Descripción |
|--------|-------------|
| Fecha | Momento en que se creó |
| Administrador | Usuario que realizó la revisión |
| Comentario | Descripción del cambio |
| Tamaño | Tamaño de la configuración |

---

## Comparar revisiones

Seleccionando dos revisiones es posible utilizar la opción **Compare**.

FortiGate mostrará las diferencias entre ambas configuraciones indicando:

- Líneas añadidas
- Líneas eliminadas
- Líneas modificadas

Esta función permite localizar rápidamente los cambios realizados sin revisar la configuración completa.

---

## Restaurar una revisión

Para recuperar una configuración anterior:

1. Seleccionar la revisión deseada.
2. Pulsar **Restore**.
3. Confirmar la restauración.

> **Importante**
>
> Restaurar una revisión sustituye completamente la configuración activa por la configuración almacenada en dicha revisión.

---

# Gestión mediante CLI

## Crear revisiones automáticamente

Es posible configurar FortiGate para que genere automáticamente una revisión cada vez que un administrador cierre sesión.

```cli
config system global
    set revision-backup-on-logout enable
end
```

### Verificar la configuración

```cli
show system global | grep revision
```

Salida esperada:

```cli
set revision-backup-on-logout enable
```

---

## Mostrar las revisiones disponibles

Dependiendo de la versión de FortiOS:

```cli
execute revision list
```

o

```cli
diagnose revision list
```

Ejemplo:

```text
Revision 1
Date: 2025-04-15
Admin: admin
Comments: Antes de actualización

Revision 2
Date: 2025-04-18
Admin: admin
Comments: Configuración VPN SSL
```

---

## Comparar dos revisiones

```cli
execute revision diff <revision_1> <revision_2>
```

Ejemplo:

```cli
execute revision diff 3 5
```

La salida mostrará únicamente las diferencias entre ambas configuraciones.

---

## Restaurar una revisión

```cli
execute revision restore <id_revision>
```

Ejemplo:

```cli
execute revision restore 4
```

Tras la restauración, el FortiGate cargará la configuración correspondiente a esa revisión.

---

# Buenas prácticas

Se recomienda crear una revisión antes de realizar cualquiera de las siguientes tareas:

- Actualizaciones de FortiOS.
- Cambios en políticas de firewall.
- Modificación de interfaces.
- Cambios en rutas estáticas o dinámicas.
- Configuración de VPN IPsec o SSL VPN.
- Creación o modificación de objetos.
- Cambios en perfiles de seguridad.
- Cambios importantes en NAT o SD-WAN.

Asimismo, es recomendable:

- Utilizar comentarios descriptivos.
- Habilitar la creación automática de revisiones al cerrar sesión.
- Comparar configuraciones antes de restaurar una revisión.

---

# Casos de uso

## Actualización de FortiOS

```text
Configuración estable
        │
        ▼
Crear Configuration Revision
        │
        ▼
Actualizar FortiOS
        │
        ▼
¿Problemas?
        │
      Sí ▼
Restaurar revisión anterior
```

---

## Implementación de una VPN

```text
Configuración actual
        │
        ▼
Crear revisión
        │
        ▼
Configurar VPN
        │
        ▼
Comprobar funcionamiento
        │
        ├──────────────► Correcto
        │
        ▼
¿Incidencias?
        │
      Sí ▼
Comparar cambios o restaurar revisión
```

---

## Auditoría de cambios

Si un administrador informa de una modificación en la configuración, las **Configuration Revisions** permiten:

- Identificar cuándo se realizó el cambio.
- Saber qué administrador lo realizó.
- Comparar ambas configuraciones.
- Ver exactamente qué líneas fueron modificadas.
- Restaurar la configuración anterior si fuese necesario.

---

# Ventajas

| Característica | Beneficio |
|----------------|-----------|
| Historial de configuraciones | Recuperación rápida ante errores |
| Comparación de revisiones | Identificación precisa de cambios |
| Restauración | Reversión inmediata de configuraciones |
| Comentarios | Mejor trazabilidad y auditoría |
| GUI intuitiva | Administración sencilla |
| CLI | Automatización mediante scripts |

---

# Consideraciones

> **Nota**
>
> Si en **Configuration → Revisions** aparece el mensaje **No Revision**, significa que actualmente no existe ninguna revisión almacenada en el dispositivo.
>
> Esto puede deberse a que:
>
> - Nunca se ha creado una revisión.
> - No está habilitada la creación automática (`revision-backup-on-logout`).
> - Las revisiones fueron eliminadas.

---

# Resumen

Las **Configuration Revisions** funcionan como un sistema de **control de versiones** para la configuración de FortiGate. Permiten guardar instantáneas de la configuración, comparar cambios entre versiones, restaurar configuraciones anteriores y mantener un historial que facilita tanto la administración diaria como las tareas de auditoría y recuperación ante incidencias.

> **Recomendación:** crear siempre una **Configuration Revision** antes de realizar cambios importantes en el dispositivo para disponer de un punto de recuperación seguro.