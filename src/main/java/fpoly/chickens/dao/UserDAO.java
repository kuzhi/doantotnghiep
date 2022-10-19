package fpoly.chickens.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import fpoly.chickens.entity.User;


public interface UserDAO extends JpaRepository<User, Integer>{

}
