"use strict";!function(e,s){void 0!==e&&e.controller("CreateStorageCtr",["$scope","$state","$domeUser","$domeStorage","dialog",function(e,s,r,t,o){e.$emit("pageTitle",{title:"关联存储",descrition:"",mod:"storage"}),e.resourceType="STORAGE_CLUSTER",e.currentRole="REPORTER",e.roleList=["MASTER","DEVELOPER","REPORTER"],e.toggleRole=function(s){e.currentRole=s},e.userKey={key:""},e.selectedUsersList=[],e.selectedUsers=[],e.storage=angular.copy(t.storage),e.isWaitingCreate=!1;var n=r.userService;!function(){n.getCurrentUser().then(function(s){var r=s.data.result;e.myself={userId:r.id,username:r.username,role:"MASTER"},n.getUserList().then(function(s){e.userList=s.data.result||[];for(var r=0;r<e.userList.length;r++)if(e.userList[r].id===e.myself.userId){e.userList.splice(r,1);break}})})}(),e.selectUser=function(s,r){for(var t=0,o=e.selectedUsers.length;t<o;t++)if(e.selectedUsers[t].userId===s)return;for(var n=0,i=e.selectedUsersList.length;n<i;n++)if(e.selectedUsersList[n].userId===s)return;e.selectedUsers.push({userId:s,username:r}),e.userKey.key=""},e.cancelUser=function(s){e.selectedUsers.splice(s,1)},e.addUser=function(){for(var s=0,r=e.selectedUsers.length;s<r;s++)e.selectedUsersList.push({userId:e.selectedUsers[s].userId,username:e.selectedUsers[s].username,role:e.currentRole});e.selectedUsers=[]},e.deleteUser=function(s){e.selectedUsersList.splice(s,1)},e.userKeyDown=function(s,r,t){13==s.keyCode&&t&&e.selectUser(t.id,t.username),r||8!=s.keyCode||e.selectedUsers.pop()},e.createStorageSubmit=function(){e.isWaitingCreate=!0;var r=angular.copy(e.storage);"CEPHFS"==r.storageType?delete r.storageInfo.ips:"GLUSTERFS"==r.storageType&&(delete r.storageInfo.cephMonitors,delete r.storageInfo.cephUser,delete r.storageInfo.keyring),t.storageBackend.createStorage(r).then(function(r){for(var t=r.data.result||{},i=t.id,a=[],c=0,u=e.selectedUsersList.length;c<u;c++)a.push({collectionId:i,userId:e.selectedUsersList[c].userId,role:e.selectedUsersList[c].role,resourceType:e.resourceType});var l={collectionId:i,resourceType:e.resourceType,members:a};n.createCollectionUser(l).then(function(){e.isWaitingCreate=!1,o.alert("提示","创建成功！").then(function(e){if(e!==o.button.BUTTON_OK)throw""}).then(function(){s.go("storageManage")},function(){s.go("storageManage")})},function(s){e.isWaitingCreate=!1,o.error("创建成功，添加用户失败",s.data.resultMsg)})},function(s){e.isWaitingCreate=!1,o.error("创建失败",s.data.resultMsg)})}}])}(angular.module("domeApp"));