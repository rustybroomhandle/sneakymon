#pragma strict


private var moveRight : boolean = false;
private var moveLeft : boolean = false;
private var moveForward : boolean = false;
private var moveBackward : boolean = false;
private var moveSpeed : float =  10.0;


function Start () {

}

function Update() {
  if (Input.GetKeyDown("d") || Input.GetKeyDown(KeyCode.RightArrow)) {
    	moveRight=true;
	}
	if (Input.GetKeyUp("d") || Input.GetKeyUp(KeyCode.RightArrow)) {
	    moveRight=false;
	}

	if (Input.GetKeyDown("a") || Input.GetKeyDown(KeyCode.LeftArrow)) {
	    moveLeft=true;
	}
	if (Input.GetKeyUp("a") || Input.GetKeyUp(KeyCode.LeftArrow)) {
	    moveLeft=false;
	}

	if (Input.GetKeyDown("w") || Input.GetKeyDown(KeyCode.UpArrow)) {
	    moveForward=true;
	}
	if (Input.GetKeyUp("w") || Input.GetKeyUp(KeyCode.UpArrow)) {
	    moveForward=false;
	}

	if (Input.GetKeyDown("s") || Input.GetKeyDown(KeyCode.DownArrow)) {
	    moveBackward=true;
	}
	if (Input.GetKeyUp("s") || Input.GetKeyUp(KeyCode.DownArrow)) {
	    moveBackward=false;
	}
}

function FixedUpdate() {
  if (moveRight) {
		GetComponent.<Rigidbody>().velocity.x = moveSpeed;
    transform.rotation.eulerAngles.y = 90;
    	//playerShip.transform.rotation.eulerAngles.z = -10;
	} else if (moveLeft) {
	    GetComponent.<Rigidbody>().velocity.x = 0-moveSpeed;
      transform.rotation.eulerAngles.y = -90;
	    //playerShip.transform.rotation.eulerAngles.z = 10;
	}

	if (!moveRight && !moveLeft) {
	    GetComponent.<Rigidbody>().velocity.x = 0;
   	    //playerShip.transform.rotation.eulerAngles.z = 0;
	}

	if (moveForward) {
	    GetComponent.<Rigidbody>().velocity.z = moveSpeed;
      transform.rotation.eulerAngles.y = 0;
	} else if (moveBackward) {
	    GetComponent.<Rigidbody>().velocity.z = 0-moveSpeed;
      transform.rotation.eulerAngles.y = 180;
	}

	if (!moveForward && !moveBackward) {
	    GetComponent.<Rigidbody>().velocity.z = 0;
	}
}
