---

# Índice

1. Introducción
2. Estructura de la CLI
3. Modos de trabajo
4. Comandos básicos
5. Configuración del sistema
6. Interfaces
7. VLAN

---

# 1. Introducción

La CLI de FortiGate está organizada en cuatro familias principales:

- get
- show
- config
- diagnose

Además existen comandos execute para acciones inmediatas.

---

# 2. Sintaxis general

```bash
config <objeto>
    edit <nombre>
        set parametro valor
    next
end
```

Ejemplo:

```bash
config system interface
    edit port1
        set ip 192.168.1.1/24
        set allowaccess ping https ssh
    next
end
```

---

# 3. Comandos básicos de navegación

## end

Sintaxis

```bash
end
```

Descripción

Finaliza el modo de configuración y guarda los cambios.

Ejemplo

```bash
config system interface
...
end
```

---

## next

Sintaxis

```bash
next
```

Descripción

Finaliza la edición del objeto actual y pasa al siguiente.

Ejemplo

```bash
edit port1
set ip 192.168.1.1/24
next
```

---

## edit

Sintaxis

```bash
edit <nombre>
```

Descripción

Abre o crea un objeto.

Ejemplo

```bash
edit port2
```

---

## abort

Sintaxis

```bash
abort
```

Descripción

Cancela la configuración actual sin guardar.

---

## delete

Sintaxis

```bash
delete <objeto>
```

Descripción

Elimina un objeto.

Ejemplo

```bash
delete puerto_antiguo
```

---

## rename

Sintaxis

```bash
rename antiguo nuevo
```

Descripción

Renombra un objeto.

---

## move

Sintaxis

```bash
move <objeto> before|after <objeto>
```

Descripción

Reordena elementos.

Muy utilizado en firewall policies.

---

# 4. Familia GET

Los comandos GET muestran el estado actual del equipo.

No modifican configuración.

---

## get system status

Sintaxis

```bash
get system status
```

Descripción

Muestra información general del FortiGate.

Información devuelta

- Modelo
- Hostname
- Serial Number
- Firmware
- Build
- Uptime
- Modo HA
- VDOM
- Número de sesiones

Uso típico

- Inventario
- Apertura de casos TAC
- Comprobación de versión

---

## get system performance status

```bash
get system performance status
```

Descripción

Muestra rendimiento en tiempo real.

Incluye

- CPU
- Memoria
- Sesiones
- Throughput
- Conservación de memoria

---

## get system arp

```bash
get system arp
```

Descripción

Lista la tabla ARP.

Campos

- IP
- MAC
- Interface

---

## get router info routing-table all

```bash
get router info routing-table all
```

Descripción

Muestra la tabla completa de routing.

Incluye

- Connected
- Static
- OSPF
- BGP
- RIP
- Kernel

---

## get router info routing-table details

```bash
get router info routing-table details
```

Descripción

Información extendida de rutas.

---

## get router info routing-table database

Descripción

Base de datos de rutas antes de instalarse en la FIB.

---

## get hardware nic

```bash
get hardware nic port1
```

Descripción

Estado físico de una interfaz.

Devuelve

- Speed
- Duplex
- RX
- TX
- CRC Errors

---

## get hardware cpu

Descripción

Información del procesador.

---

## get hardware memory

Descripción

Estado de la memoria física.

---

## get vpn ipsec tunnel summary

Descripción

Resumen de todos los túneles IPSec.

---

## get vpn ssl monitor

Descripción

Usuarios SSL VPN conectados.

---

## get firewall policy

Descripción

Lista las políticas activas.

---

## get firewall address

Descripción

Lista todos los objetos Address.

---

## get firewall service custom

Descripción

Lista servicios personalizados.

---

# 5. Familia SHOW

SHOW presenta la configuración almacenada.

No consulta el estado actual.

---

## show

```bash
show
```

Descripción

Muestra la configuración del contexto actual.

---

## show full

```bash
show full
```

Descripción

Muestra todos los parámetros, incluidos los valores por defecto.

---

## show system interface

```bash
show system interface
```

Descripción

Muestra la configuración de todas las interfaces.

---

## show firewall policy

Descripción

Visualiza todas las políticas configuradas.

---

## show router static

Descripción

Visualiza las rutas estáticas.

---

## show vpn ipsec phase1-interface

Descripción

Configuración Phase1.

---

## show vpn ipsec phase2-interface

Descripción

Configuración Phase2.

---

## show system ha

Descripción

Configuración HA.

---
# 6. CONFIG SYSTEM

La familia `config system` contiene la configuración global del dispositivo, administración, interfaces, servicios del sistema, NTP, DNS, administradores, SNMP y otros componentes fundamentales.

Sintaxis general:

```bash
config system <objeto>
    edit <nombre>
        set <parámetro> <valor>
    next
end
```

---

# 6.1 config system global

Permite configurar parámetros generales del FortiGate.

Entrar al modo:

```bash
config system global
```

---

## set hostname

```bash
set hostname FGT-HQ
```

### Qué hace

Configura el nombre del firewall.

### Ejemplo

```bash
config system global
    set hostname MADRID-FGT01
end
```

---

## set alias

```bash
set alias Datacenter
```

### Qué hace

