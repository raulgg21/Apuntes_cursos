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
