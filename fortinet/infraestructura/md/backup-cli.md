# Generar la copia de seguridad
1. podemos usar el siguiente comando :
```shell
execute backup 
```
Si ponemos eso y le damos a la interrogación podremos ver las siguientes opciones:
```shell
SITE-B # execute backup
config           config
disk             disk
full-config      full-config
ipsuserdefsig    ipsuserdefsig
memory           memory
```
| Término | Definición |
|---------|------------|
| `config`| Realiza una copia de seguridad de la configuración del FortiGate. |
| `disk`| Realiza una copia de seguridad del contenido del disco interno (solo en modelos que disponen de almacenamiento).|
| `full config` | Realiza una copia de seguridad de la configuración completa, incluyendo todos los valores. |
| `ipsuserdefsig` |  Exporta las firmas IPS definidas por el usuario. |
| `memory` |Genera una copia del contenido de la memoria para tareas de diagnóstico y soporte técnico. |

Después tendremos las siguientes variantes:
## `execute backup config`

| Destino | Descripción |
|---------|-------------|
| `flash` | Guarda la configuración en la memoria flash del FortiGate. |
| `ftp` | Envía la configuración a un servidor FTP. |
| `management-station` | Envía la configuración a la estación de administración (FortiExplorer/FortiManager, según el contexto). |
| `sftp` | Envía la configuración a un servidor SFTP. |
| `tftp` | Envía la configuración a un servidor TFTP. |
| `usb` | Guarda la configuración en un dispositivo USB. |
| `usb-mode` | Guarda la configuración para el modo USB. |

## `execute backup disk`

| Opción | Descripción |
|--------|-------------|
| `alllogs` | Copia de seguridad de todos los registros almacenados en disco. |
| `ipsarchives` | Copia de seguridad de los archivos de firmas IPS. |
| `log` | Copia de seguridad de los registros del disco. |

## `execute backup full-config`

| Destino | Descripción |
|---------|-------------|
| `ftp` | Envía la configuración completa a un servidor FTP. |
| `sftp` | Envía la configuración completa a un servidor SFTP. |
| `tftp` | Envía la configuración completa a un servidor TFTP. |
| `usb` | Guarda la configuración completa en un dispositivo USB. |
| `usb-mode` | Guarda la configuración completa para el modo USB. |

## `execute backup ipsuserdefsig`

| Destino | Descripción |
|---------|-------------|
| `ftp` | Exporta las firmas IPS definidas por el usuario a un servidor FTP. |
| `tftp` | Exporta las firmas IPS definidas por el usuario a un servidor TFTP. |

## `execute backup memory`

| Opción | Descripción |
|--------|-------------|
| `alllogs` | Copia de seguridad de todos los registros de memoria. |
| `log` | Copia de seguridad de los registros de memoria. |

Una vez selecionado todo pondremos el nombre del archivo

Este seria un ejemplo completo de como quedaria.
```shell
SITE-B # execute backup config ftp SITE-B_23072026 60.89.123.2 ftp ftp
```

# Resturar con la copia de seguridad

Realizar el mismo proceso pero poniendo restore en vez de backup.