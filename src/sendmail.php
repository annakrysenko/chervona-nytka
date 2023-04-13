<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet='UTF-8';
$mail->setLanguege('ru','phpmailer/languege/');
$mail->IsHTML(true);

//from whom
$mail->setFrom('cervonanitka@gmail.com','Chervona nytka')
//to whom
$mail->addAddress('nastenakissdessa@gmail.com');
//letter subject
$mail->Subject='Order'

//postal office
$postal="Нова Пошта";
if($_POST['postal']=="ukrPochta"){
    $postal="Укрпошта"
}

//body letter
$body='<h1>Order list</h1>'

if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Ім’я:</strong>'.$_POST['name'].'</p>'
}
if(trim(!empty($_POST['tel']))){
    $body.='<p><strong>Номер телефону:</strong>'.$_POST['tel'].'</p>'
}
if(trim(!empty($_POST['postal']))){
    $body.='<p><strong>Спосіб доставки:</strong>'.$_POST['postal'].'</p>'
}
if(trim(!empty($_POST['city']))){
    $body.='<p><strong>Місто:</strong>'.$_POST['city'].'</p>'
}
if(trim(!empty($_POST['department']))){
    $body.='<p><strong>Номер відділення:</strong>'.$_POST['department'].'</p>'
}

//Send
if(!$mail->send()){
    $message ='Error';
}else{
    $message='Success';
}

$response=['message'=>$message];
header('Content-type: application/json');
echo json_encode($response);
?>