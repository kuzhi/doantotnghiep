package fpoly.chickens.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import fpoly.chickens.entity.Store;

public interface StoreDAO extends JpaRepository<Store, Integer>{

}
