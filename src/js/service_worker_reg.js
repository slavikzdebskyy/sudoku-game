export const serviceWorkerRegistrator = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('service_worker.js', {scope: './'})
      .then(registration => console.log(registration))
      .catch(error => console.error(error));
  }
};