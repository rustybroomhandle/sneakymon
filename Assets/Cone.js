#pragma strict

function OnTriggerEnter (other : Collider) {
		if (other.name == "Char") {
      Debug.Log("I seeee youuuu!!!!");
    }
}
