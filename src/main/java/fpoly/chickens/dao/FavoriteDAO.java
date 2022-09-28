package fpoly.chickens.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import fpoly.chickens.entity.Favorite;

public interface FavoriteDAO extends JpaRepository<Favorite, Integer>{

}
