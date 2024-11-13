<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

$webhook_url = 'https://hooks.slack.com/services/webhook-url';
$payload = json_encode(["text" => "Name: $name\nEmail: $email\nMessage: $message"]);

$ch = curl_init($webhook_url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

$result = curl_exec($ch);
curl_close($ch);
echo "Message sent!";
?>
