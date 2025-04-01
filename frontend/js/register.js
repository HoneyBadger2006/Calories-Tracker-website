class RegisterForm {
    constructor() {
        this.form = document.getElementById('registerForm');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(this.form);
        const userData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            name: formData.get('name'),
            age: parseInt(formData.get('age')),
            weight: parseFloat(formData.get('weight')),
            height: parseFloat(formData.get('height')),
            fitnessGoals: Array.from(formData.getAll('fitnessGoals'))
        };

        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                this.showMessage('Registration successful! Please check your email to verify your account.', 'success');
                this.form.reset();
            } else {
                this.showMessage(data.message, 'error');
            }
        } catch (error) {
            this.showMessage('An error occurred during registration.', 'error');
        }
    }

    showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;

        const existingMessage = this.form.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }

        this.form.insertBefore(messageDiv, this.form.firstChild);

        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Initialize the form when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RegisterForm();
}); 