Asigna un alias descriptivo al equipo.

---

## set admintimeout

```bash
set admintimeout 30
```

### Qué hace

Tiempo de inactividad antes del cierre automático de sesión.

Unidad:

Minutos.

---

## set timezone

```bash
set timezone 28
```

### Qué hace

Configura la zona horaria.

Consultar disponibles:

```bash
show full system global
```

---

## set gui-theme

```bash
set gui-theme dark
```

### Qué hace

Selecciona el tema del GUI.

Valores habituales

- dark
- light
- blue

---

## set gui-language

```bash
set gui-language english
```

Idioma del interfaz.

---

## set gui-lines-per-page

```bash
set gui-lines-per-page 100
```

Número de elementos por página.

---

## set gui-ipv6

```bash
set gui-ipv6 enable
```

Habilita opciones IPv6 en GUI.

---

## set gui-local-out

```bash
set gui-local-out enable
```

Permite visualizar configuración Local Out.

---

## set admin-server-cert

```bash
set admin-server-cert Fortinet_Factory
```

Certificado HTTPS del GUI.

---

## set admin-https-ssl-versions

```bash
set admin-https-ssl-versions tlsv1-2 tlsv1-3
```

Versiones TLS permitidas.

---

## set admin-https-redirect

```bash
set admin-https-redirect enable
```

Redirige HTTP → HTTPS.

---

## set admin-sport

```bash
set admin-sport 10443
```

Puerto HTTPS administrativo.

---

## set admin-ssh-port

```bash
set admin-ssh-port 2222
```

Puerto SSH.

---

## set admin-telnet-port

```bash
set admin-telnet-port 23
```

Puerto Telnet.

(No recomendado)

---

## set admin-console-timeout

```bash
set admin-console-timeout 10
```

Timeout consola serie.

---

## set admin-lockout-threshold

```bash
set admin-lockout-threshold 5
```

Número de intentos fallidos.

---

## set admin-lockout-duration

```bash
set admin-lockout-duration 300
```

Duración del bloqueo.

Segundos.

---

## set admin-login-max

```bash
set admin-login-max 100
```

Máximo número de administradores conectados.

---

## set language

```bash
set language english
```

Idioma CLI.

---

## set revision-backup-on-logout

```bash
set revision-backup-on-logout enable
```

Genera revisión automática.

---

## set cfg-save

```bash
set cfg-save automatic
```

Opciones

- automatic
- manual

---

## set daily-restart

```bash
set daily-restart enable
```

Permite reinicio diario.

---

## set daily-restart-time

```bash
set daily-restart-time 03:00
```

Hora del reinicio.

---

## set wireless-controller

```bash
set wireless-controller enable
```

Activa FortiAP Controller.

---

## set switch-controller

```bash
set switch-controller enable
```

Activa FortiSwitch Controller.

---

## set gui-wireless-opensecurity

Permite redes abiertas desde GUI.

---

## set gui-device-latitude

Coordenada geográfica.

---

## set gui-device-longitude

Coordenada geográfica.

---

## show

```bash
show system global
```

Visualiza configuración.

---

## show full

```bash
show full system global
```

Visualiza todos los parámetros.

---

# 6.2 config system settings

Configuración general del sistema.

Entrar:

```bash
config system settings
```

---

## set gui-load-balance

Balanceo GUI.

---

## set asymroute

```bash
set asymroute enable
```

Permite routing asimétrico.

Usar únicamente cuando sea necesario.

---

## set asymroute6

Versión IPv6.

---

## set allow-subnet-overlap

```bash
set allow-subnet-overlap enable
```

Permite interfaces con redes superpuestas.

---

## set multicast-forward

```bash
set multicast-forward enable
```

Habilita forwarding multicast.

---

## set multicast-skip-policy

Ignora políticas para multicast.

---

## set default-voip-alg-mode

Modo ALG SIP.

---

## set ses-denied-traffic

```bash
set ses-denied-traffic enable
```

Permite contabilizar tráfico denegado.

---

## set tcp-session-without-syn

Permite sesiones TCP sin SYN inicial.

Muy útil durante troubleshooting.

---

## set tcp-halfclose-timer

Temporizador HALF CLOSE.

---

## set tcp-timewait-timer

Temporizador TIME_WAIT.

---

## set udp-idle-timer

Idle timeout UDP.

---

## set default-session-ttl

```bash
set default-session-ttl 3600
```

TTL por defecto.

---

## set honor-df

Respeta bit Don't Fragment.

---

## set firewall-session-dirty

Opciones:

- check-all
- check-new

---

## set scan-botnet-connections

```bash
set scan-botnet-connections block
```

Escaneo Botnet.

---

## set sip-helper

```bash
set sip-helper disable
```

Deshabilita helper SIP.

Frecuente en VoIP modernas.

---

## set sip-nat-trace

Control NAT SIP.

---

## set ssl-static-key-ciphers

Compatibilidad SSL.

---

## set permit-any-host

Permite certificados wildcard.

---

## show

```bash
show system settings
```

---

# 6.3 config system dns

Configuración DNS.

Entrar:

```bash
config system dns
```

---

## set primary

```bash
set primary 1.1.1.1
```

Servidor DNS primario.

