<?php
class presentation_model extends CI_Model {
	public function __construct()
	{
		$this->load->database();
	}
	public function getdata()
	{
		$tasks = $this->db->get('tasks');
		$result = $tasks->result_array();
		for($i=0;$i<$tasks->num_rows();$i++)
		{
			if($result[$i]['assignedGroupID']!="0")
			{
				$group = $this->db->get_where('groups',array('ID'=>$result[$i]['assignedGroupID']))->result_array();
				$result[$i]['Group']=$group[0]['name'];
			}
			else
				$result[$i]['Group']="No Group";	
			$review = $this->db->get_where('reviews',array('taskID'=>$result[$i]['ID']));
			$result[$i]['Reviews']=$review->num_rows();
			$reviewresult=$review->result_array();
			$sum1=0;
			$sum2=0;

			for($j=0;$j<$review->num_rows();$j++)
			{
				$sum1+=$reviewresult[$j]['currentRating'];
				$sum2+=$reviewresult[$j]['potentialRating'];
			}
			if($review->num_rows()>0)
				$result[$i]['ar']=number_format($sum1/$review->num_rows(),1);
			else
				$result[$i]['ar']=0;
			if($review->num_rows()>0)
				$result[$i]['p']=number_format($sum2/$review->num_rows(),1);
			else
				$result[$i]['p']=0;
		}
		
		return $result;
	}
	public function getreviews()
	{
		$reviews = $this->db->get('reviews');
		$result = $reviews->result_array();
		for($i=0;$i<$reviews->num_rows();$i++)
		{
			$tasks = $this->db->get_where('tasks',array('ID'=>$result[$i]['taskID']))->result_array();
			$result[$i]['folderName']=$tasks[0]['folderName'];
			$result[$i]['year']=$tasks[0]['year'];
			$result[$i]['countryCode']=$tasks[0]['countryCode'];
			$result[$i]['folderName']=$tasks[0]['folderName'];
			if($tasks[0]['assignedGroupID']!="0")
			{
				$group = $this->db->get_where('groups',array('ID'=>$tasks[0]['assignedGroupID']))->result_array();
				$result[$i]['Group']=$group[0]['name'];
			}
			else
				$result[$i]['Group']="No Group";	
			$user = $this->db->get_where('users',array('ID'=>$result[$i]['userID']))->result_array();
			$result[$i]['author']=$user[0]['firstName'];
		}
		
		return $result;
	}
	public function getuser()
	{
		$tasks = $this->db->get('users');
		$result = $tasks->result_array();
		for($i=0;$i<$tasks->num_rows();$i++)
		{
			
			$group = $this->db->get_where('groups',array('ID'=>$result[$i]['groupID']))->result_array();
			$result[$i]['Group']=$group[0]['name'];
			$review = $this->db->get_where('reviews',array('userID'=>$result[$i]['ID']));
			$result[$i]['Reviews']=$review->num_rows();
		}
		
		return $result;
	}
	public function getprofile()
	{
		$username = ($this->session->userdata['logged_in']['username']);
		$users = $this->db->get_where('users',array('firstName'=>$username));
		$result = $users->result_array();
		$group = $this->db->get_where('groups',array('ID'=>$result[0]['groupID']))->result_array();
		$result[0]['Group']=$group[0]['name'];
		$result[0]['flag1']="";
		$result[0]['flag2']="";
		return $result[0];
	}
	public function setprofile()
	{
		//$users = $this->db->get('users');
		//$result = $users->result_array();
		//$group = $this->db->get_where('groups',array('ID'=>$result[0]['groupID']))->result_array();
		//$result[0]['Group']=$group[0]['name'];
		
		//return $result[0];
		$item=$_POST['data'];
		
		$users = $this->db->delete('users',array('ID'=>$item['ID']));
		unset($item['Group']);
		if($item['flag1']!=""&&$item['flag2']!=""&&md5($item['flag1'])==$item['password'])
		{
			$item['password']=md5($item['flag2']);
		}
		unset($item['flag1']);
		unset($item['flag2']);
		$this->db->insert('users',$item);

		$username = ($this->session->userdata['logged_in']['username']);
		$users = $this->db->get_where('users',array('firstName'=>$username));
		$result = $users->result_array();
		$group = $this->db->get_where('groups',array('ID'=>$result[0]['groupID']))->result_array();
		$result[0]['Group']=$group[0]['name'];
		$result[0]['flag1']="";
		$result[0]['flag2']="";
		return $result[0];

		//$result = $users->result_array();
		//$group = $this->db->get_where('groups',array('ID'=>$result[0]['groupID']))->result_array();
		//$result[0]['Group']=$group[0]['name'];
		//return $result[0];
	}

	

