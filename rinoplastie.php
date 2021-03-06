<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
 
require_once 'rinoplastie/include/DbHandler.php';
require_once 'rinoplastie/include/PassHash.php';
require 'rinoplastie/libs/Slim/Slim.php';
 
\Slim\Slim::registerAutoloader();
 
$app = new \Slim\Slim();
 
// User id from db - Global Variable
$user_id = NULL;
$images_folder = 'img';

function getUserAuthorizattionToken($headers){
	if (isset($headers['Authorization'])){
		return $headers['Authorization'];
	} else if(isset($headers['HTTP_AUTHORIZATION'])) {
		return $headers['HTTP_AUTHORIZATION'];
	}
	return false;
}
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

	$headers = (function_exists('apache_request_headers')) ? apache_request_headers() : $_SERVER;
	$api_key = getUserAuthorizattionToken($headers);
	$result = $db->deleteApiKey($api_key);
	
	echoRespnse(204, $response);

});

$app->post('/changepassword', 'authenticate', function() use ($app) {
	// check for required params
	verifyRequiredParams(array('email', 'oldPassword', 'newPassword', 'confirmPassword'));

	$headers = (function_exists('apache_request_headers')) ? apache_request_headers() : $_SERVER;
	$api_key = getUserAuthorizattionToken($headers);
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
    $headers = (function_exists('apache_request_headers')) ? apache_request_headers() : $_SERVER;
	//echo "<pre>"; print_r($_SERVER);die;
    $response = array();
    $app = \Slim\Slim::getInstance();

    // Verifying Authorization Header
    if (isset($headers['Authorization']) || isset($headers['HTTP_AUTHORIZATION'])) {
        $db = new DbHandler();
 
        // get the api key
        $api_key = getUserAuthorizattionToken($_SERVER);
		
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
    if (!isset($_REQUEST['type'])) {
		$response["message"] = $response["message"] . "Image type not selected.";
        $invalid = true;
    }
	if (!isset($_FILES['before'])) {
		$response["message"] = "No 'before' file selected for upload.";
        $invalid = true;
    }
	if ($_REQUEST['type'] != 'banner' && !isset($_FILES['after'])) {
		$response["message"] = $response["message"] . "No 'after' file selected for upload.";
		$invalid = true;
    }
	if ($invalid) {
		$response["error"] = true;
		echoRespnse(400, $response);
		return;
	}

	$files = array();
	if (isset($_FILES['before'])) {
		array_push($files, $_FILES['before']);
	}
	if (isset($_FILES['after'])) {
		array_push($files, $_FILES['after']);
	}
	try {
		if($_REQUEST['type'] == 'banner') {
			upload_banner_image($_FILES['before']['tmp_name']);
		} else {
			merge_images($_FILES['before']['tmp_name'], $_FILES['after']['tmp_name'], $_REQUEST['type']);
		}
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

function upload_banner_image($image_path) {
	list($img_width, $img_height) = getimagesize($image_path);
	$max_height = 800;
	$proportion = $img_height / $max_height;
	$img_resized_width = $img_width / $proportion;
	
	ini_set('memory_limit', '-1');
	$image = imagecreatefromjpeg($image_path);
	
	$dest_image = imagecreatetruecolor($img_resized_width, $max_height);
	imagecopyresampled($dest_image, $image, 0, 0, 0, 0, $img_resized_width, $max_height, $img_width, $img_height);
	
	$name = uniqid('banner-'.date('Ymdhis').'-');
	$save_path = 'img/banner/' . $name . '.jpg';
	imagejpeg($dest_image, $save_path);
}

function merge_images($img1_path, $img2_path, $img_type) {

	list($img1_width, $img1_height) = getimagesize($img1_path);
	list($img2_width, $img2_height) = getimagesize($img2_path);

	$max_height = 800;
	
	$proportion1 = $img1_height / $max_height;
	$proportion2 = $img2_height / $max_height;
	
	$img1_resized_width = $img1_width / $proportion1;
	$img2_resized_width = $img2_width / $proportion2;

	$merged_width = $img1_resized_width + $img2_resized_width;
	$merged_image = imagecreatetruecolor($merged_width, $max_height);

	imagealphablending($merged_image, false);
	imagesavealpha($merged_image, true);

	ini_set('memory_limit', '-1');
	$img1 = imagecreatefromjpeg($img1_path);
	$img2 = imagecreatefromjpeg($img2_path);

	imagecopyresampled($merged_image, $img1, 0, 0, 0, 0, $img1_resized_width, $max_height, $img1_width, $img1_height);
	//place at right side of $img1
	imagecopyresampled($merged_image, $img2, $img1_resized_width, 0, 0, 0, $img2_resized_width, $max_height, $img2_width, $img2_height);

	//save file or output to broswer
	$SAVE_AS_FILE = true;
	if( $SAVE_AS_FILE ){
		$name = uniqid($img_type.'-'.date('Ymdhis').'-');
		$save_path = 'img/' . $img_type . "/" . $name . '.jpg';
		imagejpeg($merged_image, $save_path);
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
	
	$rii = new IteratorIterator(new DirectoryIterator($images_folder . '/' . $type));
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