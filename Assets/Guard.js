#pragma strict

//var WalkDest : GameObject;
var WayPoints : GameObject[];
private var CurrentDest : int = 0;
var agent : NavMeshAgent ;
var player : GameObject;
var excl : GameObject;

function Start() {
    agent = GetComponent(NavMeshAgent);
    agent.destination = WayPoints[CurrentDest].transform.position;
    player = GameObject.Find("Char");
    excl = GameObject.Find("exclr");
}

function Update() {

  if (agent.remainingDistance <= 1.5f) {
    CurrentDest++;
    if (CurrentDest == WayPoints.length) {
      CurrentDest=0;
    }
    agent.destination = WayPoints[CurrentDest].transform.position;
  }

  var hit : RaycastHit;
  if (Physics.Linecast (transform.position, player.transform.position, hit)) {
    if (hit.transform.gameObject.name == "Char" && hit.distance < 15) {
      var targetDir = player.transform.position - transform.position;
		  var forward = transform.forward;
		  var angle = Vector3.Angle(targetDir, forward);
		  if (angle < 15.0) {
        excl.transform.localPosition.y = 0;
      } else {
        excl.transform.localPosition.y = 1000;
      }
    } else {
      excl.transform.localPosition.y = 1000;
    }
  }


}