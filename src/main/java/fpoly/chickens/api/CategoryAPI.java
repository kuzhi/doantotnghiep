package fpoly.chickens.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import fpoly.chickens.entity.Category;
import fpoly.chickens.service.CategoryService;

@CrossOrigin("*")
@RestController
public class CategoryAPI {
	@Autowired
	CategoryService categoryService;
	
	@GetMapping("/api/category/view")
	public List<Category> findAll() {
		return categoryService.findAll();
	}
}