---

## set secondary

```bash
set secondary 8.8.8.8
```

Servidor secundario.

---

## set protocol

```bash
set protocol cleartext
```

Opciones

- cleartext
- dot
- doh

---

## set server-select-method

Método de selección.

---

## set source-ip

IP origen consultas DNS.

---

## set interface-select-method

Selección automática interfaz.

---

## show

```bash
show system dns
```

---

# 6.4 config system ntp

Configuración NTP.

Entrar:

```bash
config system ntp
```

---

## set ntpsync

```bash
set ntpsync enable
```

Activa sincronización.

---

## set type

```bash
set type custom
```

Valores

- fortiguard
- custom

---

## config ntpserver

```bash
config ntpserver
```

Define servidores.

---

## edit 1

```bash
edit 1
```

Primer servidor.

---

## set server

```bash
set server pool.ntp.org
```

Servidor NTP.

---

## set interface

```bash
set interface port1
```

Interfaz utilizada.

---

## next

Pasa al siguiente servidor.

---

## end

Guarda configuración.

---

## show

```bash
show system ntp
```

---

# 6.5 execute (acciones relacionadas)

Aunque no pertenece a config, suele utilizarse junto a la administración del sistema.

---

## execute time

```bash
execute time
```

Muestra fecha y hora.

---

## execute date

```bash
execute date
```

Muestra la fecha.

---

## execute reboot

```bash
execute reboot
```

Reinicia el equipo.

⚠️ Interrumpe el servicio.

---

## execute shutdown

```bash
execute shutdown
```

Apaga el dispositivo.

---

## execute backup config

```bash
execute backup config flash backup.conf
```

Guarda copia local.

---

## execute restore config

```bash
execute restore config flash backup.conf
```

Restaura configuración.

---

## execute ping

```bash
execute ping 8.8.8.8
```

Comprueba conectividad.

---

## execute traceroute

```bash
execute traceroute 8.8.8.8
```

Traza la ruta.

---

## execute nslookup

```bash
execute nslookup www.google.com
```

Consulta DNS.

---

## execute telnet

```bash
execute telnet 192.168.1.100 443
```

Comprueba puertos TCP.

---

## execute ssh

```bash
execute ssh admin@192.168.1.20
```

Abre sesión SSH desde el FortiGate.

---
# 6.6 CONFIG SYSTEM INTERFACE

Las interfaces son uno de los elementos fundamentales de FortiOS. Sobre ellas se construyen las VLAN, políticas, VPN, SD-WAN y prácticamente toda la configuración del firewall.

Entrar en el contexto:

```bash
config system interface
```

---

# show

```bash
show system interface
```

## Qué hace

Muestra únicamente la configuración modificada de todas las interfaces.

## Uso típico

- Auditorías
- Backup rápido
- Comprobar configuración

---

# show full

```bash
show full system interface
```

## Qué hace

Muestra toda la configuración incluyendo valores por defecto.

Muy útil para troubleshooting.

---

# edit

```bash
edit port1
```

## Qué hace

Selecciona una interfaz para modificarla.

Si no existe, se crea.

Ejemplo

```bash
config system interface

edit port1

...
```

---

# set alias

```bash
set alias INTERNET
```

## Qué hace

Añade un nombre descriptivo.

No modifica el nombre real.

Ejemplo

```bash
set alias MPLS
```

Buenas prácticas

Siempre utilizar alias descriptivos.

---

# set description

```bash
set description "Firewall ISP Principal"
```

Permite documentar la interfaz.

Muy recomendable.

---

# set ip

```bash
set ip 192.168.10.1/24
```

## Qué hace

Asigna dirección IPv4.

Formato

```text
IP/Prefijo
```

Ejemplos

```bash
set ip 10.0.0.1/24

set ip 172.16.100.1/30

set ip 192.168.1.254/24
```

---

# unset ip

```bash
unset ip
```

Elimina la dirección configurada.

---

# set mode

```bash
set mode static
```

Valores

- static
- dhcp
- pppoe

---

Modo Static

```bash
set mode static
set ip 192.168.1.1/24
```

---

Modo DHCP

```bash
set mode dhcp
```

Obtiene IP automáticamente.

---

Modo PPPoE

```bash
set mode pppoe
```

Requiere usuario y contraseña.

---

# set distance

```bash
set distance 5
```

Distancia administrativa.

Normalmente utilizada en WAN DHCP.

---

# set mtu-override

```bash
set mtu-override enable
```

Permite configurar MTU manualmente.

---

# set mtu

```bash
set mtu 1500
```

Ejemplos

Ethernet

```bash
1500
```

VPN

```bash
1438
```

PPPoE

```bash
1492
```

Jumbo

```bash
9000
```

---

# set allowaccess

Uno de los comandos más importantes.

Define los protocolos administrativos.

Ejemplo

```bash
set allowaccess ping https ssh
```

Valores posibles

```text
ping
https
http
ssh
snmp
fgfm
radius-acct
fabric
probe-response
ftm
```

Ejemplos

Administración segura

```bash
set allowaccess ping https ssh
```

Solo Ping

```bash
set allowaccess ping
```

Sin acceso

```bash
unset allowaccess
```

