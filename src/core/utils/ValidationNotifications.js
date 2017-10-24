class ValidationNotifications {

  static showErrorMessage($notify, message) {
    $notify.error({
      title: 'Erro',
      message: message ? message : 'Ocorreu um erro no serviço'
    });
  }

  static showSuccessMessage($notify, message) {
    $notify({
      title: 'Success',
      message: message ? message : 'Sucesso ao executar ação',
      type: 'success'
    });
  }
}

export default ValidationNotifications;
