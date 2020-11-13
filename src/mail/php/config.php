<?
  const NAMEISREQUIRED = true;
  const MSGSNAMEERROR = "Поле обязательно для заполнения";
 
  const TELISREQUIRED = false;
  const MSGSTELERROR = "Поле обязательно для заполнения";
 
  const EMAILISREQUIRED = false;
  const MSGSEMAILERROR = "Поле обязательно для заполнения";
  const MSGSEMAILINCORRECT = "Некорректный почтовый адрес";
 
  const TEXTISREQUIRED = false;
  const MSGSTEXTERROR = "Поле обязательно для заполнения";
 
  // Файл
  // const FILEISREQUIRED = false;
  // const MSGSFILEERROR = "Поле обязательно для заполнения";
 
  // Соглашение
  // const AGGREMENTISREQUIRED = false;
  // const MSGSAGGREMENTERROR = "Поле обязательно для заполнения"; 
 
  // Сообщение об успешной отправке
  const MSGSSUCCESS = "Сообщение успешно отправлено";
 
  // *** SMTP *** //
 
    require_once($_SERVER['DOCUMENT_ROOT'] . '/mail/phpmailer/smtp.php');
    const HOST = 'smtp.gmail.com';
    const LOGIN = 'katrinehom@gmail.com';
    const PASS = 'senderPass';
    const PORT = '465';
 
  // *** /SMTP *** //
 
        // Почта с которой будет приходить письмо
  const SENDER = 'katrinehom@gmail.com';
   
  // Почта на которую будет приходить письмо
  const CATCHER = 'catcher@mail.ru';
   
  // Тема письма
  const SUBJECT = 'Заявка с сайта';
   
  // Кодировка
  const CHARSET = 'UTF-8';