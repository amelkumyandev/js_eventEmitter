class EventEmitter {
  constructor() {
    // Object to hold the event name as key and an array of listeners as value
    this.listeners = {};
  }

  // Subscribe to an event
  on(eventName, listener) {
    // If there's no listener array for the event, create it
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    // Push the listener to the array
    this.listeners[eventName].push(listener);
  }

  // Emit an event
  emit(eventName, data) {
    // If there are listeners for the event, call them with the data
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      eventListeners.forEach(listener => {
        // Ensuring asynchronous execution
        setTimeout(() => listener(data), 0);
      });
    }
  }

  // Remove a specific event listener
  off(eventName, listenerToRemove) {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      // Filter out the listener to remove
      this.listeners[eventName] = eventListeners.filter(listener => listener !== listenerToRemove);
    }
  }

  // Subscribe to an event but only once
  once(eventName, listener) {
    // Wrapper function to add and automatically remove the listener
    const onceWrapper = (data) => {
      listener(data);
      this.off(eventName, onceWrapper);
    };

    this.on(eventName, onceWrapper);
  }
}

const emitter = new EventEmitter();

const listener = data => console.log('Received:', data);

emitter.on('event1', listener);
emitter.emit('event1', { key: 'value' }); // Should log: "Received: { key: 'value' }"

emitter.once('event2', data => console.log('Once:', data));
emitter.emit('event2', { once: true }); // Should log: "Once: { once: true }"
emitter.emit('event2', { once: false }); // Should not log anything

emitter.off('event1', listener);
emitter.emit('event1', { key: 'value' }); // Should not log anything

