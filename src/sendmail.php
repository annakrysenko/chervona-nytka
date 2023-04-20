<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet='UTF-8';  
$mail->setLanguage('uk','phpmailer/language/');
$mail->IsHTML(true);



$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'cervonanitka';                 // Наш логин
$mail->Password = 'CherNyt1!';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to

//from whom
$mail->setFrom('cervonanitka@gmail.com','Chervona nytka order');
//to whom
$mail->addAddress('krasnaya.nit6@ukr.net','Chervona nytka');
//letter subject
$mail->Subject='Order';

//postal office
$postal="Нова Пошта";
if($_POST['postal']=="ukrPochta"){
    $postal="Укрпошта";
}



//body letter
$body='<h1>Order list</h1>';

if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Ім’я:</strong>'.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['tel']))){
    $body.='<p><strong>Номер телефону:</strong>'.$_POST['tel'].'</p>';
}
if(trim(!empty($_POST['postal']))){
    $body.='<p><strong>Спосіб доставки:</strong>'.$_POST['postal'].'</p>';
}
if(trim(!empty($_POST['city']))){
    $body.='<p><strong>Місто:</strong>'.$_POST['city'].'</p>';
}
if(trim(!empty($_POST['department']))){
    $body.='<p><strong>Номер відділення:</strong>'.$_POST['department'].'</p>';
}

$mail->Body = $body;

//Send
if(!$mail->send()){
    $message ='Помилка відправлення';
}else{
    $message='Дані відправлені';
}

$response=['message'=>$message];
header('Content-type: application/json');
echo json_encode($response);
?>
