package fpoly.chickens.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import fpoly.chickens.entity.ShippingType;

public interface ShippingTypeDAO extends JpaRepository<ShippingType, Integer>{

}
