document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData.entries());

        try {
            // Webhook for farm reservations
            const response = await fetch('https://camejotino.app.n8n.cloud/webhook/63f5c60b-cdac-4087-afa9-820343805dde/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: formObject.name,
                    email: formObject.email,
                    finca: formObject.finca,
                    fecha: formObject.fecha,
                    mensaje: formObject.message
                })
            });

            if (response.ok) {
                alert('¡Reserva enviada con éxito! Nos pondremos en contacto pronto.');
                contactForm.reset();
            } else {
                alert('Hubo un error al enviar la reserva. Intenta de nuevo.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Hubo un problema con el envío de la reserva.');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});