#pragma strict

//var WalkDest : GameObject;
var WayPoints : GameObject[];
private var CurrentDest : int = 0;
var agent : NavMeshAgent ;
var player : GameObject;
var excl : GameObject;
var lastseen : GameObject;

function Start() {
    agent = GetComponent(NavMeshAgent);
//    agent.destination = WayPoints[CurrentDest].transform.position;
    player = GameObject.Find("Char");
    lastseen = GameObject.Find("lastseen");
    excl = transform.Find("excl/exclr").gameObject;
}

function Update() {

/*  if (agent.remainingDistance <= 1.5f) {
    CurrentDest++;
    if (CurrentDest == WayPoints.length) {
      CurrentDest=0;
    }
    agent.destination = WayPoints[CurrentDest].transform.position;
  }
*/
  var hit : RaycastHit;
  if (Physics.Linecast (transform.position, player.transform.position, hit)) {
    if (hit.transform.gameObject.name == "Char" && hit.distance < 13) {
      var targetDir = player.transform.position - transform.position;
		  var forward = transform.forward;
		  var angle = Vector3.Angle(targetDir, forward);
		  if (angle < 20.0) {
        excl.transform.localPosition.y = 0;
        CallGuards();
      } else {
        excl.transform.localPosition.y = 1000;
      }
    } else {
      excl.transform.localPosition.y = 1000;
    }
  }


}

function CallGuards() {
  if (!GameObject.Find("ovill").GetComponent.<AudioSource>().isPlaying) {
    GameObject.Find("ovill").GetComponent.<AudioSource>().Play();
  }

  lastseen.transform.position.x = player.transform.position.x;
  lastseen.transform.position.z = player.transform.position.z;

  var guards = GameObject.FindGameObjectsWithTag("guard");
  var distance : float;
  for (var target : GameObject in guards) {
    distance  = Vector3.Distance(target.transform.position, transform.position);
    if(distance < 30) {
        target.GetComponent("Guard").SendMessage("Investigate");
    }
  }
}
