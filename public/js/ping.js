// Ping mechanism to keep Render free tier instance active
// This script will ping the server every 5 minutes (300000 ms)

(function() {
  // Function to ping the server
  function pingServer() {
    fetch('/ping')
      .then(response => {
        if (response.ok) {
          console.log('Server pinged successfully at', new Date().toISOString());
        } else {
          console.error('Failed to ping server');
        }
      })
      .catch(error => {
        console.error('Error pinging server:', error);
      });
  }

  // Initial ping when page loads
  pingServer();

  // Set up interval to ping every 5 minutes
  setInterval(pingServer, 300000); // 5 minutes = 300000 ms
})();