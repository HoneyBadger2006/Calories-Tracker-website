import config from './config.js';

class ApiService {
    constructor() {
        this.baseUrl = config.apiUrl;
        this.apiKey = config.apiKey;
    }

    // Helper method to get headers
    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
        };
    }

    // Example API methods
    async getWorkouts() {
        try {
            const response = await fetch(`${this.baseUrl}${config.endpoints.workouts}`, {
                headers: this.getHeaders()
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching workouts:', error);
            throw error;
        }
    }

    async getExercises() {
        try {
            const response = await fetch(`${this.baseUrl}${config.endpoints.exercises}`, {
                headers: this.getHeaders()
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching exercises:', error);
            throw error;
        }
    }
}

// Create and export a single instance
const apiService = new ApiService();
export default apiService; 