#pragma strict

function Start () {

}

function Update () {
  checkClick();

}

function checkClick(){
  if(Input.GetMouseButtonDown(0)){
    var obj = getClickObj();
    if (obj != null && obj.name =="Cube"){
      Application.LoadLevel("1121");
    }
  }
}

function getClickObj(){
  var ray : Ray;
  var hit : RaycastHit;
  ray = Camera.main.ScreenPointToRay(Input.mousePosition);
  if (Physics.Raycast(ray,hit,100)){
    return hit.collider.gameObject;
  }else{
    return null;
  }
}