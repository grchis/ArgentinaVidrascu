<?php
 
require_once '../include/DbHandler.php';
require_once '../include/PassHash.php';
require '.././libs/Slim/Slim.php';
 
\Slim\Slim::registerAutoloader();
 
$app = new \Slim\Slim();
 
// User id from db - Global Variable
$user_id = NULL;
$images_folder = '../../img';
 
/**
 * Verifying required params posted or not
 */
function verifyRequiredParams($required_fields) {
    $error = false;
    $error_fields = "";
	$app = \Slim\Slim::getInstance();
	$request_params = json_decode($app->request->getBody());
    // Handling PUT request params
    foreach ($required_fields as $field) {
        if (!isset($request_params->$field) || strlen(trim($request_params->$field)) <= 0) {
            $error = true;
            $error_fields .= $field . ', ';
        }
    }
 
    if ($error) {
        // Required field(s) are missing or empty
        // echo error json and stop the app
        $response = array();
        $app = \Slim\Slim::getInstance();
        $response["error"] = true;
        $response["message"] = 'Required field(s) ' . substr($error_fields, 0, -2) . ' missing or empty';
        echoRespnse(400, $response);
        $app->stop();
    }
}
 
/**
 * Validating email address
 */
function validateEmail($email) {
    $app = \Slim\Slim::getInstance();
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response["error"] = true;
        $response["message"] = 'Email address is not valid';
        echoRespnse(400, $response);
        $app->stop();
    }
}
 
/**
 * Echoing json response to client
 * @param String $status_code Http response code
 * @param Int $response Json response
 */
function echoRespnse($status_code, $response) {
    $app = \Slim\Slim::getInstance();
    // Http response code
    $app->status($status_code);
 
    // setting response content type to json
    $app->contentType('application/json');
 
    echo json_encode($response);
}

/**
 * User Registration
 * url - /register
 * method - POST
 * params - name, email, password
 */
$app->post('/register', 'authenticate', function() use ($app) {
	// check for required params
	verifyRequiredParams(array('name', 'email', 'password'));

	$response = array();

	// reading post params
	$params = json_decode($app->request()->getBody());
	$name = $params->name;
	$email = $params->email;
	$password = $params->password;

	// validating email address
	validateEmail($email);

	$db = new DbHandler();
	$res = $db->createUser($name, $email, $password);

	if ($res == USER_CREATED_SUCCESSFULLY) {
		$response["error"] = false;
		$response["message"] = "You are successfully registered";
		echoRespnse(201, $response);
	} else if ($res == USER_CREATE_FAILED) {
		$response["error"] = true;
		$response["message"] = "Oops! An error occurred while registereing";
		echoRespnse(500, $response);
	} else if ($res == USER_ALREADY_EXISTED) {
		$response["error"] = true;
		$response["message"] = "Sorry, this email already exists";
		echoRespnse(400, $response);
	}
});
		
/**
 * User Login
 * url - /login
 * method - POST
 * params - email, password
 */
$app->post('/login', function() use ($app) {
	// check for required params
	verifyRequiredParams(array('email', 'password'));

	// reading post params
	$params = json_decode($app->request()->getBody());
	$email = $params->email;
	$password = $params->password;
	$response = array();

	$db = new DbHandler();
	// check for correct email and password
	if ($db->checkLogin($email, $password)) {
		// get the user by email
		$db->updateUserApiKey($email);
		$user = $db->getUserByEmail($email);

		if ($user != NULL) {
			$response["error"] = false;
			$response['name'] = $user['name'];
			$response['email'] = $user['email'];
			$response['authToken'] = $user['api_key'];
			$response['createdAt'] = $user['created_at'];
		} else {
			// unknown error occurred
			$response['error'] = true;
			$response['message'] = "An error occurred. Please try again";
			echoRespnse(500, $response);
			return;
		}
	} else {
		// user credentials are wrong
		$response['error'] = true;
		$response['message'] = 'Login failed. Incorrect credentials';
		echoRespnse(401, $response);
		return;
	}

	echoRespnse(200, $response);
});
		
$app->get('/logout', 'authenticate', function() {
	global $user_id;
	$response = array();
	$db = new DbHandler();

	$headers = apache_request_headers();
	$api_key = $headers['Authorization'];
	$result = $db->deleteApiKey($api_key);
	
	echoRespnse(204, $response);
});

$app->post('/changepassword', 'authenticate', function() use ($app) {
	// check for required params
	verifyRequiredParams(array('email', 'oldPassword', 'newPassword', 'confirmPassword'));

	$headers = apache_request_headers();
	$api_key = $headers['Authorization'];
	
	// reading post params
	$params = json_decode($app->request()->getBody());
	$email = $params->email;
	$oldPassword = $params->oldPassword;
	$newPassword = $params->newPassword;
	$confirmPassword = $params->confirmPassword;
	$response = array();
	
	if ($newPassword != $confirmPassword) {
		$response['error'] = true;
		$response['message'] = 'New password missmatch';
		echoRespnse(400, $response);
		return;
	} else {
		$db = new DbHandler();
		// check for correct email and password
		if ($db->checkLogin($email, $oldPassword)) {
			// get the user by email
			$user = $db->getUserByEmail($email);

			if ($user != NULL) {
				$db->changePassword($api_key, $user['email'], $oldPassword, $newPassword);
			} else {
				// unknown error occurred
				$response['error'] = true;
				$response['message'] = "An error occurred. Please try again";
				echoRespnse(500, $response);
				return;
			}
		} else {
			// user credentials are wrong
			$response['error'] = true;
			$response['message'] = 'Change password failed. Incorrect old password';
			echoRespnse(401, $response);
			return;
		}		
	}
	$response['error'] = false;
	$response['message'] = "Password changed successfully";
	echoRespnse(200, $response);
});
		
		
/**
 * Adding Middle Layer to authenticate every request
 * Checking if the request has valid api key in the 'Authorization' header
 */
