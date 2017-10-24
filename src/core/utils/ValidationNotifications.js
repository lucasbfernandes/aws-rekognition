class ValidationNotifications {

  static showErrorMessage($notify, message) {
    $notify.error({
      title: 'Erro',
      message: message ? message : 'Ocorreu um erro no serviço'
    });
  }
}

export default ValidationNotifications;
