#pragma strict

function Update() {
  if (Input.GetKeyUp("e") || Input.GetKeyUp(KeyCode.Space)) {
    Application.LoadLevel("main");
  }
  if (Input.GetKey("escape")) {
    Application.Quit();
  }
}
