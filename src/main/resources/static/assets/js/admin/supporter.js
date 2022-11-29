app.controller("supporter-ctrl", function ($scope, $http, $location) {
  $scope.titleBreadcrumb = "Cấp quyền";
  $scope.titleBread = "Phân công quản trị";
  $scope.storeid = 2;

  $scope.edit = function () {
    $scope.titleTable = "Cấp quyền quản trị cho kênh";
  };

  $scope.list = {
    // suporter: [
    //   //   {
    //   //     id: "1000001",
    //   //     name: "S-Chanel",
    //   //     username: "s-user",
    //   //     staff: "user-1",
    //   //     status: 1,
    //   //     img: "icon_food.png",
    //   //   },
    //   //   {
    //   //     id: "1000001",
    //   //     name: "S-Chanel",
    //   //     username: "s-user",
    //   //     staff: "user-1",
    //   //     status: 0,
    //   //     img: "icon_food.png",
    //   //   },
    //   //   {
    //   //     id: "1000001",
    //   //     name: "S-Chanel",
    //   //     username: "s-user",
    //   //     staff: "user-1",
    //   //     status: 1,
    //   //     img: "icon_food.png",
    //   //   },
    //   //   {
    //   //     id: "1000001",
    //   //     name: "S-Chanel",
    //   //     username: "s-user",
    //   //     staff: "user-1",
    //   //     status: 0,
    //   //     img: "icon_food.png",
    //   //   },
    //   //   {
    //   //     id: "1000001",
    //   //     name: "S-Chanel",
    //   //     username: "s-user",
    //   //     staff: "user-1",
    //   //     status: 1,
    //   //     img: "icon_food.png",
    //   //   },
    //   //   {
    //   //     id: "1000001",
    //   //     name: "S-Chanel",
    //   //     username: "s-user",
    //   //     staff: "user-1",
    //   //     status: 1,
    //   //     img: "icon_food.png",
    //   //   },
    // ],

    user: [
      {
        id: 1,
        name: "Nguyễn Văn An",
      },
      {
        id: 2,
        name: "Trần Thị Bình",
      },
      {
        id: 3,
        name: "Nguyễn Văn Chánh",
      },
    ],
  };

  $scope.suporter = [];
  $scope.init = function () {
    $http.get("/api/userStore/").then((resp) => {
      $scope.suporter = resp.data;
    });
  };
  $scope.init();

  $scope.supporterForm = {};
  $scope.edit = function (sup) {
    $scope.supporterForm = angular.copy(sup);
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

          var support = angular.copy($scope.supporterForm);
          support.update_at = new Date();

          // console.log("data: ", product);

          $http
            .put("/api/userStore/" + support.id, support)
            .then((resp) => {
              var index = $scope.suporter.findIndex((p) => p.id == support.id);
              $scope.suporter[index] = support;
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

  //delete support
  $scope.delete = function () {
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
        text: "Bạn có chắc muốn thực hiện xóa?",
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
          var support = angular.copy($scope.supporterForm);
          $http.put("/api/userStore/" + support.id, support).then((resp) => {
            var index = $scope.suporter.findIndex((p) => p.id == support.id);
            $scope.suporter.splice(index, 1);

            // $scope.reset();
            $scope.init();
            // Thông báo
            swalWithBootstrapButtons.fire(
              "Đã xóa",
              "Đã xóa thành công!",
              "success"
            );
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
        }
      });
  };

  $scope.listFilter = [
    { id: 1, name: "Fullname giảm dần A-Z" },
    { id: 2, name: "Fullname tăng dần Z-A" },
    { id: 3, name: "Giới tính nam" },
    { id: 4, name: "Giới tính nữ" },
  ];
});
