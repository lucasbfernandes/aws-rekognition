class ValidationNotifications {

  static showErrorMessage($notify) {
    $notify.error({
      title: 'Erro',
      message: 'Ocorreu um erro no serviço'
    });
  }
}

export default ValidationNotifications;