Buenas prácticas

Nunca habilitar HTTP.

Evitar Telnet.

Limitar SSH únicamente a redes de gestión.

---

# set role

```bash
set role lan
```

Valores

```text
lan
wan
dmz
undefined
```

Afecta principalmente al GUI.

---

# set status

```bash
set status up
```

Valores

```bash
up
down
```

Deshabilitar interfaz

```bash
set status down
```

---

# set speed

```bash
set speed 1000full
```

Valores frecuentes

```text
auto

10full

10half

100full

100half

1000full

10000full
```

Recomendación

Mantener auto salvo necesidades específicas.

---

# set estimated-upstream-bandwidth

```bash
set estimated-upstream-bandwidth 500000
```

Unidad

Kbps

Usado por SD-WAN.

---

# set estimated-downstream-bandwidth

```bash
set estimated-downstream-bandwidth 1000000
```

También utilizado por SD-WAN.

---

# set secondary-IP

```bash
set secondary-IP enable
```

Permite múltiples direcciones IP.

---

# config secondaryip

Entrar

```bash
config secondaryip
```

---

Crear IP secundaria

```bash
edit 1

set ip 10.10.10.1/24

next

end
```

Caso típico

Migraciones.

Convivencia temporal.

---

# set vlanforward

```bash
set vlanforward enable
```

Permite forwarding Layer2.

Poco utilizado.

---

# set lldp-reception

```bash
set lldp-reception enable
```

Recibe anuncios LLDP.

---

# set lldp-transmission

```bash
set lldp-transmission enable
```

Publica información LLDP.

---

# set device-identification

```bash
set device-identification enable
```

Permite identificar dispositivos automáticamente.

Muy usado con Fabric.

---

# set defaultgw

```bash
set defaultgw enable
```

Usado normalmente en interfaces DHCP.

---

# set dns-server-override

```bash
set dns-server-override enable
```

Acepta DNS enviados por DHCP.

---

# set preserve-session-route

```bash
set preserve-session-route enable
```

Mantiene sesiones existentes.

Muy útil durante cambios dinámicos.

---

# set tcp-mss

```bash
set tcp-mss 1360
```

Limita MSS TCP.

Frecuente en VPN IPSec.

---

# set drop-overlapped-fragment

```bash
set drop-overlapped-fragment enable
```

Protección frente a ataques de fragmentación.

---

# set src-check

```bash
set src-check enable
```

Activa Reverse Path Forwarding.

Recomendado.

---

# set snmp-index

```bash
set snmp-index 3
```

Índice utilizado por SNMP.

---

# set interface

```bash
set interface port1
```

Utilizado por VLAN.

Define interfaz padre.

---

# unset interface

Elimina interfaz asociada.

---

# next

Guarda la interfaz actual.

---

# end

Finaliza configuración.

---

# Ejemplo completo

```bash
config system interface

edit port1

set alias INTERNET

set role wan

set ip 80.80.80.2/30

set allowaccess ping https ssh

set mtu 1500

set device-identification enable

set estimated-upstream-bandwidth 1000000

set estimated-downstream-bandwidth 1000000

next

end
```

Resultado

- WAN configurada
- HTTPS
- SSH
- Ping
- Identificación automática
- Preparada para SD-WAN

---

# Errores habituales

❌ Configurar HTTPS y HTTP simultáneamente.

❌ No habilitar ping durante despliegues.

❌ Configurar MTU incorrecta.

❌ Desactivar src-check sin necesidad.

❌ No documentar alias ni descripción.

---

# Comandos relacionados

show system interface

diagnose netlink interface list

get system interface

diagnose hardware deviceinfo nic

diagnose ip address list

get hardware nic
---

# 6.7 CONFIG SYSTEM INTERFACE (Continuación)

# Interfaces VLAN

Las interfaces VLAN permiten crear subinterfaces IEEE 802.1Q sobre una interfaz física o un agregado (LACP).

Entrar:

```bash
config system interface
```

---

## Crear una VLAN

```bash
edit VLAN100
```

Crea la interfaz lógica.

---

## set type vlan

```bash
set type vlan
```

### Qué hace

Indica que la interfaz será una VLAN 802.1Q.

---

## set interface

```bash
set interface port1
```

### Qué hace

Define la interfaz física padre.

Ejemplos

```bash
set interface port1
```

```bash
set interface agg1
```

```bash
set interface fortilink
```

---

## set vlanid

```bash
set vlanid 100
```

### Qué hace

Configura el identificador VLAN.

Valores

```text
1-4094
```

Ejemplo

```bash
config system interface

edit VLAN100

set interface port1

set vlanid 100

set ip 192.168.100.1/24

next

end
```

---

## Caso práctico

WAN

```
port1
```

↓

VLAN ISP

```
VLAN10
```

↓

PPPoE

↓

Internet

---

# Interfaces Loopback

Una loopback nunca depende de un enlace físico.

Muy utilizadas para

- BGP
- OSPF
- VPN
- Gestión
- Router ID

---

## Crear Loopback

```bash
edit Loopback0
```

---

## set type loopback

```bash
set type loopback
```

---

## Configuración completa

```bash
config system interface

edit Loopback0

set type loopback

set ip 10.255.255.1/32

set allowaccess ping

next

end
```