	public function getgeneral()
	{
		$tasks = $this->db->get('tasks');
		$result = $tasks->result_array();

		$username = ($this->session->userdata['logged_in']['username']);
		$users = $this->db->get_where('users',array('firstName'=>$username))->result_array();

		for($i=0;$i<$tasks->num_rows();$i++)
		{	
			if($result[$i]['assignedGroupID']!="0")
			{
				$group = $this->db->get_where('groups',array('ID'=>$result[$i]['assignedGroupID']))->result_array();
				$result[$i]['Group']=$group[0]['name'];
			}
			else
				$result[$i]['Group']="No Group";
			
			$review = $this->db->get_where('reviews',array('taskID'=>$result[$i]['ID']));
			$result[$i]['Reviews']=$review->num_rows();
			$reviewresult=$review->result_array();
			$sum1=0;
			$sum2=0;
			for($j=0;$j<$review->num_rows();$j++)
			{
				$sum1+=$reviewresult[$j]['currentRating'];
				$sum2+=$reviewresult[$j]['potentialRating'];
			}

			if($review->num_rows()>0)
				$result[$i]['ar']=number_format($sum1/$review->num_rows(),1);
			else
				$result[$i]['ar']=0;
			if($review->num_rows()>0)
				$result[$i]['p']=number_format($sum2/$review->num_rows(),1);
			else
				$result[$i]['p']=0;
						
			$result[$i]['authorflag']=($users[0]['ID']==$result[$i]['ownerID']);
			$result[$i]['groupadminflag']=($users[0]['groupRole']=="Admin");
			$result[$i]['adminflag']=($users[0]['role']=="Admin");
		}
		
		return $result;
	}

	public function lastsave()
	{
		$item=$_POST['data'];

		$this->db->update('tasks',array('htmlFilename'=>$item['htmlFilename'],'pdfFileName'=>$item['pdfFileName'],'odtFileName'=>$item['odtFileName'],'assignedGroupID'=>$item['assignedGroupID'],'status'=>$item['status'],'statusComment'=>$item['statusComment'],'ownerComment'=>$item['ownerComment']),array('ID'=>$item['ID']));

		return $item;
	}

	public function group()
	{
		$group = $this->db->get('groups')->result_array();
		return $group;
	}

	public function getyour()
	{
		$username = ($this->session->userdata['logged_in']['username']);
		$users = $this->db->get_where('users',array('firstName'=>$username))->result_array();
		$reviews = $this->db->get_where('reviews',array('userID'=>$users[0]['ID']));
		$result = $reviews->result_array();
		for($i=0;$i<$reviews->num_rows();$i++)
		{
			$tasks = $this->db->get_where('tasks',array('ID'=>$result[$i]['taskID']))->result_array();
			$result[$i]['folderName']=$tasks[0]['folderName'];
		}
		return $result;
	}
	public function reviewchange()
	{
		$this->db->update('reviews',array('comment'=>$_POST['comment']),array('ID'=>$_POST['id']));
		$this->db->update('reviews',array('currentRating'=>$_POST['a']),array('ID'=>$_POST['id']));
		$this->db->update('reviews',array('potentialrating'=>$_POST['b']),array('ID'=>$_POST['id']));
		return true;
	}
	
