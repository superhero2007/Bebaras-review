<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Templates extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('presentation_model');
		// Load form helper library
		$this->load->helper('form');

		// Load form validation library
		$this->load->library('form_validation');

		// Load session library
		$this->load->library('session');

		// Load database
		$this->load->model('login_database');
	}
	public function view($view)
	{
		$this->load->view('templates/'.$view);
	}
	public function presentation()
	{
		$data = $this->presentation_model->getdata();
		echo json_encode($data);
	}
	public function reviews()
	{
		$data = $this->presentation_model->getreviews();
		echo json_encode($data);
	}
	public function profile()
	{
		$data = $this->presentation_model->getprofile();
		echo json_encode($data);
	}
	public function profileupdate()
	{
		$data = $this->presentation_model->setprofile();
		echo json_encode($data);
	}
	public function discussionsend()
	{
		$data = $this->presentation_model->sendmess();
		echo json_encode($data);
	}
	
	public function users()
	{
		$data = $this->presentation_model->getuser();
		echo json_encode($data);
	}
	public function tasks()
	{
		$data = $this->presentation_model->getdata();
		echo json_encode($data);
	}
	public function tasklist()
	{
		$data = $this->presentation_model->getlist();
		echo json_encode($data);
	}
	public function general()
	{
		$data = $this->presentation_model->getgeneral();
		echo json_encode($data);
	}
	public function html()
	{
		$data = $this->presentation_model->gethtml();
		echo json_encode($data);
	}
	public function pdf()
	{
		$data = $this->presentation_model->getpdf();
		echo json_encode($data);
	}
	public function odt()
	{
		$data = $this->presentation_model->getodt();
		echo json_encode($data);
	}
	public function your()
	{
		$data = $this->presentation_model->getyour();
		echo json_encode($data);
	}
	public function all()
	{
		$data = $this->presentation_model->getall();
		echo json_encode($data);
	}
	public function discussion()
	{
		$data = $this->presentation_model->getmessage();
		echo json_encode($data);
	}
	public function profilelisttasks()
	{
		$data = $this->presentation_model->profilelisttasks();
		echo json_encode($data);
	}
	public function userupdate()
	{
		$data = $this->presentation_model->userupdate();
		echo json_encode($data);
	}
	public function discussionchange()
	{
		$data = $this->presentation_model->discussionchange();
		echo json_encode($data);
	}

	public function reviewchange()
	{
		$data = $this->presentation_model->reviewchange();
		echo json_encode($data);
	}

	public function group()
	{
		$data = $this->presentation_model->group();
		echo json_encode($data);
	}

	public function lastsave()
	{
		$data = $this->presentation_model->lastsave();
		echo json_encode($data);
	}

	public function autosave()
	{
		$data = $this->presentation_model->autosave();
		echo json_encode($data);
	}
	public function updatesvn()
	{
		$data = $this->presentation_model->updatesvn();
		echo json_encode($data);
	}
}
