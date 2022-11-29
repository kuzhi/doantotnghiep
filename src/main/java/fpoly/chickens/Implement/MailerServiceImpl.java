package fpoly.chickens.Implement;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import fpoly.chickens.entity.MailInfo;
import fpoly.chickens.service.MailerService;



@Service
public class MailerServiceImpl implements MailerService{
	List<MailInfo> list = new ArrayList<>();
	
	
	@Autowired
	JavaMailSender sender;
	
	
	@Override
	public void send(MailInfo mail) throws MessagingException {
		// TODO Auto-generated method stub
		MimeMessage message = sender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true, "utf-8");
		
		helper.setFrom(mail.getForm());
		helper.setTo(mail.getTo());
		helper.setSubject(mail.getSubject());
		helper.setText(mail.getBody(), true);
		helper.setReplyTo(mail.getForm());
		
		String[] cc = mail.getCc();

		if(cc !=null && cc.length >0) {
			helper.setCc(cc);
		}
		
		String[] bcc = mail.getBcc();
		
		if(bcc !=null && bcc.length>0) {
			helper.setBcc(bcc);
		}
		
		String[] attachments = mail.getAttachments();
		if(attachments !=null && attachments.length>0) {
			
			for(String path : attachments) {
				File file = new File(path);
				
				helper.addAttachment(file.getName(), file);
			}
		}
		
		//gui message den smtp server
		sender.send(message);
	}


	@Override
	public void send(String to, String subject, String body) throws MessagingException {
		this.send(new MailInfo(to,subject,body));
		
	}
	
	@Override
	public void queue(MailInfo mail) {
		// TODO Auto-generated method stub
		list.add(mail);
		
	}
	@Override
	public void queue(String to, String subject, String body) {
		// TODO Auto-generated method stub
		queue(new MailInfo(to,subject,body));
		
	}
	
	@Scheduled(fixedDelay = 5000)
	public void run() {
		
		while(!list.isEmpty()) {
			MailInfo mail =list.remove(0);
			try {
				this.send(mail);
			} catch (Exception e) {
				e.printStackTrace();
				// TODO: handle exception
			}
		}
		
	}	
	
	
}
