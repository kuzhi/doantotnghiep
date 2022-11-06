package fpoly.chickens.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import fpoly.chickens.service.FileManagerService;

@CrossOrigin("*")
@RestController
public class FileManagerRestController {
	@Autowired FileManagerService fileManagerService;
	
	@GetMapping("/rest/files/{folder}/{file}")
	public byte[] download(@PathVariable("folder") String folder,
			@PathVariable("file") String file) {
		return fileManagerService.read(folder, file);
	}
	
	@PostMapping("/rest/files/{folder}")
	public List<String> upload(@PathVariable("folder") String folder,
			@PathVariable("files") MultipartFile[] files) {
		return fileManagerService.save(folder, files);
	}
	
	@GetMapping("/rest/files/{folder}")
	public List<String> list(@PathVariable("folder") String folder) {
		return fileManagerService.listImageProduct(folder);
	}
}
