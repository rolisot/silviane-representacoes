<?php
$name       = @trim($_POST['name']); 
$from       = @trim($_POST['email']); 
$subject    = @trim($_POST['subject']); 
$message    = @trim($_POST['message']); 
$to   		= 'comercial@silvianerepresentacoes.com.br';
//$to   		= 'rolisot@gmail.com';

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/plain; charset=iso-8859-1\r\n";
$headers .= "From: {$name} <{$from}>\r\n";
$headers .= "Reply-To: <{$from}>\r\n";
$headers .= "Subject: {$subject}\r\n";
$headers .= "X-Mailer: PHP/".phpversion();

echo $headers;

if(mail($to, $subject, $message, $headers)){
  echo("Mensagem enviada com sucesso!");
}else{
  echo("Falha ao enviar a mensagem, tente novamente!");
}

die;
 
?>