---

# Interfaces Aggregate (LACP)

Permiten agrupar enlaces físicos.

Norma IEEE 802.3ad

---

## Crear Aggregate

```bash
edit agg1
```

---

## set type aggregate

```bash
set type aggregate
```

---

## set member

```bash
set member port2 port3
```

Define interfaces físicas.

---

## set lacp-mode

```bash
set lacp-mode active
```

Valores

```text
active

passive

static
```

---

## set algorithm

```bash
set algorithm L4
```

Algoritmos

```text
L2

L3

L4
```

---

## Ejemplo

```bash
config system interface

edit agg1

set type aggregate

set member port2 port3

set lacp-mode active

set ip 10.10.10.1/24

next

end
```

---

# Interfaces Redundant

Alternativa simple a LACP.

Solo una interfaz transmite.

---

## Crear

```bash
edit REDUNDANT1
```

---

## set type redundant

```bash
set type redundant
```

---

## set member

```bash
set member port5 port6
```

---

## Ejemplo

```bash
config system interface

edit WAN_RED

set type redundant

set member port1 port2

set ip 200.1.1.2/30

next

end
```

---

# Interfaces Tunnel

Representan interfaces virtuales.

Usadas por

- IPsec
- GRE
- VXLAN
- SD-WAN

---

## set type tunnel

```bash
set type tunnel
```

---

## Configuración

Generalmente creada automáticamente.

---

# EMAC VLAN

Permite múltiples MAC sobre una interfaz.

Muy usada por proveedores.

---

## set type emac-vlan

```bash
set type emac-vlan
```

---

## set vlanid

Define VLAN.

---

## set interface

Interfaz física.

---

# Interfaces PPPoE

---

## set mode pppoe

```bash
set mode pppoe
```

---

## set username

```bash
set username usuarioISP
```

---

## set password

```bash
set password ********
```

---

## set distance

```bash
set distance 5
```

---

## set defaultgw

```bash
set defaultgw enable
```

---

## set dns-server-override

```bash
set dns-server-override enable
```

---

## Ejemplo completo

```bash
config system interface

edit WAN

set mode pppoe

set username fibra

set password MiClave

set allowaccess ping https ssh

next

end
```

---

# Interfaces DHCP Client

---

## set mode dhcp

```bash
set mode dhcp
```

---

## set defaultgw

```bash
set defaultgw enable
```

Acepta gateway DHCP.

---

## set distance

```bash
set distance 10
```

---

## set dns-server-override

```bash
set dns-server-override enable
```

---

## set mtu-override

```bash
set mtu-override enable
```

---

## set mtu

```bash
set mtu 1500
```

---

# Hardware Switch

Permite agrupar interfaces Layer2.

---

## Crear

```bash
edit LAN
```

---

## set type hard-switch

```bash
set type hard-switch
```

---

## set member

```bash
set member port2 port3 port4
```

---

## Ejemplo

```bash
config system interface

edit LAN

set type hard-switch

set member port2 port3 port4

set ip 192.168.1.1/24

next

end
```

---

# FortiLink

Utilizado para gestionar FortiSwitch.

---

## set fortilink

```bash
set fortilink enable
```

---

## set allowaccess

Habitualmente

```bash
set allowaccess ping https ssh fgfm
```

---

## set role

```bash
set role lan
```

---

# Configuración IPv6

---

## set ip6-address

```bash
set ip6-address 2001:db8:100::1/64
```

---

## set ip6-allowaccess

```bash
set ip6-allowaccess ping https ssh
```

---

## set ip6-send-adv

```bash
set ip6-send-adv enable
```

Envía Router Advertisement.

---

## set ip6-other-flag

```bash
set ip6-other-flag enable
```

---

## set ip6-managed-flag

```bash
set ip6-managed-flag enable
```

---

## set ip6-reachable-time

Tiempo de alcanzabilidad.

---

## set ip6-retrans-time

Tiempo de retransmisión.

---

# VRRP

Permite redundancia de gateway.

---

## config vrrp

```bash
config vrrp
```

---

## edit

```bash
edit 1
```

---

## set vrid

```bash
set vrid 10
```

---

## set priority

```bash
set priority 200
```

Mayor prioridad = Master.

---

## set vrip

```bash
set vrip 192.168.1.254
```

Gateway virtual.

---

## set preempt

```bash
set preempt enable
```

---

## Ejemplo

```bash
config system interface

edit port3

config vrrp

edit 1

set vrid 1

set vrip 192.168.10.254

set priority 200

next

end

next

end
```

---

# Diagnóstico de Interfaces

## diagnose netlink interface list

```bash
diagnose netlink interface list
```

Información muy detallada.

Incluye

- MTU
- MAC
- Estado
- Flags
- IPv4
- IPv6
- Estadísticas

---

## diagnose ip address list

```bash
diagnose ip address list
```

Lista todas las direcciones IP configuradas.

---

## diagnose hardware deviceinfo nic

```bash
diagnose hardware deviceinfo nic port1
```

Información física:

- Speed
- Duplex
- RX
- TX
- CRC
- Errores
- Link

---

## get hardware nic

```bash
get hardware nic port1
```