	public function getall()
	{
		$tasks = $this->db->get('tasks');
		$count=$tasks->num_rows();
		$result = $tasks->result_array();
		$re=array();
		for($i=0;$i<$count;$i++)
		{
			$reviews = $this->db->get_where('reviews', array('taskID'=>$result[$i]['ID']));
			$co = $reviews->num_rows();
			$list=$reviews->result_array();
			$sum1=0;
			$sum2=0;
			for($j=0;$j<$co;$j++)
			{
				$user = $this->db->get_where('users',array('ID'=>$list[$j]['userID']))->result_array();
				$list[$j]['author']=$user[0]['firstName'];
				$sum1+=$list[$j]['currentRating'];
				$sum2+=$list[$j]['potentialRating'];
			}
			$val['data']=$list;
			if($co>0)
			{
				$val['ar']=number_format($sum1/$co,1);
				$val['p']=number_format($sum2/$co,1);
			}
			else
			{
				$val['ar']=0;
				$val['p']=0;
			}
			$val['count']=$co;
			$re[$result[$i]['folderName']]=$val;
		}
		return $re;
		
	}
	public function getmessage()
	{
		$username = ($this->session->userdata['logged_in']['username']);
		$user = $this->db->get_where('users',array('firstName'=>$username))->result_array();
		$f=$user[0]['role']=='Admin';
		$reviews = $this->db->get('messages');
		$count=$reviews->num_rows();
		$result = $reviews->result_array();
		$sum1=0;
		$sum2=0;
		for($i=0;$i<$count;$i++)
		{	
			$user = $this->db->get_where('users',array('ID'=>$result[$i]['userID']))->result_array();
			$result[$i]['author']=$user[0]['firstName'];
			$result[$i]['flag']=($user[0]['firstName']==$username);
			$result[$i]['flag1']=($user[0]['firstName']==$username||$f);
			$tasks = $this->db->get_where('tasks',array('ID'=>$result[$i]['taskID']))->result_array();
			$result[$i]['folderName']=$tasks[0]['folderName'];
		}
		
		return $result;
	}
	public function getlist()
	{
		$reviews = $this->db->get_where('tasks');
		$result = $reviews->result_array();
		return $result;
	}
	public function sendmess()
	{
		$username = ($this->session->userdata['logged_in']['username']);
		$users = $this->db->get_where('users',array('firstName'=>$username))->result_array();
		$tasks = $this->db->get_where('tasks',array('folderName'=>$_POST['taskID']))->result_array();
		$item=array('taskID'=>$tasks[0]['ID'], 'userID'=>$users[0]['ID'], 'content'=>$_POST['mess'], 'dateCreated'=>date('y-m-d'), 'dateModified'=>date('y-m-d'));
		$this->db->insert('messages', $item);
		return $item;
	}
	public function discussionchange()
	{
		$this->db->update('messages',array('content'=>$_POST['mess']),array('ID'=>$_POST['ID']));
		return $_POST;
	}
	
	public function profilelisttasks()
	{
		$review = $this->db->get_where('reviews',array('userID'=>$_POST['data'],'isAssigned'=>1));
		$count = $review->num_rows();
		$result = $review->result_array();
		$re=array();
		for($i=0;$i<$count;$i++)
		{
			$tasks = $this->db->get_where('tasks',array('ID'=>$result[$i]['taskID']))->result_array();
			$re[$i]=$tasks[0];
		}
		return $re;
	}
	public function userupdate()
	{
		$this->db->update('users',array($_POST['member']=>$_POST['data']),array('ID'=>$_POST['id']));
		return $_POST;
	}

	public function gethtml()
	{
		$tasks = $this->db->get('tasks');
		$result = $tasks->result_array();
		$username = ($this->session->userdata['logged_in']['username']);
		$users = $this->db->get_where('users',array('firstName'=>$username))->result_array();
		$result['autoLoadTasks']=$users[0]['autoLoadTasks'];
		$result['localCheckoutFolder']=$users[0]['localCheckoutFolder'];
		for($i=0;$i<$tasks->num_rows();$i++)
		{
			$result[$i]['link']="/bebras-review/SVN/".$result[$i]['folderName']."/".$result[$i]['htmlFilename'];
			$result[$i]['otherlink']=$users[0]['localCheckoutFolder']."/".$result[$i]['folderName']."/".$result[$i]['htmlFilename'];
			if($result[$i]['htmlFilename']==NULL)
			{
				$result[$i]['link']="";
				$result[$i]['otherlink']="";
			}
		}
		
		return $result;
	}

	public function getpdf()
	{
		$tasks = $this->db->get('tasks');
		$result = $tasks->result_array();
		$username = ($this->session->userdata['logged_in']['username']);
		$users = $this->db->get_where('users',array('firstName'=>$username))->result_array();
		$result['autoLoadTasks']=$users[0]['autoLoadTasks'];
		$result['localCheckoutFolder']=$users[0]['localCheckoutFolder'];
		for($i=0;$i<$tasks->num_rows();$i++)
		{
			$result[$i]['link']="/bebras-review/SVN/".$result[$i]['folderName']."/".$result[$i]['pdfFileName'];
			$result[$i]['otherlink']=$users[0]['localCheckoutFolder']."/".$result[$i]['folderName']."/".$result[$i]['pdfFileName'];
			if($result[$i]['pdfFileName']==NULL)
			{
				$result[$i]['link']="";
				$result[$i]['otherlink']="";
			}
		}
		
		return $result;
	}

