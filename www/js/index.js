/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
// document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    document.addEventListener('deviceready', () => {
        window.addEventListener('batterystatus', (info) => {
            console.log(`バッテリー状況変化 : 残${info.level}%・${info.isPlugged ? '充電中' : '充電していない'}`);
        });
        
        window.addEventListener('batterylow', (info) => {
            console.log(`バッテリー少なめ : 残${info.level}%・${info.isPlugged ? '充電中' : '充電していない'}`);
        });
        
        window.addEventListener('batterycritical', (info) => {
            console.log(`バッテリー切れ寸前 : 残${info.level}%・${info.isPlugged ? '充電中' : '充電していない'}`);
        });
    });
}

var app = {

    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        var button = document.getElementById("take_pictures");
        button.addEventListener("click", takePictures);
    },
    onDeviceReady: function() {
        var button = document.getElementById("take_Photo");
        button.addEventListener("click", takePhoto);
    },
    onDeviceReady: function() {
        var button = document.getElementById("dialog");
        button.addEventListener("click", diaLog);
    },
};

app.initialize();

function onConfirm(buttonIndex) {
    alert('You selected button ' + buttonIndex);
}


function diaLog() {
    navigator.notification.confirm(
        'You are the winner!', // message
         onConfirm,            // callback to invoke with index of button pressed
        'Game Over',           // title
        ['Restart','Exit']     // buttonLabels
    );
}

// 写真撮影ボタンを押した時に呼ばれる
function takePictures(){
    navigator.camera.getPicture(cameraSuccess, cameraError, { 
        quality: 80, 
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: true,
    });
}
// 写真撮影が成功した時
function cameraSuccess(image){
    var img = document.getElementById("image");
    img.src = "data:image/jpeg;base64," + image;
}
// 失敗した時
function cameraError(message){
    alert("Failed!!: " + message);
}

function takePhoto(){

    navigator.camera.getPicture(photoScuccess, photoError, { 
        quality: 80, 
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        saveToPhotoAlbum: true,
    });
}

function photoScuccess(image){
    var img = document.getElementById("imagephoto");
    img.src = "data:image/jpeg;base64," + image;
}
// 失敗した時
function photoError(message){
    alert("Failed!!: " + message);
}