Resumen del estado del puerto.

---

# Buenas prácticas

✔ Utilizar alias descriptivos.

✔ Documentar todas las interfaces con `set description`.

✔ Configurar únicamente `https`, `ssh` y `ping` en `allowaccess` salvo necesidad específica.

✔ Mantener `speed auto` cuando sea posible.

✔ Configurar correctamente el ancho de banda estimado para obtener mejores resultados con SD-WAN.

✔ Emplear loopbacks para Router ID en BGP y OSPF.

✔ Usar interfaces agregadas (LACP) para aumentar capacidad y resiliencia cuando el switch lo soporte.

✔ Evitar `hard-switch` en despliegues complejos donde se requiera un control detallado del tráfico.

---
# 7. ROUTING

El subsistema de routing de FortiGate controla cómo se reenvía el tráfico entre interfaces.

Componentes principales:

```
config router static
config router setting
config router policy
config router ospf
config router bgp
config router rip
config router isis
config router multicast
config router prefix-list
config router route-map
config router community-list
config router access-list
```

---

# 7.1 CONFIG ROUTER STATIC

Permite crear rutas estáticas IPv4.

Entrar

```bash
config router static
```

---

## edit

```bash
edit 1
```

Selecciona el ID de la ruta.

Puede ser cualquier número libre.

---

## set dst

```bash
set dst 192.168.20.0/24
```

### Qué hace

Define la red destino.

Ejemplos

```bash
set dst 10.0.0.0/8

set dst 172.16.1.0/24

set dst 192.168.1.10/32

set dst 0.0.0.0/0
```

---

## set gateway

```bash
set gateway 192.168.1.254
```

Define el siguiente salto.

Debe ser alcanzable.

---

## set device

```bash
set device port1
```

Define la interfaz de salida.

Ejemplos

```bash
set device port1

set device port2

set device agg1

set device VPN-HQ
```

---

## set distance

```bash
set distance 10
```

Distancia administrativa.

Valores

```
1-255
```

Ejemplo

ISP Principal

```
10
```

ISP Backup

```
20
```

---

## set priority

```bash
set priority 5
```

Prioridad entre rutas con igual distancia.

Menor número = mayor prioridad.

---

## set weight

```bash
set weight 20
```

Usado con ECMP.

---

## set blackhole

```bash
set blackhole enable
```

Descarta tráfico.

No necesita gateway.

Muy utilizado contra ataques.

---

## set comment

```bash
set comment "Ruta Backup MPLS"
```

Documentación.

Muy recomendable.

---

## set status

```bash
set status disable
```

Valores

```
enable

disable
```

Permite mantener rutas sin utilizar.

---

## set dynamic-gateway

```bash
set dynamic-gateway enable
```

Utiliza gateway aprendido.

Normalmente DHCP.

---

## set dstaddr

Disponible en versiones recientes.

Permite utilizar objetos.

---

## set internet-service

Usado junto con ISDB.

---

## set internet-service-id

Selecciona servicio FortiGuard.

---

## next

Guarda ruta.

---

## end

Finaliza configuración.

---

# Ejemplo 1

Ruta hacia oficina remota

```bash
config router static

edit 1

set dst 10.10.20.0/24

set gateway 192.168.1.2

set device port2

next

end
```

---

# Ejemplo 2

Ruta por defecto

```bash
config router static

edit 1

set dst 0.0.0.0/0

set gateway 80.80.80.1

set device port1

next

end
```

---

# Ejemplo 3

Blackhole

```bash
config router static

edit 5

set dst 192.168.99.0/24

set blackhole enable

next

end
```

---

# Mostrar rutas

```bash
show router static
```

---

# Mostrar configuración completa

```bash
show full router static
```

---

# Eliminar

```bash
delete 5
```

---

# 7.2 CONFIG ROUTER SETTING

Configuración global del motor de routing.

Entrar

```bash
config router setting
```

---

## set ecmp-max-paths

```bash
set ecmp-max-paths 4
```

Número máximo de rutas ECMP.

---

## set ecmp-mode

```bash
set ecmp-mode source-ip-based
```

Opciones

```
source-ip-based

weight-based

usage-based

source-dest-ip-based
```

---

## set default-gateway

```bash
set default-gateway 192.168.1.254
```

Muy poco utilizado.

Normalmente se emplean rutas estáticas.

---

## set multicast-forward

```bash
set multicast-forward enable
```

Forwarding multicast.

---

## set tcp-timewait-timer

Temporizador TCP.

---

## show

```bash
show router setting
```

---

# 7.3 POLICY ROUTES

Las Policy Routes tienen prioridad sobre la tabla de routing.

Muy utilizadas en

- SD-WAN antiguos

- VPN

- Tráfico específico

Entrar

```bash
config router policy
```

---

## edit

```bash
edit 1
```

---

## set input-device

```bash
set input-device port2
```

Interfaz entrada.

---

## set src

```bash
set src 192.168.10.0/24
```

Origen.

---

## set dst

```bash
set dst 8.8.8.8/32
```

Destino.

---

## set protocol

```bash
set protocol 6
```

Protocolos

```
1 ICMP

6 TCP

17 UDP
```

---

## set start-port

Puerto inicial.