	public function getodt()
	{
		$tasks = $this->db->get('tasks');
		$result = $tasks->result_array();
		$username = ($this->session->userdata['logged_in']['username']);
		$users = $this->db->get_where('users',array('firstName'=>$username))->result_array();
		$result['autoLoadTasks']=$users[0]['autoLoadTasks'];
		$result['localCheckoutFolder']=$users[0]['localCheckoutFolder'];
		for($i=0;$i<$tasks->num_rows();$i++)
		{
			$result[$i]['link']="/bebras-review/SVN/".$result[$i]['folderName']."/".$result[$i]['odtFileName'];
			$result[$i]['otherlink']=$users[0]['localCheckoutFolder']."/".$result[$i]['folderName']."/".$result[$i]['odtFileName'];
			
			if($result[$i]['odtFileName']==NULL)
			{
				$result[$i]['link']="";
				$result[$i]['otherlink']="";
			}
		}
		
		return $result;
	}

	public function autosave()
	{
		$username = ($this->session->userdata['logged_in']['username']);
		$this->db->update('users',array('autoLoadTasks'=>"true"),array('firstName'=>$username));
	}

	public function svnlist($repository)
	{
		$checkout = 'svn list "'.$repository.'"';
		exec($checkout,$a);
		$co=count($a);
		$i=0;
		for($i=0;$i<$co;$i++)
		{
			$item=array();
			if(substr($a[$i],-1)=="/"&&is_numeric(substr($a[$i],0,4))&&substr($a[$i],4,1)=="-"&&substr($a[$i],7,1)=="-"&&is_numeric(substr($a[$i],8,2)))
			{
				$htm=array();
				$item["folderName"]=substr($a[$i],0,-1);
				$textID=substr($a[$i],0,10);
				$item["textID"]=$textID;
				$item["year"]=substr($a[$i],0,4);
				$item["countryCode"]=substr($a[$i],5,2);
				$checkout = 'svn info "'.$repository.$a[$i].'"';
				exec($checkout,$b);
				$item['repositoryDate']=substr($b[9],19,10);
				$item['importDate']=date('y-m-d');
				$item['lastChangeDate']=date('y-m-d');
				$item['svnLogin']="svnLogin";
				$item['ownerID']="1";
				//htmlFileName
				$checkout = 'svn list "'.$repository.$a[$i].'"';
				exec($checkout,$htm);
				$cohtml=count($htm);
				for($j=0;$j<$cohtml;$j++)
				{
					if($htm[$j]=="index.html")
						break;
					else if(strlen($htm[$j])>=15&&substr($htm[$j],0,10)==$textID&&substr($htm[$j],-5)==".html")
						break;
				}
				if($j<$cohtml)
					$item['htmlFilename']=$htm[$j];
				//odtFileName
				for($j=0;$j<$cohtml;$j++)
				{
					if(strlen($htm[$j])>=14&&substr($htm[$j],0,10)==$textID&&substr($htm[$j],-4)==".odt")
						break;
				} 
				if($j<$cohtml)
					$item['odtFileName']=$htm[$j];
				//pdfFileName
				for($j=0;$j<$cohtml;$j++)
				{
					if(strlen($htm[$j])>=14&&substr($htm[$j],0,10)==$textID&&substr($htm[$j],-4)==".pdf")
						break;
				} 
				if($j<$cohtml)
					$item['pdfFileName']=$htm[$j];
				
				$check = $this->db->get_where('tasks',array('folderName'=>$item["folderName"]));
				$checkflag = $check->num_rows();
				if($checkflag==0)
					$this->db->insert('tasks',$item);
				else
				{
					$this->db->update('tasks',array('htmlFilename'=>$item['htmlFilename'],'pdfFileName'=>$item['pdfFileName'],'odtFileName'=>$item['odtFileName'],'lastChangeDate'=>date('y-m-d')),array('folderName'=>$item["folderName"]));
				}

			}
			else if(substr($a[$i],-1)=="/")
			{
				$this->svnlist($repository.$a[$i]);
			}
		}
	}
	
	public function updatesvn()
	{
		
		//svn_log('svn://svn.france-ioi.org/beaver_review_sample');
		ini_set('max_execution_time', 3600);

		
		$repository = "svn://svn.france-ioi.org/beaver_review_sample/2015/";
		$result=$this->svnlist($repository);
		return count($result);
		//return "OK";
	}
}

