package com.demo.websocketserver.model;

public class Mensaje {

    private String nombre;
    private String contenido;
    private String destino;

    public Mensaje() {
    }

    public Mensaje(String nombre, String contenido, String destino) {
        this.nombre = nombre;
        this.contenido = contenido;
        this.destino = destino;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }
}