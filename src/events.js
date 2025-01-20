class NotificationEvents {
    constructor() {
        this.events = {};
    }

    /**
     * Registers an event listener for a specific event.
     * @param {string} eventName - The name of the event.
     * @param {Function} callback - The callback function to execute when the event is fired.
     */
    $on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }

    /**
     * Removes an event listener for a specific event.
     * @param {string} eventName - The name of the event.
     * @param {Function} callback - The callback function to remove.
     */
    $off(eventName, callback) {
        if (!this.events[eventName]) return;

        this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    }

    /**
     * Fires all listeners for a specific event.
     * @param {string} eventName - The name of the event.
     * @param {...any} args - Arguments to pass to the event listener callbacks.
     */
    emit(eventName, ...args) {
        if (!this.events[eventName]) return;
        this.events[`${eventName}`].forEach(callback =>{
            try{
            callback(...args);
            }catch(error){
                console.error('error',error)
            }
        })
    }
}

// Create a global instance of DesignEvents
export const notificationEvents = new NotificationEvents();
