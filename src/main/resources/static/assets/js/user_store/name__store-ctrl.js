app.controller(
  "name__store-ctrl",
  function ($scope, $http, $location, $q, $filter) {
    $scope.regexPhone =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    $scope.titleBread = "Chi tiết cửa hàng";
    $scope.titleBreadcrumb = "Thông tin chung";
    let storeId;
    $scope.listStoreByStoreId = [];
    $scope.listStoreByUserId = [];

    //get storeid and user id

    $scope.init = function () {
      ///getOneStore/{userid}
      var def = $q.defer();
      if (!$scope.stores.id) {
        $http
          .get("/api/store/getOneStore/" + $scope.userid)
          .then((resp) => {
            if (resp.data) {
              storeId = resp.data;
            } else {
              Swal.fire({
                icon: "error",
                title: "Cửa hàng đã bị xóa!",
              });
            }
          })
          .then(function (res) {
            def.resolve(
              $http
                .get("/api/store/getCurrentStore/" + storeId)
                .then((resp) => {
                  if (resp.data) {
                    $scope.listStoreByStoreId = resp.data;
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Cửa hàng đã bị xóa!",
                    });
                  }
                }),

              $http.get("/api/store/list/" + $scope.userid).then((resp) => {
                if (resp.data) {
                  $scope.listStoreByUserId = resp.data;
                  // console.log(resp.data);
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Cửa hàng đã bị xóa!",
                  });
                }
              })
            );
          });
      } else {
        $http
          .get("/api/store/getCurrentStore/" + $scope.stores.id)
          .then((resp) => {
            if (resp.data) {
              $scope.listStoreByStoreId = resp.data;
            } else {
              Swal.fire({
                icon: "error",
                title: "Cửa hàng đã bị xóa!",
              });
            }
          });

        $http.get("/api/store/list/" + $scope.userid).then((resp) => {
          if (resp.data) {
            $scope.listStoreByUserId = resp.data;
          } else {
            Swal.fire({
              icon: "error",
              title: "Cửa hàng đã bị xóa!",
            });
          }
        });
      }
    };

    //edit list store
    $scope.formStore = {};
    $scope.edit = function (store) {
      $scope.formStore = angular.copy(store);
    };

    $scope.init();

    //update
    $scope.update = function () {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success ms-2",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Thông báo",
          icon: "warning",
          text: "Bạn chắc chắn muốn thay đổi?",
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Quay lại",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            //====================================== Bắt đầu xử lý
            var store = angular.copy($scope.formStore);
            var url = $scope.url;
            $http
              .patch("/api/store/" + $scope.stores.id, store)
              .then((resp) => {
                if (resp.data) {
                  // Thông báo
                  swalWithBootstrapButtons.fire(
                    "Thành công",
                    "Cập nhật thành công!",
                    "success"
                  );
                  $scope.init();
                } else {
                  Swal.fire({
                    icon: "error",
                    title:
                      "cửa hàng hay địa chỉ và số diện thoại đã được sử dụng!",
                  });
                  $scope.init();
                }
                $scope.init();
              })
              .catch((error) => {
                // Thông báo
                Swal.fire({
                  icon: "error",
                  title: "Cập nhật thất bại!",
                });
                console.log("Error", error);
              });
            $scope.reset();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
          }
        });
    };

    //update
    $scope.update2 = function () {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success ms-2",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Thông báo",
          icon: "warning",
          text: "Bạn chắc chắn muốn thay đổi?",
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Quay lại",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            //====================================== Bắt đầu xử lý
            var store = angular.copy($scope.listStoreByStoreId);
            var url = $scope.url;
            $http
              .patch("/api/store/" + $scope.stores.id, store)
              .then((resp) => {
                if (resp.data) {
                  // Thông báo
                  swalWithBootstrapButtons.fire(
                    "Thành công",
                    "Cập nhật thành công!",
                    "success"
                  );
                  $scope.init();
                } else {
                  Swal.fire({
                    icon: "error",
                    title:
                      "cửa hàng hay địa chỉ và số diện thoại đã được sử dụng!",
                  });
                  $scope.init();
                }
                $scope.init();
              })
              .catch((error) => {
                // Thông báo
                Swal.fire({
                  icon: "error",
                  title: "Cập nhật thất bại!",
                });
                console.log("Error", error);
              });
            $scope.reset();
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
          }
        });
    };

    //reset
    $scope.reset = function () {
      $scope.formStore = null;
    };

    //Change image
    $scope.ImageChanged = function (files) {
      var data = new FormData();
      data.append("file", files[0]);
      $http
        .post("/api/upload/Store", data, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined },
        })
        .then((resp) => {
          // console.log('data: ', resp.data)
          $scope.formStore.image = resp.data.name;
        })
        .catch((error) => {
          alert("Lỗi tải hình ảnh");
          // console.log('error: ', error)
        });
    };

    //Change image
    $scope.ImageChanged2 = function (files) {
      var data = new FormData();
      data.append("file", files[0]);
      $http
        .post("/api/upload/Store", data, {
          transformRequest: angular.identity,
          headers: { "Content-Type": undefined },
        })
        .then((resp) => {
          // console.log('data: ', resp.data)
          $scope.listStoreByStoreId.image = resp.data.name;
        })
        .catch((error) => {
          alert("Lỗi tải hình ảnh");
          // console.log('error: ', error)
        });
    };

    // Create
    $scope.create = function () {
      var store = angular.copy($scope.formStore);
      store.userstoreId = $scope.listStoreByStoreId.userstoreId;
      store.deleted = false;
      store.create_at = new Date();
      let today = new Date();
      today.setDate(today.getDate() + 3);
      let endDate = today;
      store.enddate = endDate;
      for (var i = 0; i < $scope.listStoreByUserId.length; i++) {
        if (store.phone == $scope.listStoreByUserId[i].phone) {
          Swal.fire({
            icon: "error",
            title: "Thêm thất bại!",
            text: "số điện thoại không được trùng với các cửa hàng khác !!!",
          });
        } else {
          if (store.address == $scope.listStoreByUserId[i].address) {
            Swal.fire({
              icon: "error",
              title: "Thêm thất bại!",
              text: "địa chỉ không được trùng với các cửa hàng khác!!!",
            });
          } else {
            $scope.value = true;
          }
        }
      }
      if ($scope.value == true) {
        $http
          .post("/api/store/", store)
          .then((resp) => {
            console.log(resp.data);
            Swal.fire({
              icon: "success",
              title: "Thêm thành công!",
            });
            $scope.init();
            $scope.reset();
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Thêm thất bại!",
            });
            console.log("Error: ", error);
          });
      }
    };

    //detele
    $scope.delete = function (store) {
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
            //====================================== Bắt đầu xử lý
            if (store.id === $scope.stores.id) {
              Swal.fire({
                icon: "error",
                title: "Không thế xóa cửa hàng đang đăng nhập!",
              });
            } else {
              store.update_at = new Date();
              store.deleted = true;
              $http
                .patch("/api/store/" + store.id, store)
                .then((resp) => {
                  // Thông báo
                  swalWithBootstrapButtons.fire(
                    "Đã xóa",
                    "Đã xóa thành công!",
                    "success"
                  );
                  $scope.reset();
                  $scope.init();
                })
                .catch((error) => {
                  // Thông báo
                  Swal.fire({
                    icon: "error",
                    title: "Xóa thất bại!",
                  });
                });
              $scope.init();
              $scope.reset();
              //====================================== Kết thúc xử lý
            }
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
          }
        });
    };

    $scope.listOrderPack = [];
    $scope.orderPackSee = {};

    $scope.loadOrderPack = function () {
      $http.get("/api/orderpackstore/" + $scope.stores.id).then((resp) => {
        $scope.listOrderPack = resp.data;
      });
    };

    $scope.seemore = function (id) {
      $http.get("/api/orderpackid/" + id).then((resp) => {
        $scope.orderPackSee = resp.data;
      });
    };

    $scope.orderPack = {};

    // $scope.status = 1;
    $scope.listPack = [];
    $scope.loadPack = function () {
      $http.get("/api/pack").then((resp) => {
        $scope.listPack = resp.data;
      });
    };
    $scope.pagerPack = {
      page: 0,
      size: 4,
      get listPack() {
        var start = this.page * this.size;
        return $scope.listPack.slice(start, start + this.size);
      },
    };

    $scope.loadPack();

    $scope.orderPack = {};

    $scope.registerOrderPack = function (packid, packprice) {
      const pPrice = new Intl.NumberFormat('vi-VI', {
        style: 'currency',
        currency: 'VND'
      })
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success ms-2",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Giá: "+pPrice.format(packprice),
          // icon: "warning",
          text: "Vui lòng thanh toán, để đăng ký dịch vụ! (Nội dung chuyển khoản là *tên đăng nhập + tên cửa hàng* của bạn!)",
          imageUrl: "/assets/images/qr.jpg",
          imageWidth: 400,
          imageHeight: 400,
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Quay lại",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            $scope.orderPack = {
              store: { id: $scope.stores.id },
              pack: { id: packid },
              create_at: new Date(),
              status: 1,
            };
            $http
              .post("/api/orderpack/add", $scope.orderPack)
              .then((resp) => {});
            swalWithBootstrapButtons.fire(
              "Thành công",
              "Đã đăng ký thành công gói gia hạn!",
              "success"
            );
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
          }
        });
    };

    $scope.cancelOrderPack = function (orderid) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success ms-2",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Thông báo",
          icon: "warning",
          text: "Bạn chắc chắn hủy đăng ký gói này?",
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Quay lại",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            order = {
              id: orderid,
              status: 3,
            };
            $http.put("/api/orderpack/update", order).then((resp) => {});
            swalWithBootstrapButtons.fire(
              "Thành công",
              "Gói gia hạn đã được hủy!",
              "success"
            );
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
          }
        });
    };
  }
);
