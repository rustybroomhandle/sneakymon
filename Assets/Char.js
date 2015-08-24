#pragma strict


private var moveRight : boolean = false;
private var moveLeft : boolean = false;
private var moveForward : boolean = false;
private var moveBackward : boolean = false;
private var moveSpeed : float =  6.0;

private var beefeeanim : Animation;


var keys : int = 0;

function Start () {
  beefeeanim = GameObject.Find("beefee").GetComponent.<Animation>();
}

function BRun() {
  beefeeanim.Play("Take 001");
}

function BStop() {
  beefeeanim.Stop();
}

function Update() {
  if (Input.GetKeyDown("d") || Input.GetKeyDown(KeyCode.RightArrow)) {
    	moveRight=true;
      BRun();
	}
	if (Input.GetKeyUp("d") || Input.GetKeyUp(KeyCode.RightArrow)) {
	    moveRight=false;
	}

	if (Input.GetKeyDown("a") || Input.GetKeyDown(KeyCode.LeftArrow)) {
	    moveLeft=true;
      BRun();
	}
	if (Input.GetKeyUp("a") || Input.GetKeyUp(KeyCode.LeftArrow)) {
	    moveLeft=false;
	}

	if (Input.GetKeyDown("w") || Input.GetKeyDown(KeyCode.UpArrow)) {
	    moveForward=true;
      BRun();
	}
	if (Input.GetKeyUp("w") || Input.GetKeyUp(KeyCode.UpArrow)) {
	    moveForward=false;
	}

	if (Input.GetKeyDown("s") || Input.GetKeyDown(KeyCode.DownArrow)) {
	    moveBackward=true;
      BRun();
	}
	if (Input.GetKeyUp("s") || Input.GetKeyUp(KeyCode.DownArrow)) {
	    moveBackward=false;
	}

  if (!moveLeft && !moveRight && !moveForward && !moveBackward) {
      BStop();
  }

  if (Input.GetKey("escape")) {
    Application.LoadLevel("title");
  }

  if (Input.GetKeyDown("e") || Input.GetKeyDown(KeyCode.Space)) {
      if (touching && Vector3.Distance(touching.transform.position, transform.position) < 4 && touching.tag=="container") {
        searching = true;
      }
      if (touching && Vector3.Distance(touching.transform.position, transform.position) < 4 && touching.tag=="cage" && keys > 0) {
        freeing = true;
      }
  }
  if (Input.GetKeyUp("e") || Input.GetKeyUp(KeyCode.Space)) {
    searchcount = 0;
    searching = false;
    freeing = false;
  }
}

var searching : boolean = false;
var freeing : boolean = false;
var searchcount : float = 0;
var freecount : int = 10;

function FixedUpdate() {

  GameObject.Find("keystxt").GetComponent(TextMesh).text = keys.ToString();
  GameObject.Find("freecounttxt").GetComponent(TextMesh).text = freecount.ToString();

  if (touching && touching.GetComponent(Container)) {
    var searched = touching.GetComponent(Container).searched;
    var containerkeys = touching.GetComponent(Container).key;
    var tag : String = touching.tag;
  }
  if (searching && searched == false) {
    if (searchcount < 100) {
      touching.transform.Find("srch").transform.localPosition.y = 0;
      searchcount+=0.5;
    } else {
      if (containerkeys > 0) {
        GameObject.Find("okey").GetComponent.<AudioSource>().Play();
        keys = keys + containerkeys;
        GameObject.Find("xx1").transform.position.y = 999;
        touching.GetComponent(Container).key = 0;
      }
      touching.transform.Find("srch").transform.localPosition.y = 1000;
      touching.transform.Find("srched").transform.localPosition.y = 0;
      touching.GetComponent(Container).searched = true;
      searching = false;
    }
  }
  if (freeing && touching.GetComponent(Cage).freemonster != "free") {
    if (searchcount < 100) {
      touching.transform.Find("srch").transform.localPosition.y = 3;
      searchcount+=0.5;
    } else {
      touching.transform.Find("srch").transform.localPosition.y = 1000;
      freeing = false;
      keys = keys - 1;
      freecount = freecount - 1;
      touching.SendMessage("OpenCage");
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
  if (collision.gameObject.tag == "container" || collision.gameObject.tag == "cage") {
    touching = collision.gameObject;
  }
}
