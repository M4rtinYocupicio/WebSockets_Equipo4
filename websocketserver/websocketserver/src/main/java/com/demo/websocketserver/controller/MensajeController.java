package com.demo.websocketserver.controller;

import com.demo.websocketserver.model.Mensaje;
import com.demo.websocketserver.model.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class MensajeController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    // 📢 Mensaje a todos
    @MessageMapping("/envio")
    @SendTo("/tema/mensajes")
    public Mensaje enviar(Mensaje mensaje) {
        return mensaje;
    }

    // 🎯 Mensaje privado
    @MessageMapping("/privado")
    public void mensajePrivado(Mensaje mensaje) {
        messagingTemplate.convertAndSendToUser(
                mensaje.getDestino(),
                "/cola/mensajes",
                mensaje
        );
    }

    // 📦 Producto a todos
    @MessageMapping("/producto")
    @SendTo("/tema/productos")
    public Producto enviarProducto(Producto producto) {
        return producto;
    }

    // 📦 Producto privado
    @MessageMapping("/productoPrivado")
    public void productoPrivado(@Payload Producto producto,
                                @Header("destino") String destino) {

        messagingTemplate.convertAndSendToUser(
                destino,
                "/cola/productos",
                producto
        );
    }
}