<?php

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);

    try {

        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;

        $mail->Username   = 'polegodamv@gmail.com';

        // Gmail App Password
        $mail->Password   = 'impcagebmqqwpnah';

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom('polegodamv@gmail.com', 'Polegoda Website');

        $mail->addAddress('chandimadarmarathna@gmail.com');

        $mail->addCC('chandimadharmarathne8@gmail.com');

        $mail->isHTML(true);

        $mail->Subject = "Website Contact Form - " . $subject;

        $mail->Body = "
            <h3>New Contact Form Submission</h3>

            <p><strong>Name:</strong> {$name}</p>

            <p><strong>Email:</strong> {$email}</p>

            <p><strong>Subject:</strong> {$subject}</p>

            <p><strong>Message:</strong></p>

            <p>{$message}</p>
        ";

        $mail->send();

        echo json_encode([
            "success" => true,
            "message" => "Message sent successfully"
        ]);

    } catch (Exception $e) {

        echo json_encode([
            "success" => false,
            "message" => $mail->ErrorInfo
        ]);
    }
}