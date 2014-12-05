#pragma strict

private var itemCount : int =7;
private var itemData : GameObject[] = new GameObject [itemCount];
private var flgData: boolean[] = new boolean [itemCount];
private var GameFlg : boolean = true;
private var playTime : int = 300;

function Start () {
  setupItem();
  animation.Play("idle");
  GameObject.Find("msg").guiText.text ="";
  GameObject.Find("itemCount").guiText.material.color = Color.blue;
}

function Update () {
if(!GameFlg) return;
checkTime();
checkItemCount();
checkEnd();
}

function OnControllerColliderHit(hit : ControllerColliderHit){
  if (!GameFlg) return;
  if (hit.collider.gameObject.name == "Terrain")
    return;
  checkItems(hit.collider.gameObject);
}

function setupItem(){
     Debug.Log("セットアップ始まるよ");
  for (var i = 0 ; i < itemCount; i++) {
   itemData[i] = GameObject.Find("item" + i);
   Debug.Log(itemData[i]);
   flgData[i] = false;
 }
}
function checkItems(obj : GameObject){

    for (var i = 0; i < itemCount; i++) {
    if(obj.name == ("item"+i)){
      Debug.Log("hit!"+obj.name);
    flgData[i] = true;
    obj.renderer.enabled = false;
    (obj.gameObject.GetComponent("Halo")
      as Behaviour).enabled = false;
    // if(checkEnd()) GameFlg = false;
    }
  }
}

function checkTime(){
  var t = playTime - Mathf.Floor(Time.time);
  GameObject.Find("time").guiText.text = "TIME:" + t;
  if (t <= 0) gameEnd(false);
}


function checkItemCount(){
  var count = 0;
  for (var i = 0;i<itemCount;i++){
    if (flgData[i]) count++;
  }
  GameObject.Find("itemCount").guiText.text = "ITEM: " + count;
}

// function checkEnd(){
//   if (Transform.position.y < -10){
//     gameEnd(false);
//   }
//   for (var i = 0; i< itemCount; i++){
//     if (!flgData[i]) return;
//   }
//   gameEnd(true);
//   }


function gameEnd(flg :boolean){
  GameFlg = false;
  var msg = gameObject.Find("msg");
  if (flg){
    msg.guiText.material.color = Color.red;
    msg.guiText.text = "GAME CLEAR!";
  }else{
    msg.guiText.material.color = Color.white;
    msg.guiText.text = "GAME OVER";
  }
}




function checkEnd(){
  for (var i=0; i<itemCount; i++){
    if (!flgData[i]) return false;
  }
print("goal");
return true;
}
