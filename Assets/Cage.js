#pragma strict

var freemonster : String;
var freemonstername : String;

function OpenCage () {
  GetComponent.<Animation>().Play("Take 001");
  yield WaitForSeconds(1);
  GameObject.Find("monsterfree").transform.localPosition.y = 0;

  GameObject.Find("freetxt").GetComponent(TextMesh).text = freemonstername + "\nis free !";

  GameObject.Find(freemonster).transform.SetParent(GameObject.Find("monsterfree").transform);
  GameObject.Find(freemonster).transform.position=GameObject.Find("monsterfree").transform.position;
  GameObject.Find(freemonster).transform.rotation=GameObject.Find("monsterfree").transform.rotation;

  yield WaitForSeconds(3);
  Destroy(GameObject.Find(freemonster));

  GameObject.Find("monsterfree").transform.localPosition.y = 999;

  freemonster = "free";
}
