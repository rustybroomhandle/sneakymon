#pragma strict

var freemonster : String;
var freemonstername : String;

function OpenCage () {
  GameObject.Find("odoor").GetComponent.<AudioSource>().Play();
  GetComponent.<Animation>().Play("Take 001");
  yield WaitForSeconds(1);
  GameObject.Find("monsterfree").transform.localPosition.y = 0;

  GameObject.Find("xx2").transform.position.y = 999;
  GameObject.Find("xx3").transform.position.y = 999;

  GameObject.Find("freetxt").GetComponent(TextMesh).text = freemonstername + "\nis free !";

  GameObject.Find(freemonster).transform.SetParent(GameObject.Find("monsterfree").transform);
  GameObject.Find(freemonster).transform.position=GameObject.Find("monsterfree").transform.position;
  GameObject.Find(freemonster).transform.rotation=GameObject.Find("monsterfree").transform.rotation;

  yield WaitForSeconds(3);
  Destroy(GameObject.Find(freemonster));

  GameObject.Find("monsterfree").transform.localPosition.y = 999;

  freemonster = "free";

  if (GameObject.Find("Char").GetComponent(Char).freecount == 0) {
    Success();
  }
}

function Success() {
  GameObject.Find("didit").transform.localPosition.y = 0;
  GameObject.Find("shield").transform.position = GameObject.Find("Char").transform.position;
  yield WaitForSeconds(3);
  Application.LoadLevel("title");
}
