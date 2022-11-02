package fpoly.chickens.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "User")
public class User {
	@Id
	@Column(name = "Id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer Id;

	@Column(name = "Username")
	private String Username;

	@Column(name = "Password")
	private String Password;

	@Column(name = "Fullname")
	private String Fullname;

	@Column(name = "Gender")
	private Boolean Gender;

	@Column(name = "Email")
	private String Email;
	
	@Column(name = "Phone")
	private String Phone;
	
	@Column(name = "Photo")
	private String Photo;

	@Column(name = "Birthday")
	private Date Birthday;
	
	@Column(name = "Status")
	private Boolean Status;

	
	@Column(name = "Create_at")
	private Date Create_at;
	
	@Column(name = "Update_at")
	private Date Update_at;

	@Column(name = "Deleted")
	private Boolean Deleted;
}
