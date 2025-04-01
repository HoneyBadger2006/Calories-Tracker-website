class LoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.forgotPasswordForm = document.getElementById('forgotPasswordForm');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.form.addEventListener('submit', this.handleLogin.bind(this));
        this.forgotPasswordForm.addEventListener('submit', this.handleForgotPassword.bind(this));
    }

    async handleLogin(event) {
        event.preventDefault();
        
        const formData = new FormData(this.form);
        const loginData = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (response.ok) {
                // Store the token and user data
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                this.showMessage('Login successful!', 'success');
                // Redirect to dashboard or home page
                window.location.href = '/dashboard.html';
            } else {
                this.showMessage(data.message, 'error');
            }
        } catch (error) {
            this.showMessage('An error occurred during login.', 'error');
        }
    }

    async handleForgotPassword(event) {
        event.preventDefault();
        
        const formData = new FormData(this.forgotPasswordForm);
        const email = formData.get('email');

        try {
            const response = await fetch('http://localhost:5000/api/users/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                this.showMessage('Password reset email sent! Please check your inbox.', 'success');
                this.forgotPasswordForm.reset();
            } else {
                this.showMessage(data.message, 'error');
            }
        } catch (error) {
            this.showMessage('An error occurred while requesting password reset.', 'error');
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
    new LoginForm();
}); 