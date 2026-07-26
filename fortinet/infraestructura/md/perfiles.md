# Objetivo

Aprender a crear y administrar **administradores locales** y **perfiles de administración (Admin Profiles)** para controlar qué puede hacer cada usuario dentro del FortiGate.

---

# 1. Acceder a los perfiles de administración

Desde el menú principal ir a:

**System → Administrators → Admin Profiles**

Aquí se encuentran todos los perfiles de permisos disponibles.

Por defecto aparecen:

- **Super Admin**
- **Prof Admin (Professional Admin)**

---

# 2. Editar un perfil existente

Dentro de **System → Administrators → Admin Profiles**:

1. Seleccionar **Prof Admin**.
2. Pulsar **Edit**.

> **Nota:** El perfil **Super Admin** no puede modificarse.

---

# 3. Configurar permisos del perfil

Al editar un perfil aparecen varias categorías de configuración:

- Firewall
- Policy & Objects
- Network
- System
- Router
- VPN
- User & Authentication
- Security Fabric
- Log & Report
- Monitor
- WiFi & Switch Controller
- Entre otras (dependiendo de la versión de FortiOS).

Cada categoría permite asignar uno de estos permisos:

- **None** → Sin acceso.
- **Read** → Solo lectura.
- **Read/Write** → Lectura y escritura.

En algunas categorías existe el botón **Custom**, que permite habilitar permisos específicos.

### Ejemplo

Dentro de:

**Policy & Objects → Firewall**

Se puede configurar que el usuario:

- ✅ Edite Address Objects.
- ✅ Edite Service Objects.
- ❌ No pueda modificar Firewall Policies.
- ❌ No pueda modificar Schedules.

---

# 4. Configurar permisos de Network

Dentro del mismo perfil:

**Network**

Asignar:

- Interfaces → Read
- Routing → Read
- Packet Capture → Read

Así el administrador podrá consultar la configuración de red, pero no modificarla.

---

# 5. Configurar permisos de System

Dentro del perfil:

**System**

Asignar:

- Certificate → Read
- Todo lo demás → None

Con esto el usuario prácticamente no tendrá acceso al menú **System**.

---

# 6. Permitir o bloquear comandos de diagnóstico

Al final de la configuración del perfil aparece la opción:

**Allow use of diagnostic commands**

Si se desmarca:

- El usuario **no podrá ejecutar** comandos `diagnose` desde la CLI.

---

# 7. Configurar el tiempo de inactividad

También al final del perfil aparece:

**Override Idle Timeout**

Permite definir un tiempo máximo de inactividad diferente al configurado globalmente para ese perfil.

---

# 8. Guardar el perfil

Una vez terminada la configuración:

**OK**

---

# 9. Crear un administrador local

Ir a:

**System → Administrators**

Pulsar:

**Create New → Administrator**

Completar:

- Username
- Password
- Comment (opcional)

En **Administrator Profile** seleccionar el perfil creado anteriormente.

Ejemplo:

```
Username: soporte
Profile: Prof Admin
```

Guardar con **OK**.

---

# 10. Restringir desde qué redes puede iniciar sesión

Mientras se crea o edita el usuario:

**Trusted Hosts**

Agregar las redes permitidas.

Ejemplo:

```
10.0.1.0/24
```

El usuario únicamente podrá iniciar sesión desde esa red.

---

# 11. Configurar el segundo factor de autenticación (2FA)

Una vez creado el usuario:

Ir a:

**System → Administrators**

Seleccionar el usuario.

Pulsar:

**Edit**

Ahora aparecerá la sección:

**Two-Factor Authentication**

Desde la interfaz gráfica se puede seleccionar:

- FortiToken
- FortiToken Cloud

---

# 12. Ver más opciones desde la CLI

Entrar por consola y ejecutar:

```bash
config system admin
edit soporte
get
```

Para ver las opciones disponibles:

```bash
set two-factor ?
```

Opciones disponibles:

- fortitoken
- fortitoken-cloud
- email
- sms

La CLI ofrece más opciones que la interfaz gráfica.

---

# 13. Probar el nuevo usuario

Cerrar sesión del administrador actual.

Iniciar sesión con el nuevo usuario.

Dependiendo de los permisos configurados:

- Algunos menús desaparecerán completamente.
- Otros estarán visibles únicamente en modo lectura.
- Los botones **Create**, **Edit**, **Delete** o **OK** no estarán disponibles si el usuario no tiene permisos de escritura.

### Ejemplo

Si el perfil tiene:

**Network → Interfaces → Read**

El usuario podrá acceder a:

**Network → Interfaces**

Podrá visualizar la configuración, pero no guardar cambios.

Si el perfil tiene:

**Policy & Objects → Firewall Policy → None**

El menú:

**Policy & Objects → Firewall Policy**

ni siquiera aparecerá.

---

# Buenas prácticas

- Crear un usuario para cada administrador.
- No compartir la cuenta **admin**.
- Utilizar perfiles personalizados.
- Aplicar el principio de mínimos privilegios.
- Restringir el acceso mediante **Trusted Hosts**.
- Habilitar autenticación de doble factor (2FA).