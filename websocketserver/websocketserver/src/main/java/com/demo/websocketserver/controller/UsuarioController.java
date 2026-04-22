package com.demo.websocketserver.controller;

import com.demo.websocketserver.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/registro")
    public void registrar(String nombre) {
        usuarioService.agregarUsuario(nombre);

        messagingTemplate.convertAndSend(
                "/tema/usuarios",
                usuarioService.obtenerUsuarios()
        );
    }
}