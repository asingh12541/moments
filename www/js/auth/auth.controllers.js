angular.module('your_app_name.auth.controllers', ['ngOpenFB','ngCordova', 'ionic'])


.controller('WelcomeCtrl', function($scope, $state, $ionicModal, $timeout, ngFB, $http, $cordovaCamera,  $ionicLoading, AuthService){
	// $scope.bgs = ["http://lorempixel.com/640/1136"];




	$scope.bgs = ["img/giphy-bg-2.gif"];

$scope.facebookSignIn = function () {
    ngFB.login({scope: 'email,public_profile,user_friends'}).then(
        function (response) {
            if (response.status === 'connected') {
                console.log('Facebook login succeeded');
               
                $ionicLoading.show({
                      template: 'Hang On Logging in...'
                });

               // $state.go('app.feed');
                 ngFB.api({
                    path: '/me',
                    params: {fields: 'id,name,email,gender,picture'}
                  }).then(
                    function (user) {
                       $scope.user = user;
                       $scope.name = user.name;
                      console.log(user);
                      ngFB.api({
                        path: '/me/friends'
                      
                        }).then(
                        function (friendList) {

                      console.log(friendList);
                        
              //AuthService.saveUser(user, friendList);





    var name = user.name.split(" ");
    var friendsID = [];

    if(friendList.data.length == 0)
      friendsID = null;
    else{
      for(var i =0; i<friendList.data.length; i++){
        friendsID.push(user.uid);
      }
    }

 var data = { user:{
                 userId: user.id,
           
                 name: {
                   firstName: name[0],
                   lastName: name[1]
                 },
                 email: user.email,
                 gender: user.gender,
                 profilePic: "http://graph.facebook.com/"+user.id+"/picture?width=60&height=60",
                 friendList: friendsID

               }

            };

      


        
            var config = {
                headers : {
                     'Content-Type': 'application/json'
                }
            }

            $http.post('http://54.148.131.18/moments/api/user/register', data, config)
            .success(function (data, status, headers, config) {
              console.log(data);
               
            })
            .error(function (data, status, header, config) {
                var ResponseDetails = "Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config;

                    console.log(ResponseDetails);
            });











 $ionicLoading.hide();
                          $state.go('dont-have-facebook');
                      
                          
                        },
                        function (error) {
                            alert('Facebook error: ' + error.error_description);
                      });

                    },
                    function (error) {
                        alert('Facebook error: ' + error.error_description);
                  });


         



            } else {
                alert('Facebook login failed');
            }
        });
}


















	$ionicModal.fromTemplateUrl('views/app/legal/privacy-policy.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.privacy_policy_modal = modal;
  });

	$ionicModal.fromTemplateUrl('views/app/legal/terms-of-service.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.terms_of_service_modal = modal;
  });

  $scope.showPrivacyPolicy = function() {
    $scope.privacy_policy_modal.show();
  };

	$scope.showTerms = function() {
    $scope.terms_of_service_modal.show();
  };
})




