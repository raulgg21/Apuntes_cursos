# Objetivo

Aprender a crear y administrar **usuarios administradores locales** y **perfiles de administración (Admin Profiles)** para aplicar el principio de **mínimos privilegios**.

---

# 1. Administración de perfiles

Ruta:

> **System → Administrators → Admin Profiles**

Los **Admin Profiles** determinan qué permisos tendrá cada administrador.

## Perfiles predeterminados

### Super Admin

- Perfil con **máximos privilegios**.
- Todos los permisos en **Read/Write**.
- **No puede modificarse**.

### Prof Admin (Professional Admin)

- También posee todos los permisos por defecto.
- **Sí puede editarse**.
- Puede utilizarse como base para crear perfiles personalizados.

---

# 2. Personalización de permisos

Cada categoría permite definir distintos niveles de acceso:

- **None** → Sin acceso.
- **Read** → Solo lectura.
- **Read/Write** → Lectura y escritura.

Algunas secciones permiten un modo **Custom**, donde se pueden habilitar permisos específicos.

Ejemplo en **Firewall**:

- Permitir editar objetos de direcciones.
- Permitir editar objetos de servicios.
- Prohibir modificar políticas.
- Prohibir modificar schedules.

Esto permite construir perfiles muy específicos.

---

# 3. Ejemplo de perfil para soporte

Un administrador de soporte podría tener:

## System

- Sin permisos administrativos.
- Acceso únicamente a certificados (si es necesario).

## Network

- Solo lectura de:
  - Interfaces
  - Captura de paquetes
  - Rutas

## Firewall

- Acceso a objetos.
- Sin permiso para modificar políticas.

Este tipo de perfil evita cambios accidentales en la configuración.

---

# 4. Acciones rápidas

Los perfiles incluyen botones para aplicar permisos masivamente:

- **None**
- **Read**
- **Read/Write**
- **Custom**

Facilitan la configuración cuando existen muchas categorías.

---

# 5. Permitir comandos de diagnóstico (CLI)

Existe la opción:

> **Allow use of diagnostic commands**

Controla si el administrador puede ejecutar comandos como:

```bash
diagnose ...
```

Si se deshabilita, el usuario no podrá utilizar dichos comandos desde la CLI.

---

# 6. Override Idle Timeout

Cada perfil puede sobrescribir el tiempo máximo de inactividad del administrador.

Ejemplo:

- Configuración global: **480 minutos**
- Un perfil específico puede usar otro valor.

---

# 7. Creación de administradores locales

Ruta:

> **System → Administrators**

Crear un nuevo administrador.

Datos principales:

- Usuario
- Contraseña
- Comentario
- Tipo de autenticación

### Tipo de autenticación

Puede ser:

- Usuario local
- Grupo remoto (LDAP, RADIUS, etc.)

---

# 8. Asignación del perfil

Al crear el usuario se selecciona el **Admin Profile** correspondiente.

Ejemplo:

```
Usuario: soporte
Perfil: Prof Admin
```

---

# 9. Otros perfiles predeterminados

Además de los perfiles visibles existen:

## no_access

- Sin permisos.

## super_admin_read_only

- Acceso completo únicamente en lectura.
- No permite realizar cambios.

---

# 10. Restricción por Trusted Hosts

Es posible limitar desde qué redes puede iniciar sesión un administrador.

Ejemplo:

```
10.0.1.0/24
```

Así el usuario solo podrá acceder desde la red corporativa.

Es una buena práctica para impedir accesos desde Internet u otras redes no confiables.

---

# 11. Restricción por VDOM

También puede limitarse el acceso del administrador a determinados **VDOMs**.

---

# 12. Segundo factor de autenticación (2FA)

La opción aparece **después de crear el usuario**.

Al editarlo se habilita la configuración.

---

## Opciones disponibles en la GUI

- FortiToken
- FortiToken Cloud

---

## Opciones adicionales desde CLI

Mediante:

```bash
config system admin
edit <usuario>
get
```

Puede verse el parámetro:

```bash
set two-factor
```

Opciones disponibles:

- FortiToken
- FortiToken Cloud
- Email
- SMS

La CLI muestra más opciones que la interfaz gráfica.

---

## Autenticación por Email

Es gratuita.

Proceso:

1. Usuario ingresa credenciales.
2. FortiGate envía un código al correo configurado.
3. El usuario introduce ese código para completar el acceso.

---

## Autenticación por SMS

También está disponible.

Requiere la configuración previa del servicio SMS.

---

# 13. Comprobación de permisos

Al iniciar sesión con el usuario de soporte se observa que:

- Solo aparecen los menús autorizados.
- Los menús restringidos desaparecen.
- Puede visualizar información permitida.
- No puede guardar modificaciones.

Ejemplo:

Puede abrir la configuración de interfaces, pero el botón **OK** no está disponible para aplicar cambios.

---

# 14. Buenas prácticas

- No utilizar siempre el usuario **admin**.
- Crear un administrador para cada persona.
- Asignar únicamente los permisos necesarios.
- Restringir el acceso mediante **Trusted Hosts**.
- Utilizar **autenticación de dos factores**.
- Evitar compartir cuentas administrativas.
- Aplicar el principio de **mínimos privilegios**.

---

# Conceptos clave

- **Admin Profile**: conjunto de permisos administrativos.
- **Super Admin**: acceso total, no editable.
- **Prof Admin**: perfil editable.
- **Read / Read-Write / None**: niveles de permisos.
- **Trusted Hosts**: restringe desde qué IP puede acceder un administrador.
- **Two-Factor Authentication (2FA)**: FortiToken, Email o SMS.
- **CLI** ofrece opciones de configuración adicionales respecto a la GUI.