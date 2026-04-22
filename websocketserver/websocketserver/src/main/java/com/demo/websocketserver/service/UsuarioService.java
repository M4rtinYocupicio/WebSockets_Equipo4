package com.demo.websocketserver.service;

import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.Set;

@Service
public class UsuarioService {

    private Set<String> usuarios = new HashSet<>();

    public void agregarUsuario(String nombre) {
        usuarios.add(nombre);
    }

    public void eliminarUsuario(String nombre) {
        usuarios.remove(nombre);
    }

    public Set<String> obtenerUsuarios() {
        return usuarios;
    }
}