.controller('upLoadCtrl', function($scope, $state, $ionicModal, $timeout, ngFB, $cordovaImagePicker, $cordovaCamera, $ionicLoading){
 




   ngFB.api({
                    path: '/me',
                    params: {fields: 'id,name,email,gender,picture'}
                  }).then(
                    function (user) {
                      console.log(user.picture);
                       $scope.user = user;
                       $scope.image = "http://graph.facebook.com/"+user.id+"/picture?width=60&height=60";
                    
/*
$cordovaPhotoLibrary.requestAuthorization(
  function () {
    
         $ionicLoading.show({
                      template: 'requesting Autherization'
          });
  },
  function (err) {
    // User denied the access
  }, // if options not provided, defaults to {read: true}.
  {
    read: true,
    write: true
  }
);

$scope.libraryImages = [];
$cordovaPhotoLibrary.getLibrary(
  function (result) {
    var library = result.library;
    // Here we have the library as array

    library.forEach(function(libraryItem) {
      console.log(libraryItem.id);          // ID of the photo
      console.log(libraryItem.photoURL);    // Cross-platform access to photo
      console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
      console.log(libraryItem.fileName);
      console.log(libraryItem.width);
      console.log(libraryItem.height);
      console.log(libraryItem.creationDate);
      console.log(libraryItem.latitude);
      console.log(libraryItem.longitude);
      console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
      $scope.libraryImages.push(libraryItem.photoURL);
    });

  },
  function (err) {
    console.log('Error occured');
  },
  { // optional options
    thumbnailWidth: 512,
    thumbnailHeight: 384,
    quality: 0.8,
    includeAlbumData: false // default
  }
);

*/











                    });
     



/* profilepic upload*/

  $scope.data = { "ImageURI" :  "Select Image" };
    $scope.takePicture = function() {
    var options = {
   quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
    correctOrientation:true
      };
    $cordovaCamera.getPicture(options).then(
    function(imageData) {




      $scope.image = "data:image/jpeg;base64," + imageData;
      console.log($scope.image);
      $scope.picData = imageData;
      $scope.ftLoad = true;

      $localstorage.set('fotoUp', imageData);
      $ionicLoading.show({template: 'Foto acquisita...', duration:500});
    },
    function(err){
      $ionicLoading.show({template: 'Errore di caricamento...', duration:500});
      })
    }

    $scope.selectPicture = function() { 
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    };

    $cordovaCamera.getPicture(options).then(
    function(imageURI) {
      window.resolveLocalFileSystemURI(imageURI, function(fileEntry) {
        $scope.picData = fileEntry.nativeURL;
        $scope.ftLoad = true;
        var image = document.getElementById('myImage');
        image.src = fileEntry.nativeURL;
        });
      $ionicLoading.show({template: 'Foto acquisita...', duration:500});
    },
    function(err){
      $ionicLoading.show({template: 'Errore di caricamento...', duration:500});
    })
  };

    $scope.uploadPicture = function() {
    $ionicLoading.show({template: 'Sto inviando la foto...'});
    var fileURL = $scope.picData;
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";
    options.chunkedMode = true;

    var params = {};
    params.value1 = "someparams";
        params.value2 = "otherparams";

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(fileURL, encodeURI("http://www.yourdomain.com/upload.php"), viewUploadedPictures, function(error) {$ionicLoading.show({template: 'Errore di connessione...'});
    $ionicLoading.hide();}, options);
    }

  var viewUploadedPictures = function() {
    $ionicLoading.show({template: 'Sto cercando le tue foto...'});
        server = "http://www.yourdomain.com/upload.php";
        if (server) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState === 4){
                    if (xmlhttp.status === 200) {          
                document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                    }
                    else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
          return false;
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send()} ;
    $ionicLoading.hide();
    }

  $scope.viewPictures = function() {
    $ionicLoading.show({template: 'Sto cercando le tue foto...'});
        server = "http://www.yourdomain.com/upload.php";
        if (server) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState === 4){
                    if (xmlhttp.status === 200) {          
                document.getElementById('server_images').innerHTML = xmlhttp.responseText;
                    }
                    else { $ionicLoading.show({template: 'Errore durante il caricamento...', duration: 1000});
          return false;
                    }
                }
            };
            xmlhttp.open("GET", server , true);
            xmlhttp.send()} ;
    $ionicLoading.hide();
    }

/*profile pic upload ends*/




   $scope.showMoments = function() { 
  $state.go('app.shop.sale');
  };










})


.controller('CreateAccountCtrl', function($scope, $state){
	$scope.doSignUp = function(){
		console.log("doing sign up");
		$state.go('app.feed');
	};
})

.controller('WelcomeBackCtrl', function($scope, $state, $ionicModal){
	$scope.doLogIn = function(){
		console.log("doing log in");
		$state.go('app.feed');
	};

	$ionicModal.fromTemplateUrl('views/auth/forgot-password.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.forgot_password_modal = modal;
  });

  $scope.showForgotPassword = function() {
    $scope.forgot_password_modal.show();
  };

	$scope.requestNewPassword = function() {
    console.log("requesting new password");
  };

  // //Cleanup the modal when we're done with it!
  // $scope.$on('$destroy', function() {
  //   $scope.modal.remove();
  // });
  // // Execute action on hide modal
  // $scope.$on('modal.hidden', function() {
  //   // Execute action
  // });
  // // Execute action on remove modal
  // $scope.$on('modal.removed', function() {
  //   // Execute action
  // });
})

.controller('ForgotPasswordCtrl', function($scope){

})

;
