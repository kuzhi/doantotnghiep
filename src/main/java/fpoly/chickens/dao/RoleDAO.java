package fpoly.chickens.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import fpoly.chickens.entity.Role;

public interface RoleDAO  extends JpaRepository<Role, Integer> {

}
