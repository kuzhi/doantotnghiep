app.controller("sales-channel-ctrl", function ($scope, $http, $location) {
  $scope.titleBreadcrumb = "Kênh bán hàng";
  $scope.titleBread = "Kênh quản lý";
  $scope.stores = [];

  $scope.init = function () {
    $http.get("/api/store").then((resp) => {
      $scope.stores = resp.data;
    });
  };

  // Phân trang và điều hướng
  $scope.pager = {
    page: 0,
    size: 10,
    get stores() {
      var start = this.page * this.size;
      return $scope.stores.slice(start, start + this.size);
    },
    get count() {
      return Math.ceil((1.0 * $scope.stores.length) / this.size);
    },
    first() {
      this.page = 0;
    },
    prev() {
      this.page--;
      if (this.page < 0) {
        this.last();
      }
    },
    next() {
      this.page++;
      if (this.page >= this.count) {
        this.first();
      }
    },
    last() {
      this.page = this.count - 1;
    },
  };
  $scope.init();

  // Edit sale
  $scope.formStore = {};
  $scope.edit = function (stores) {
    $scope.formStore = angular.copy(stores);
  };

  //
  $scope.listFilter = [
    { id: 1, name: "Fullname giảm dần A-Z" },
    { id: 2, name: "Fullname tăng dần Z-A" },
  ];
  $scope.getUsersbyFilter = function () {
    // ======= A-Z
    if ($scope.list == 1) {
      $http.get("/api/store/" + "sort/a-z").then((resp) => {
        $scope.stores = resp.data;

        $scope.stores.forEach((us) => {
          us.create_at = new Date(us.create_at);
          us.update_at = new Date(us.update_at);
        });
      });
    }
    // ======= Z-A
    else if ($scope.list == 2) {
      $http.get("/api/store/" + "sort/z-a").then((resp) => {
        $scope.stores = resp.data;

        $scope.stores.forEach((us) => {
          us.create_at = new Date(us.create_at);
          us.update_at = new Date(us.update_at);
        });
      });
    }
  };
  // tìm theo id, tên người dùng
  $scope.storeName = "";
  $scope.findByName = function () {
    if ($scope.storeName != "") {
      $http
        .get("/api/store/name/" + $scope.storeName)
        .then((resp) => {
          $scope.stores = resp.data;
          console.log({ resp });
          if ($scope.stores != "") {
            $scope.stores.forEach((u) => {
              u.create_at = new Date(u.create_at);
              u.update_at = new Date(u.update_at);
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Không có kết quả phù hợp!",
            });
          }
        })
        .catch((error) => {
          console.log("Error", error);
        });
    } else {
      $scope.init();
    }
  };
});
