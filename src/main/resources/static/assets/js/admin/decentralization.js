app.controller("decentralization-ctrl", function ($scope, $http, $location) {
  $scope.titleBreadcrumb = "Phân quyền";
  $scope.titleBread = "Phân quyền";

  $scope.user = [];

  $scope.listFilter = [
    { id: 1, name: "Fullname giảm dần A-Z" },
    { id: 2, name: "Fullname tăng dần Z-A" },
    { id: 3, name: "Giới tính nam" },
    { id: 4, name: "Giới tính nữ" },
  ];

  $scope.init = function () {
    $http.get("/api/userApp/").then((resp) => {
      $scope.user = resp.data;
    });
  };
  $scope.init();

  $scope.decenForm = {};
  $scope.edit = function (decen) {
    $scope.decenForm = angular.copy(decen);
  };

  // Update
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

          var support = angular.copy($scope.decenForm);
          support.update_at = new Date();

          // console.log("data: ", product);

          $http
            .put("/api/userApp/" + support.id, support)
            .then((resp) => {
              var index = $scope.user.findIndex((p) => p.id == support.id);
              $scope.user[index] = support;
              //   $scope.reset();
              $scope.init();

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
