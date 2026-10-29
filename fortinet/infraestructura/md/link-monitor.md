# Apuntes FortiGate: Configuración de Link Monitor

## 1. Introducción a Link Monitor

El **Link Monitor** (o Health Check de enlace) en FortiGate es un mecanismo de monitoreo activo que permite verificar la conectividad de los enlaces WAN más allá del estado físico del puerto (*link status*).

### Problema que resuelve
* **Caída local:** Si se desconecta un cable o cae la interfaz local (`port2`), FortiGate detecta el corte inmediatamente y conmuta a la ruta de respaldo (ISP2).
* **Caída en el proveedor (ISP):** Si la interfaz física sigue activa (energizada / cable conectado), pero hay un fallo interno en los routers del proveedor o en la red externa, FortiGate **no detecta la falla** por sí solo. El tráfico seguirá enviándose por el ISP1 y la conexión a Internet se perderá.

### Solución
Link Monitor envía sondas de prueba (como ICMP Ping) a través de un enlace específico a una IP remota confiable (ej. `8.8.8.8`). Si las pruebas fallan, deshabilita la ruta estática asociada a ese enlace, permitiendo que la ruta de respaldo (ISP2) tome el control de forma automática.

---

## 2. Demostración del Problema (Escenario Sin Link Monitor)

1. **Estado Inicial:** 
   * **ISP1 (Puerto 2):** Enlace principal (Menor Distancia Administrativa).
   * **ISP2 (Puerto 3):** Enlace en *Standby* / Respaldo.
2. **Simulación de fallo interno en ISP1:**
   * Se cambia la dirección IP en el router del proveedor (ISP1) para desconfigurar el gateway.
3. **Comportamiento observado:**
   * El comando `execute ping google.com` en FortiGate falla.
   * En la GUI (**Dashboard > Network > Routing**), la ruta sigue apuntando a **ISP1**.
   * FortiGate mantiene el enlace activo porque el `port2` sigue energizado.

---

## 3. Configuración de Link Monitor por CLI

> **Nota:** La funcionalidad de Link Monitor se configura únicamente a través de la línea de comandos (CLI).

### Comandos de Configuración

```bash
# Acceder a la configuración del link-monitor
config system link-monitor
    edit 1
        # Interfaz de origen a monitorear (ISP1)
        set srcintf "port2"
        
        # Servidor destino para pruebas de conectividad (ej. DNS Google)
        set server "8.8.8.8"
        
        # Gateway por el cual salir hacia el servidor destino
        set gateway <IP_GATEWAY_ISP1>
        
        # Tipo de protocolo de prueba (Ping es la opción por defecto)
        # Opciones disponibles: ping, tcp-echo, udp-echo, http, twamp
        
        # Desactivar la ruta estática asociada si el monitoreo falla
        set update-cascade-interface disable  # (Opcional según versión)
        set update-static-route enable        # Habilitado por defecto
    next
end
```

---

## 4. Verificación y Diagnóstico

### Comandos útiles para verificar el estado de las rutas:

```bash
# Consultar la tabla de ruteo detallada
get router info routing-table database
```

### Resultados tras activar Link Monitor:
1. **Ante un fallo de conectividad en ISP1:**
   * El ping hacia `8.8.8.8` a través de `port2` falla.
   * Link Monitor marca la ruta de `port2` como **inactiva** (*inactive*).
   * Automáticamente se carga en la tabla de ruteo la ruta de respaldo por **ISP2 (`port3`)**.
   * La navegación hacia Internet se restablece mediante el enlace secundario.

2. **Al restablecer el servicio en ISP1:**
   * Link Monitor vuelve a recibir respuesta del servidor destino.
   * La ruta de ISP1 se activa nuevamente en la tabla de ruteo debido a su menor distancia administrativa.

---

## 5. Limpieza de Configuración (Rollback)

Para eliminar el monitor configurado y volver al estado inicial:

```bash
config system link-monitor
    delete 1
end
```