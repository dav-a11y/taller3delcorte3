# Taller del 3er Corte - Digitales 3

**Autores:** David Díaz, Jhonatan Vargas, David Lopez  
**Fecha:** Noviembre 2025  
**Materia:** Digitales 3  

---

## Introducción

Este proyecto presenta el despliegue completo de un juego multijugador en tiempo real utilizando tecnologías modernas de contenedorización y orquestación. El sistema está construido sobre Node.js y Socket.io, empaquetado en un contenedor mediante Docker y desplegado en un clúster gestionado con Kubernetes.

Docker se utiliza para crear una imagen ligera y reproducible del servidor del juego, mientras que Kubernetes se encarga de la orquestación, permitiendo gestionar réplicas, balanceo de carga, disponibilidad y acceso externo al servicio.
El despliegue incluye un Deployment que define los pods del servidor y un Service NodePort que permite a los jugadores conectarse desde fuera del clúster.

Este repositorio reúne los archivos necesarios para construir la imagen Docker, aplicar los manifiestos de Kubernetes y ejecutar el juego multijugador dentro de Minikube u otro clúster Kubernetes compatible.

---

## Resumen de los Proyectos

### 1.desarrollo y despliege de contenedor 

### 2.desarrollo de juego de sumos atraves de kubernet 
---

## link del pdf para visualizar el informe del trabajo

[Ver informe PDF](pdf/taller_3_corte_digitales3.pdf)

---

## link de video que evidencia el resultado final del juego 

[Ver video](https://youtu.be/IrIAYbVs-Eo?si=2fW9dpH8LHQKGFeu)



