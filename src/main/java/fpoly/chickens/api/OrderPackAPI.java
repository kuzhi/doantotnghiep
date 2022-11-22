package fpoly.chickens.api;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import fpoly.chickens.entity.OrderPack;
import fpoly.chickens.entity.ReportPack;
import fpoly.chickens.service.OrderPackService;

@CrossOrigin("*")
@RestController
public class OrderPackAPI {

	@Autowired
	OrderPackService orderPackService;

	@GetMapping("/api/orderpackall/{page}/{field}/{sort}")
	public ResponseEntity<Page<OrderPack>> getOrderPack(@PathVariable("page") Optional<Integer> page,@PathVariable("field") Optional<String> field,@PathVariable("sort") Optional<Integer> checkSort) {
		return ResponseEntity.ok(orderPackService.getOrderPack(page.orElse(0),field.get(),checkSort.get()));
	}
	
	@GetMapping("/api/orderpackkeyword/{key}")
	public ResponseEntity<Page<OrderPack>> getOrderPack(@PathVariable("key") Optional<String> key) {
		return ResponseEntity.ok(orderPackService.getOrderPackKeyword(key.get()));
	}

	@GetMapping("/api/orderpackstore/{storeid}")
	public ResponseEntity<List<OrderPack>> getOrderPackStoreandStatus(
			@PathVariable("storeid") Optional<Integer> storeid) {
		return ResponseEntity.ok(orderPackService.getOrderPackStore(storeid.get()));
	}

	@GetMapping("/api/orderpackid/{id}")
	public ResponseEntity<OrderPack> getOrderPackId(@PathVariable("id") Optional<Integer> id) {
		return ResponseEntity.ok(orderPackService.getOrderPackId(id.get()));
	}



	@PostMapping("/api/orderpack/add")
	public ResponseEntity<Void> addOrderPack(@RequestBody OrderPack orderPackData) {
		orderPackService.addOrderPack(orderPackData);
		return ResponseEntity.ok().build();

	}

	@PutMapping("/api/orderpack/update")
	public ResponseEntity<Void> confirmOrderPack(@RequestBody OrderPack orderPackData) {
		orderPackService.updateOrderPack(orderPackData);
		return ResponseEntity.ok().build();

	}

	@GetMapping("/api/report-orderpack/{dateStart}/{dateEnd}/{status}")
	public ResponseEntity<Integer> countOrderPackByDate(
			@PathVariable("dateStart") Optional<Date> dateStart,
			@PathVariable("dateEnd") Optional<Date> dateEnd,
			@PathVariable("status") Optional<Integer> status
			) {
		
		return ResponseEntity.ok(orderPackService.countOrderPackByDate(dateStart.get(), dateEnd.get(), status.get()));
	}

	@GetMapping("/api/report-orderpack-sale/{dateStart}/{dateEnd}/{status}")
	public ResponseEntity<List<ReportPack>> getSale(
			@PathVariable("dateStart") Optional<Date> dateStart,
			@PathVariable("dateEnd") Optional<Date> dateEnd,
			@PathVariable("status") Optional<Integer> status
			) {
		
		return ResponseEntity.ok(orderPackService.getSale(dateStart.get(), dateEnd.get(), status.get()));
	}
}
