# Interfaz grafica (GUI)

Vamos a Network>Interface y ahi seleccionamos el puerto a configurar.
![Acceso a puerto](./img/Acceso_a_puerto.png)

Para el primer caso asignaremos un puerto para la salida (WAN) para ello una vez dentro del puerto le pondremos el rol de WAN , un alias (en este caso para que sea obvio será ISP 1) y la ip que queremos darle.
![Configuracion WAN](./img/puerto-wan.png)

En este caso, para comprobar que es correcto hacemos un ping a la cabecera
![ping cabecera](./img/ping-cabecera.png)

### Crear puerta de enlace
Para crear una puerta de enlace iremos a Network> Static Routes y de ahi a Create new para crear una nueva.

![ruta estatica](./img/configurar-ruta-estatica.png)

Una vez dentro, pondremos los datos de la red y automaticamente nos seleccionara el puerto donde puede configurarse.
![ruta estatica](./img/configurar-ruta-estatica-datos.png)

El dato que debemos de variar para decirle cual será backup es la distancia administrativa, el cual el que mayor distancia tiene es el backup.


# Linea de comandos (CLI)
1. Entramos al puerto en cuestión
```shell
SITE-B # config system interface
SITE-B  (interface) # edit port2
```

2. asignamos una ip 
```shell
SITE-B  (port2) # set ip 
```
3. Le ponemos un alias
```shell
SITE-B  (port2) # set alias ISP-1
```
4. Le ponemos un rol
```shell
SITE-B  (port2) # set role wan
```
5. Guardamos los cambios con END
```shell
SITE-B  (port2) # end
```
Otra opción seria poner NEXT el cual en vez de devolvernos a la raiz con los cambios aplicados (end) nos devuelve al punto anterior guardando los cambios

```shell
SITE-B  (port2) # end
SITE-B  #
```
```shell
SITE-B  (port2) # next
SITE-B  (interface) #
```
Para las rutas estaticas iremos a route static
```shell
SITE-B  # config router static 
SITE-B  (static) #
```
 Para crear/editar usaremos el comando edit
 ```shell
SITE-B (static) # edit 1 
new entry '1' added

SITE-B (1) # 
```
Ahora para asignarle un puerto y una ip estatica lo haremos con los siguientes comandos :
 ```shell
SITE-B (1) # set gateway 60.89.123.2

SITE-B (1) # set device port2
```
 Para poner la distancia administrativa lo pondremos con el comando :
  ```shell
SITE-B (1) # set distance 15
```