package com.demo.websocketserver.model;

public class Mensaje {

    private String nombre;
    private String contenido;
    private String destino;

    // Constructor vacío (IMPORTANTE para JSON)
    public Mensaje() {
    }

    // Constructor con parámetros
    public Mensaje(String nombre, String contenido, String destino) {
        this.nombre = nombre;
        this.contenido = contenido;
        this.destino = destino;
    }

    // Getter y Setter de nombre
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    // Getter y Setter de contenido
    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    // Getter y Setter de destino
    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }
}