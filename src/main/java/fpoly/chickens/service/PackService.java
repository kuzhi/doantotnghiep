package fpoly.chickens.service;

import java.util.List;

import fpoly.chickens.entity.Pack;

public interface PackService {
	// Load list pack
	List<Pack> findAll();
}
