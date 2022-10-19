package fpoly.chickens.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import fpoly.chickens.entity.PaymentType;


public interface PaymentTypeDAO extends JpaRepository<PaymentType, Integer> {

}
