# app-gym

## Productos
productos
---------
id
nombre
costo_actual
precio_venta_actual
stock
created_at
updated_at

--
id: 1
nombre: Agua
costo_actual: 500
precio_venta_actual: 800
--

ventas
------
id
fecha
total
created_at
updated_at

venta_detalles
--------------
id
venta_id
producto_id
cantidad

costo_unitario_en_venta
precio_unitario_en_venta

subtotal
ganancia_unitaria
ganancia_total

created_at
updated_at

--
venta_id: 10
producto_id: 1
cantidad: 2
costo_unitario_en_venta: 500
precio_unitario_en_venta: 800
subtotal: 1600
ganancia_unitaria: 300
ganancia_total: 600
--