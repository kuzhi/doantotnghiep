app.controller("sales-channel-ctrl", function ($scope, $http, $location) {
  $scope.titleBreadcrumb = "Kênh bán hàng";
  $scope.titleBread = "Kênh quản lý";
  $scope.storeid = 2;
  $scope.chanels = [
    {
      id: "10000000001",
      name: "S-Chanel",
      address: "TP.Hồ Chí Minh",
      phone: "0942.xxx.xxx",
    },
    {
      id: "10000000001",
      name: "S-Chanel",
      address: "TP.Hồ Chí Minh",
      phone: "0942.xxx.xxx",
    },
    {
      id: "10000000001",
      name: "S-Chanel",
      address: "TP.Hồ Chí Minh",
      phone: "0942.xxx.xxx",
    },
    {
      id: "10000000001",
      name: "S-Chanel",
      address: "TP.Hồ Chí Minh",
      phone: "0942.xxx.xxx",
    },
    {
      id: "10000000001",
      name: "S-Chanel",
      address: "TP.Hồ Chí Minh",
      phone: "0942.xxx.xxx",
    },
    {
      id: "10000000001",
      name: "S-Chanel",
      address: "TP.Hồ Chí Minh",
      phone: "0942.xxx.xxx",
    },
    {
      id: "10000000001",
      name: "S-Chanel",
      address: "TP.Hồ Chí Minh",
      phone: "0942.xxx.xxx",
    },
    {
      id: "10000000001",
      name: "S-Chanel",
      address: "TP.Hồ Chí Minh",
      phone: "0942.xxx.xxx",
    },
  ];
  $scope.init = function () {
    $http.get("/api/store/" + $scope.storeid).then((resp) => {
      $scope.products = resp.data;
    });
  };

  $scope.listFilter = [
    { id: 1, name: "Fullname giảm dần A-Z" },
    { id: 2, name: "Fullname tăng dần Z-A" },
    { id: 3, name: "Giới tính nam" },
    { id: 4, name: "Giới tính nữ" },
  ];

  // Reset form
  $scope.reset = function () {
    $scope.formProduct = {
      name: null,
      address: null,
      phone: null,
    };
  };
  $scope.reset();

  //edit
  $scope.formChanel = {};
  $scope.edit = function (chanel) {
    $scope.formChanel = angular.copy(chanel);
  };

  // Update chanel
  $scope.update = function () {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger ms-2",
        cancelButton: "btn btn-success",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Thông báo",
        icon: "warning",
        text: "Bạn có chắc muốn thực hiện?",
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Quay lại",
        reverseButtons: true,
        showClass: {
          popup: "animate__animated animate__fadeInDownBig",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUpBig",
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          //====================================== Bắt đầu xử lý
          //   var category = document.querySelector("#selectCbbL").value;
          //   $scope.formChanel.category.id = JSON.parse(category);

          var chanel = angular.copy($scope.formChanel);
          chanel.update_at = new Date();

          // console.log("data: ", product);

          $http
            .put($scope.url + chanel.id, chanel)
            .then((resp) => {
              var index = $scope.chanels.findIndex((p) => p.id == chanel.id);

              $scope.chanels[index] = chanel;
              $scope.reset();
              //   $scope.init();

              // Thông báo
              swalWithBootstrapButtons.fire(
                "Thành công",
                "Cập nhật thành công!",
                "success"
              );
            })
            .catch((error) => {
              // Thông báo
              Swal.fire({
                icon: "error",
                title: "Cập nhật thất bại!",
              });
              console.log("Error", error);
            });
          //====================================== Kết thúc xử lý
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      });
  };
});
