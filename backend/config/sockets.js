// backend/config/sockets.js
module.exports.sockets = {
  // Pour la démo : autorise toutes les origines WebSocket
  // (évite l'erreur "onlyAllowOrigins/beforeConnect" en prod)
  beforeConnect: (handshake, proceed) => proceed(undefined, true),
};
