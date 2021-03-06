#pragma strict

//var WalkDest : GameObject;
var WayPoints : GameObject[];
private var CurrentDest : int = 0;
var agent : NavMeshAgent ;
var player : GameObject;
var excl : GameObject;
var status : String = "patrolling";
var lastseen : GameObject;

function Start() {
    agent = GetComponent(NavMeshAgent);
    agent.destination = WayPoints[CurrentDest].transform.position;
    player = GameObject.Find("Char");
    excl = transform.Find("excl/exclr").gameObject;
    lastseen = GameObject.Find("lastseen");
}

function Update() {

  if (status == "investigating") {
      agent.destination = lastseen.transform.position;
  }

  if (agent.remainingDistance <= 1.5f) {
      if (status != "investigating") {
        CurrentDest++;
      }
      status = "patrolling";
      if (CurrentDest == WayPoints.length) {
        CurrentDest=0;
      }
    if (status == "patrolling") {
      agent.destination = WayPoints[CurrentDest].transform.position;
    }
  }

  var hit : RaycastHit;
  if (Physics.Linecast (transform.position, player.transform.position, hit)) {
    if (hit.transform.gameObject.name == "Char" && hit.distance < 14) {
      var targetDir = player.transform.position - transform.position;
		  var forward = transform.forward;
		  var angle = Vector3.Angle(targetDir, forward);
		  if (angle < 15.0 || (angle < 80.0 && hit.distance < 5)) {
        excl.transform.localPosition.y = 0;
        Caught();
      } else {
        excl.transform.localPosition.y = 1000;
      }
    } else {
      excl.transform.localPosition.y = 1000;
    }
  }

}

function Caught() {
  if (!GameObject.Find("ogard").GetComponent.<AudioSource>().isPlaying) {
    GameObject.Find("ogard").GetComponent.<AudioSource>().Play();
  }

  GameObject.Find("Char").transform.position = GameObject.Find("start").transform.position;
  GameObject.Find("caught").transform.localPosition.y = 0;
  yield WaitForSeconds(3);
  GameObject.Find("caught").transform.localPosition.y = 999;
}

function Investigate() {
  status = "investigating";
}