---

## set end-port

Puerto final.

---

## set gateway

Gateway.

---

## set output-device

```bash
set output-device port1
```

Interfaz salida.

---

## set tos

Permite filtrar ToS.

---

## set status

```bash
set status enable
```

---

## Ejemplo

```bash
config router policy

edit 1

set input-device LAN

set src 192.168.50.0/24

set dst 0.0.0.0/0

set gateway 80.80.80.1

set output-device WAN1

next

end
```

---

# Diagnóstico Routing

## get router info routing-table all

```bash
get router info routing-table all
```

Muestra todas las rutas.

Incluye

```
C

S

B

O

R

K
```

---

## get router info routing-table details

```bash
get router info routing-table details
```

Información extendida.

---

## get router info kernel

```bash
get router info kernel
```

Tabla instalada en kernel.

---

## get router info ospf

Resumen OSPF.

---

## get router info bgp

Resumen BGP.

---

## diagnose ip route list

```bash
diagnose ip route list
```

Tabla interna del kernel.

Muy utilizada por TAC.

---

## diagnose ip router fib

```bash
diagnose ip router fib
```

Forwarding Information Base.

---

## diagnose ip router list

```bash
diagnose ip router list
```

Motor interno.

---

## diagnose ip route match

```bash
diagnose ip route match 8.8.8.8
```

Busca qué ruta utilizará un destino.

Uno de los comandos más útiles.

---

## diagnose ip rtcache list

Cache de rutas.

---

## diagnose firewall proute list

```bash
diagnose firewall proute list
```

Lista Policy Routes.

---

## diagnose firewall proute match

```bash
diagnose firewall proute match 192.168.10.5 8.8.8.8
```

Comprueba qué Policy Route aplicará.

Muy útil durante troubleshooting.

---

# Buenas prácticas

✔ Documentar todas las rutas con `set comment`.

✔ Utilizar distancias administrativas diferentes para enlaces de respaldo.

✔ Emplear rutas Blackhole para evitar bucles y mitigar tráfico malicioso.

✔ Verificar siempre la ruta efectiva con `diagnose ip route match` antes de asumir un problema de routing.

✔ Evitar el uso excesivo de Policy Routes; cuando sea posible, preferir rutas estáticas o SD-WAN para simplificar la administración.

---
---

# 7.4 CONFIG ROUTER OSPF

## Descripción

OSPF (Open Shortest Path First) es un protocolo de routing dinámico de tipo **Link State** basado en el algoritmo SPF (Dijkstra).

FortiGate soporta:

- OSPFv2 (IPv4)
- Múltiples áreas
- Backbone Area (0)
- Stub
- Totally Stub
- NSSA
- Virtual Links
- Route Redistribution
- ECMP
- MD5 Authentication
- Passive Interfaces
- Route Summarization
- Graceful Restart

Entrar:

```bash
config router ospf
```

---

# show

```bash
show router ospf
```

Muestra únicamente los parámetros configurados.

---

# show full

```bash
show full router ospf
```

Muestra todos los parámetros.

Muy útil durante troubleshooting.

---

# set router-id

```bash
set router-id 10.255.255.1
```

## Qué hace

Define el Router ID.

Debe ser único.

No tiene por qué existir esa dirección IP.

### Buenas prácticas

Utilizar una Loopback.

Ejemplo

```
Loopback0

10.255.255.1/32
```

---

# set default-information-originate

```bash
set default-information-originate enable
```

Publica la ruta por defecto.

Valores

```
enable

disable
```

---

# set default-information-metric

```bash
set default-information-metric 10
```

Métrica anunciada.

---

# set default-information-metric-type

```bash
set default-information-metric-type 2
```

Valores

```
1

2
```

Tipo 2 suele ser el más utilizado.

---

# set abr-type

```bash
set abr-type cisco
```

Opciones

```
standard

cisco

ibm

shortcut
```

---

# set rfc1583-compatible

```bash
set rfc1583-compatible enable
```

Compatibilidad con RFC1583.

Normalmente

```
disable
```

---

# set auto-cost-reference-bandwidth

```bash
set auto-cost-reference-bandwidth 100000
```

## Qué hace

Modifica el cálculo del coste.

Muy recomendable en redes con enlaces de 10G o superiores.

Ejemplos

```
100 Mbps

1000 Mbps

10000 Mbps

100000 Mbps
```

---

# set distance

```bash
set distance 110
```

Distancia administrativa OSPF.

Por defecto

```
110
```

---

# set restart-mode

```bash
set restart-mode graceful-restart
```

Opciones

```
none

graceful-restart
```

---

# set log-neighbour-changes

```bash
set log-neighbour-changes enable
```

Registra cambios de vecinos.

Muy recomendable.

---

# CONFIG AREA

Entrar

```bash
config area
```

---

## edit

```bash
edit 0.0.0.0
```

Área Backbone.

También puede usarse:

```bash
edit 0.0.0.1
```

Área 1.

---

## set type

```bash
set type regular
```

Valores

```
regular

stub

nssa
```

---

### Área Stub

```bash
set type stub
```

No recibe LSAs externos.

---

### Área NSSA

```bash
set type nssa
```

Permite redistribución limitada.

---

