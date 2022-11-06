package fpoly.chickens.service;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileManagerService {
	@Autowired ServletContext app;
	
	private Path getPath(String folder, String filename) {
		File dir = Paths.get(app.getRealPath("/files/"), folder).toFile();
		
		if(!dir.exists()) {
			dir.mkdirs();
		}
		
		return Paths.get(dir.getAbsolutePath(), filename);
	}
	
	public byte[] read(String folder, String filename) {
		Path path = this.getPath(folder, filename);
		try {
			return Files.readAllBytes(path);
		} catch (Exception e) {
			throw new RuntimeException();
		}
	}

	public List<String> save(String folder, MultipartFile[] files) {
		List<String> filenames = new ArrayList<String>();
		for(MultipartFile file:files) {
			String name = System.currentTimeMillis() + file.getOriginalFilename();
			String filename = Integer.toHexString(name.hashCode()) + name.substring(name.lastIndexOf("."));
			Path path = this.getPath(folder, filename);
			
			try {
				file.transferTo(path);
				filenames.add(filename);
			} catch (Exception e) {
				// TODO: handle exception
				e.printStackTrace();
			}
		}
		
		return filenames;
	}
	
	public List<String> listImageProduct(String folder) {
		List<String> filenames = new ArrayList<String>();
		File dir = Paths.get(app.getRealPath("/files/"), folder).toFile();
		if(!dir.exists()) {
			File[] files = dir.listFiles();
			for(File file:files) {
				filenames.add(file.getName());
			}
		}
		
		return filenames;
	}
}
