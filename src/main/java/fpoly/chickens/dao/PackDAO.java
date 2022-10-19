package fpoly.chickens.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import fpoly.chickens.entity.Pack;


public interface PackDAO extends JpaRepository<Pack, Integer> {

}
