package fpoly.chickens.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import fpoly.chickens.entity.Promotion;

public interface PromotionDAO extends JpaRepository<Promotion, Integer>{

}
