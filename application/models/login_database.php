<?php

Class Login_Database extends CI_Model {
	public function __construct()
	{
		$this->load->database();
	}
	// Insert registration data in database
	public function registration_insert($data) {
		// Query to check whether username already exist or not
		$condition = "firstName =" . "'" . $data['firstName'] . "'";
		$this->db->select('*');
		$this->db->from('users');
		$this->db->where($condition);
		$this->db->limit(1);
		$query = $this->db->get();
		if ($query->num_rows() == 0)
		{
			// Query to insert data in database
			$data['login']="login";
			$data['svnLogin']="svnLogin";
			$data['salt']="salt";
			$data['countryCode']="France";
			$data['registrationDate']=date('y-m-d');
			$data['LastLoginDate']=date('y-m-d');
			$data['role']='Unconfirmed';
			$data['groupID']='1';
			$data['groupRole']='Admin';
			$data['localCheckoutFolder']='localCheckoutFolder';
			$data['autoLoadtasks']="false";
			$this->db->insert('users', $data);
			if ($this->db->affected_rows() > 0)
			{
				return true;
			}
		} 
		else 
		{
			return false;
		}
	}

	// Read data using username and password
	public function login($data) {
		$condition = "firstName =" . "'" . $data['firstName'] . "' AND " . "password =" . "'" . $data['password'] . "'";
		$this->db->select('*');
		$this->db->from('users');
		$this->db->where($condition);
		$this->db->limit(1);
		$query = $this->db->get();

		if ($query->num_rows() == 1) {
			return true;
		}
		else {
			return false;
		}
	}

	// Read data from database to show data in admin page
	public function read_user_information($username)
	{
		$condition = "firstName =" . "'" . $username . "'";
		$this->db->select('*');
		$this->db->from('users');
		$this->db->where($condition);
		$this->db->limit(1);
		$query = $this->db->get();

		if ($query->num_rows() == 1) {
			return $query->result();
		} 
		else 
		{
			return false;
		}
	}

}

?>