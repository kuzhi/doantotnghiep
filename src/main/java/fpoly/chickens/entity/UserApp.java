package fpoly.chickens.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Usersapp")
public class UserApp implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 9192840928446378933L;

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

	@Column(name = "Birthday")
	private Date Birthday;
	
	@Column(name = "Phone")
	private String Phone;
	
	@Column(name = "Create_at")
	@CreationTimestamp
	private Date Create_at;
	
	@Column(name = "Update_at")
	@UpdateTimestamp
	private Date Update_at;


	@Column(name = "Deleted")
	private Boolean Deleted;


	
}
