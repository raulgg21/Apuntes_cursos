# # Configurar IP estatica por CLI
## Por interfaz grafica 
1. Accedemos ya sea web o SHH a la interface en cuestión

2. Verificamos que si tenemos dhcp o no activado 
```shell
SITE-B (port1) # show
config system interface
    edit "port1"
        set vdom "root"
        set mode dhcp
        set allowaccess ping https ssh http fgfm
        set type physical
        set snmp-index 1
        config ipv6
            set ip6-send-adv enable
            set ip6-other-flag enable
        end
        set defaultgw disable
        set dns-server-override disable
    next
end
```

3. Para cambiarlo usaremos el comando `set mode static` y con ello veremos que cambia a la dirección IP que tenia

```shell
SITE-B (port1) # set mode static

SITE-B (port1) # show
config system interface
    edit "port1"
        set vdom "root"
        set ip 192.168.1.97 255.255.255.0
        set allowaccess ping https ssh http fgfm
        set type physical
        set snmp-index 1
        config ipv6
            set ip6-send-adv enable
            set ip6-other-flag enable
        end
        set dns-server-override disable
    next
end
```

4. Para cambiarlo solo tendremos que poner el comando `set IP` y poner la ip con la mascara que queremos

```shell
SITE-B (port1) # set ip 192.168.1.97/24
```