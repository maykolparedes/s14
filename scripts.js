document.addEventListener('DOMContentLoaded', () => {
    const tl = gsap.timeline();
    const logoTrigger = document.getElementById('logoTrigger');
    
    // 1. Crear corazones de fondo (ambiente)
    createAmbientHearts();

    logoTrigger.addEventListener('click', () => {
        startSequence();
    });

    function startSequence() {
        // Bloquear clicks repetidos
        logoTrigger.style.pointerEvents = "none";

        const mainTimeline = gsap.timeline();

        // A. Desaparecer texto y línea, encoger corazón a "semilla"
        mainTimeline.to(".text-label, #connection-line", { opacity: 0, duration: 0.4 })
            .to("#core-heart", { 
                morphSVG: null, // No necesitamos morph, solo escala
                scale: 0.2, 
                x: 0, y: -150, // Sube
                duration: 0.8, 
                ease: "back.out(1.7)" 
            })
            .to("#core-heart", { 
                y: 150, // Cae a la base
                duration: 0.6, 
                ease: "expo.in" 
            })
            .to("#initial-scene", { opacity: 0, display: "none", duration: 0.2 })
            
            // B. Mostrar Escena del Árbol
            .to("#tree-scene", { display: "flex", opacity: 1, duration: 0.1 })
            .add(growTree);
    }

    function growTree() {
        const branchGroup = document.getElementById('branches');
        const leafGroup = document.getElementById('leaves');

        // Dibujar Tronco
        const trunk = document.createElementNS("http://www.w3.org/2000/svg", "path");
        trunk.setAttribute("d", "M200 380 L200 250");
        trunk.setAttribute("stroke", "#5d4037");
        trunk.setAttribute("stroke-width", "12");
        trunk.setAttribute("stroke-linecap", "round");
        branchGroup.appendChild(trunk);

        gsap.from(trunk, { drawSVG: "0%", duration: 1 });

        // Coordenadas para formar un árbol corazón (fórmula matemática de corazón)
        // Escaladas y centradas en el árbol
        for (let i = 0; i < 80; i++) {
            const t = Math.random() * 2 * Math.PI;
            // Ecuación paramétrica del corazón
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
            
            const posX = 200 + (x * 8); // 8 es el multiplicador de tamaño
            const posY = 180 + (y * 8);

            createLeaf(leafGroup, posX, posY, i * 20);
        }

        gsap.to("#loveMessage", { opacity: 1, y: -20, delay: 1.5, duration: 1 });
    }

    function createLeaf(container, x, y, delay) {
        const leaf = document.createElementNS("http://www.w3.org/2000/svg", "path");
        // Path de corazón pequeño
        leaf.setAttribute("d", "M0 0 C -2 -2, -4 -2, -4 0 C -4 2, 0 4, 0 6 C 0 4, 4 2, 4 0 C 4 -2, 2 -2, 0 0");
        leaf.setAttribute("fill", Math.random() > 0.5 ? "#ff3b6f" : "#ff6b9d");
        leaf.setAttribute("transform", `translate(${x}, ${y}) scale(0)`);
        container.appendChild(leaf);

        gsap.to(leaf, {
            scale: Math.random() * 1.5 + 1,
            rotation: Math.random() * 360,
            duration: 0.8,
            delay: delay / 1000 + 0.5,
            ease: "back.out(2)"
        });
    }

    function createAmbientHearts() {
        const bg = document.getElementById('bgHearts');
        for (let i = 0; i < 20; i++) {
            const h = document.createElement('div');
            h.innerHTML = "❤️";
            h.style.position = "absolute";
            h.style.left = Math.random() * 100 + "vw";
            h.style.top = "110vh";
            h.style.fontSize = (Math.random() * 20 + 10) + "px";
            h.style.opacity = Math.random();
            bg.appendChild(h);

            gsap.to(h, {
                y: "-120vh",
                x: (Math.random() - 0.5) * 200,
                duration: Math.random() * 10 + 5,
                repeat: -1,
                delay: Math.random() * 5
            });
        }
    }
});