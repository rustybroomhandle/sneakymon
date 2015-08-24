#pragma strict


private var moveRight : boolean = false;
private var moveLeft : boolean = false;
private var moveForward : boolean = false;
private var moveBackward : boolean = false;
private var moveSpeed : float =  10.0;
var keys : int = 0;

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

  if (Input.GetKeyDown("e")) {
      if (touching && Vector3.Distance(touching.transform.position, transform.position) < 3) {
        print("searching");
        searching = true;
      }
  }
  if (Input.GetKeyUp("e")) {
    print("not searching");
    searchcount = 0;
    searching = false;
  }
}

var searching : boolean = false;
var searchcount : float = 0;

function FixedUpdate() {

  GameObject.Find("keystxt").GetComponent(TextMesh).text = keys.ToString();

  if (touching) {
    var searched = touching.GetComponent(Container).searched;
    var containerkeys = touching.GetComponent(Container).key;
  }
  if (searching && searched == false) {
    if (searchcount < 100) {
      touching.transform.Find("srch").transform.localPosition.y = 0;
      searchcount+=0.5;
    } else {
      if (containerkeys > 0) {
        keys = keys + containerkeys;
        touching.GetComponent(Container).key = 0;
      }
      touching.transform.Find("srch").transform.localPosition.y = 1000;
      touching.transform.Find("srched").transform.localPosition.y = 0;
      touching.GetComponent(Container).searched = true;
      searching = false;
    }
  }
  if (touching) {
    touching.transform.Find("srch").GetComponent(TextMesh).text = Mathf.Floor(searchcount) + " %";
  }

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

var touching : GameObject;

function OnCollisionEnter(collision: Collision) {
  if (collision.gameObject.tag == "container") {
    touching = collision.gameObject;
  }
}
