package fpoly.chickens.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import fpoly.chickens.entity.UserStore;


public interface UserStoreDAO extends JpaRepository<UserStore, Integer> {

}
