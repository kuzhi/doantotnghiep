package fpoly.chickens.api;

import java.io.File;
import java.util.List;

import javax.websocket.server.PathParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import fpoly.chickens.service.UploadService;

@CrossOrigin("*")
@RestController
public class UploadFileImageAPI {
	@Autowired UploadService uploadService;
	
	@GetMapping("/api/files/{folder}/{file}")
	public byte[] download(@PathVariable("folder")String folder,
			@PathVariable("file") String file) {
		return uploadService.read(folder, file);
	}
	
	@PostMapping("/api/files/images/{folder}")
	public List<String> upload(@PathVariable("folder") String folder,
			@PathParam("file") MultipartFile[] files) {
		
		return uploadService.save(folder, files);
	}
}