## set authentication

```bash
set authentication md5
```

Valores

```
none

text

md5
```

---

## set default-cost

```bash
set default-cost 20
```

Coste utilizado en áreas Stub.

---

## next

Guarda área.

---

## end

Sale del menú.

---

# CONFIG NETWORK

Define qué redes participan en OSPF.

Entrar

```bash
config network
```

---

## edit

```bash
edit 1
```

---

## set prefix

```bash
set prefix 192.168.1.0/24
```

Red anunciada.

---

## set area

```bash
set area 0.0.0.0
```

Área asociada.

---

## Ejemplo

```bash
config network

edit 1

set prefix 10.0.0.0/24

set area 0.0.0.0

next

end
```

---

# CONFIG OSPF-INTERFACE

Permite configurar parámetros específicos de una interfaz.

Entrar

```bash
config ospf-interface
```

---

## edit

```bash
edit port2
```

---

## set interface

```bash
set interface port2
```

Interfaz física.

---

## set cost

```bash
set cost 100
```

Métrica manual.

Por defecto

Calculada automáticamente.

---

## set priority

```bash
set priority 255
```

Prioridad DR.

Valores

```
0-255
```

0

Nunca será DR.

255

Máxima prioridad.

---

## set hello-interval

```bash
set hello-interval 10
```

Por defecto

```
10
```

Ethernet.

---

## set dead-interval

```bash
set dead-interval 40
```

Debe coincidir entre vecinos.

---

## set retransmit-interval

```bash
set retransmit-interval 5
```

Tiempo retransmisión LSAs.

---

## set transmit-delay

```bash
set transmit-delay 1
```

Retardo.

---

## set mtu-ignore

```bash
set mtu-ignore enable
```

Ignora diferencias MTU.

Muy útil durante troubleshooting.

---

## set authentication

```bash
set authentication md5
```

Autenticación interfaz.

---

## set authentication-key

```bash
set authentication-key fortinet
```

Autenticación simple.

No recomendada.

---

## CONFIG MD5

Entrar

```bash
config md5-keys
```

---

## edit

```bash
edit 1
```

---

## set key-string

```bash
set key-string MiClaveOSPF
```

Clave MD5.

---

## set key-id

```bash
set key-id 1
```

Identificador.

---

## next

Guarda.

---

## end

Finaliza.

---

# set network-type

```bash
set network-type broadcast
```

Opciones

```
broadcast

point-to-point

point-to-multipoint

non-broadcast
```

---

# set passive

```bash
set passive enable
```

La interfaz anuncia la red.

No forma vecinos.

Muy recomendable para LAN.

---

# CONFIG REDISTRIBUTE

Entrar

```bash
config redistribute
```

Permite redistribuir:

- Static
- Connected
- RIP
- BGP

---

## Static

```bash
edit static

set status enable

next
```

---

## Connected

```bash
edit connected

set status enable

next
```

---

## BGP

```bash
edit bgp

set status enable

next
```

---

## RIP

```bash
edit rip

set status enable

next
```

---

# CONFIG SUMMARY-ADDRESS

Resumen de rutas.

Entrar

```bash
config summary-address
```

---

## edit

```bash
edit 1
```

---

## set prefix

```bash
set prefix 10.0.0.0/16
```

---

## set advertise

```bash
set advertise enable
```

---

# Diagnóstico OSPF

## get router info ospf status

```bash
get router info ospf status
```

Estado general.

---

## get router info ospf neighbor

```bash
get router info ospf neighbor
```

Vecinos.

Estados posibles

```
Down

Init

2-Way

ExStart

Exchange

Loading

Full
```

El estado deseado es:

```
Full
```

---

## get router info ospf interface

```bash
get router info ospf interface
```

Interfaces OSPF.

---

## get router info ospf database

```bash
get router info ospf database
```

Base de datos LSDB.

---

## get router info ospf route

```bash
get router info ospf route
```

Rutas aprendidas.

---

## diagnose ip router ospf all

```bash
diagnose ip router ospf all
```

Información completa del proceso OSPF.

---

## diagnose debug application ospfd

```bash
diagnose debug application ospfd -1
```

Activa debug del daemon OSPF.

---

## diagnose debug enable

```bash
diagnose debug enable
```

Inicia la depuración.

---

## diagnose debug disable

```bash
diagnose debug disable
```

Finaliza la depuración.

---

# Ejemplo completo

```bash
config router ospf

set router-id 10.255.255.1

set default-information-originate enable

config area

edit 0.0.0.0

next

end

config network

edit 1

set prefix 10.1.1.0/24

set area 0.0.0.0

next

end

config ospf-interface

edit port2

set interface port2

set cost 10

set hello-interval 10

set dead-interval 40

next

end

end
```

---

# Buenas prácticas

✔ Utilizar siempre una Loopback como `router-id`.

✔ Configurar `log-neighbour-changes enable`.

✔ Ajustar `auto-cost-reference-bandwidth` en redes de 10G/40G/100G.

✔ Marcar como `passive` las interfaces donde no deban formarse vecinos.

✔ Preferir autenticación MD5 frente a texto plano.

✔ Verificar el estado de los vecinos (`Full`) antes de investigar problemas de rutas.

---
