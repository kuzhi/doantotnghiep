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
public class UploadService {
	@Autowired 
	ServletContext servletContext;
	
	//	Trả về đường dẫn bằng tên thư mục và tên file
	private Path getPath(String folder, String filename) {
		File dir = Paths.get(servletContext.getRealPath("/files/"), folder).toFile();
		
		// Nếu chưa tồn tại thì tạo thư mục files		
		if(!dir.exists()) {
			dir.mkdirs();
		}
		
		return Paths.get(dir.getAbsolutePath(), filename);
	}
	
	public byte[] read(String folder, String file) {
		Path path = this.getPath(folder, file);
		try {
			return Files.readAllBytes(path);
		} catch (Exception e) {
			// TODO: handle exception
			throw new RuntimeException(e);
		}
	}

	public List<String> save(String folder, MultipartFile[] files) {
		List<String> filenames = new ArrayList<String>();
		for (MultipartFile file: files) {
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
}
