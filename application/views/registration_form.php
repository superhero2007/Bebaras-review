<html>
<?php
	if (isset($this->session->userdata['logged_in'])) {
	header("location:". base_url()."index.php/user_auth/user_login_process");
}
?>
<head>
	<title>Registration Form</title>
	<link rel="stylesheet" type="text/css" href="<?php echo base_url(); ?>assets/style/style.css">
	<link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro|Open+Sans+Condensed:300|Raleway' rel='stylesheet' type='text/css'>
</head>
<body>
	<div id="main">
		<div id="login">
			<h2>Registration Form</h2>
			<hr/>
			<?php
			echo "<div class='error_msg'>";
			echo validation_errors();
			echo "</div>";
			echo form_open('user_auth/new_user_registration');

			echo form_label('Firstname : ');
			echo "<br/>";
			echo form_input('username');
			echo "<br/>";
			echo "<br/>";
			echo form_label('Lastname : ');
			echo "<br/>";
			echo form_input('username1');
			echo "<div class='error_msg'>";
			if (isset($message_display)) {
			echo $message_display;
			}
			echo "</div>";
			echo "<br/>";
			echo form_label('Email : ');
			echo "<br/>";
			$data = array(
			'type' => 'email',
			'name' => 'email_value'
			);
			echo form_input($data);
			echo "<br/>";
			echo "<br/>";
			echo form_label('Password : ');
			echo "<br/>";
			echo form_password('password');
			echo "<br/>";
			echo "<br/>";
			echo form_submit('submit', 'Sign Up');
			echo form_close();
			?>
			<a href="<?php echo base_url() ?> ">For Login Click Here</a>
		</div>
	</div>
</body>
</html>