function authenticate(\Slim\Route $route) {
    // Getting request headers
    $headers = apache_request_headers();
    $response = array();
    $app = \Slim\Slim::getInstance();
	//echo '<pre>';
	//var_dump($headers);die;
 
    // Verifying Authorization Header
    if (isset($headers['Authorization'])) {
        $db = new DbHandler();
 
        // get the api key
        $api_key = $headers['Authorization'];
		
        // validating api key
        if (!$db->isValidApiKey($api_key)) {
            // api key is not present in users table
            $response["message"] = "Access Denied. Invalid authorization token";
            $response["error"] = true;
            echoRespnse(401, $response);
            $app->stop();
        } else {
            global $user_id;
            // get user primary key id
            $user = $db->getUserId($api_key);
            if ($user != NULL)
                $user_id = $user["id"];
        }
    } else {
        // api key is missing in header
        $response["message"] = "Authorization token not present";
        $response["error"] = true;
        echoRespnse(400, $response);
        $app->stop();
    }
}

/**
 * Upload images
 * url - /upload
 * method - POST
 * params - before, after, type
 */
$app->post('/upload', 'authenticate', function () {
	$response = array();
	$invalid = false;
	$response["message"] = "";
    if (!isset($_FILES['before'])) {
		$response["message"] = "No 'before' file selected for upload.";
        $invalid = true;
    }
	if (!isset($_FILES['after'])) {
		$response["message"] = $response["message"] . "No 'after' file selected for upload.";
		$invalid = true;
    }
	if (!isset($_REQUEST['type'])) {
		$response["message"] = $response["message"] . "Image type not selected.";
        $invalid = true;
    }
	if ($invalid) {
		$response["error"] = true;
		echoRespnse(400, $response);
		return;
	}

	$files = array();
    array_push($files, $_FILES['before'], $_FILES['after']);
	
	try {
		merge_images($files[0]['tmp_name'], $files[1]['tmp_name'], $_REQUEST['type']);
	}
	catch (Exception $ex){
		$response['message'] = $ex->getMessage();
		$response['error'] = true;
		echoRespnse(400, $response);
		return;
	}
	
	$response['message'] = "File upload sucessfully completed";
	$response['error'] = false;
	echoRespnse(200, $response);
});

function merge_images($img1_path, $img2_path, $img_type) {

	list($img1_width, $img1_height) = getimagesize($img1_path);
	list($img2_width, $img2_height) = getimagesize($img2_path);

	$merged_width  = $img1_width + $img2_width;
	//get highest
	$merged_height = $img1_height > $img2_height ? $img1_height : $img2_height;

	$merged_image = imagecreatetruecolor($merged_width, $merged_height);

	imagealphablending($merged_image, false);
	imagesavealpha($merged_image, true);

	$img1 = imagecreatefromjpeg($img1_path);
	$img2 = imagecreatefromjpeg($img2_path);

	imagecopy($merged_image, $img1, 0, 0, 0, 0, $img1_width, $img1_height);
	//place at right side of $img1
	imagecopy($merged_image, $img2, $img1_width, 0, 0, 0, $img2_width, $img2_height);

	//save file or output to broswer
	$SAVE_AS_FILE = true;
	if( $SAVE_AS_FILE ){
		$name = uniqid($img_type.'-'.date('Ymdhis').'-');
		$save_path = '../../img/' . $img_type . "/" . $name . '.jpg';
		imagejpeg($merged_image,$save_path);
	} else {
		header('Content-Type: image/jpeg');
		imagejpeg($merged_image);
	}

	//release memory
	imagedestroy($merged_image);
}

$app->get('/images/:type', 'authenticate', function($type) {
	$response = array();
	global $images_folder;
	
	foreach(glob($images_folder. '/' . $type . '/*.*') as $file) {
		$image = array();
		$image['path'] = $file->getPathname();
		$image['filename'] = $file->getFilename();
		array_push($response, $image);
	}
	echoRespnse(200, $response);
});

$app->get('/images', 'authenticate', function() {
	$response = array();
	global $images_folder;
	
	$rii = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($images_folder));
	foreach ($rii as $file) {
		if ($file->isDir()){ 
			continue;
		}
		$image = array();
		$image['path'] = $file->getPathname();
		$image['filename'] = $file->getFilename();
		array_push($response, $image);
	}
	echoRespnse(200, $response);
});

$app->post('/images/delete', 'authenticate', function() use ($app) {
	verifyRequiredParams(array('filename'));
	global $images_folder;
	
	$response = array();
	$params = json_decode($app->request()->getBody());
	$filename = $params->filename;
	
	$rii = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($images_folder));
	foreach ($rii as $file) {
		if ($file->isDir()){
			continue;
		}
		if ($file->getFilename() == $filename) {
			$response['error'] = !unlink($file->getPathname());
			if ($response['error'] == false) {
				$response['message'] = 'File deleted successfully';
				echoRespnse(200, $response);
				return;
			} else {
				$response['message'] = 'Could not delete file. Please try again.';
				echoRespnse(500, $response);
				return;
			}
		}
	}
	
	$response['message'] = 'Invalid filename. No files deleted.';
	$response['error'] = true;
	echoRespnse(404, $response);
});
 
$app->run();
?>