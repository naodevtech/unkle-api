import notifier from 'node-notifier';

class ApiError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (error, response) => {
  const message = error;
  const statusCode = error.statusCode ? error.statusCode : 500;
  const checkTokenError = checkIfTokenIsExpired(response, statusCode, message);
  if (!checkTokenError) {
    notifier.notify({
      message: ` Code : ${statusCode} 👉🏽 ${message}`
    });
    console.log(`🔴 Gestion d'erreur 🔴 (❌ CODE : ${statusCode})=> `, message);
    response.status(statusCode).json(message);
  }
};

const checkIfTokenIsExpired = (response, code, message) => {
  console.log(message.name);
  if (code === 500 && message.name === 'JsonWebTokenError') {
    console.log('Votre session à expirée, veuillez vous reconnecter 🕕');
    notifier.notify({
      message: ` Code : ${code} 👉🏽 Votre session à expirée, veuillez vous reconnecter 🕕`
    });
    return response.status(code).json({
      code,
      message: 'Votre session à expirée, veuillez vous reconnecter 🕕'
    });
  } else if (code === 500 && message.name === 'TokenExpiredError') {
    console.log('Votre session à expirée, veuillez vous reconnecter 🕕');
    notifier.notify({
      message: ` Code : ${code} 👉🏽 Votre session à expirée, veuillez vous reconnecter 🕕`
    });
    return response.status(code).json({
      code,
      message: 'Votre session à expirée, veuillez vous reconnecter 🕕'
    });
  }
};

export { ApiError, handleError };
