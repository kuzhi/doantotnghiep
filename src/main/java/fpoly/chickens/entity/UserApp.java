package fpoly.chickens.entity;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Usersapp")
public class UserApp implements Serializable {

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
	private Date Create_at;
	
	@Column(name = "Update_at")
	private Date Update_at;


	@Column(name = "Deleted")
	private Boolean Deleted;


	public Integer getId() {
		return Id;
	}


	public void setId(Integer id) {
		Id = id;
	}


	public String getUsername() {
		return Username;
	}


	public void setUsername(String username) {
		Username = username;
	}


	public String getPassword() {
		return Password;
	}


	public void setPassword(String password) {
		Password = password;
	}


	public String getFullname() {
		return Fullname;
	}


	public void setFullname(String fullname) {
		Fullname = fullname;
	}


	public Boolean getGender() {
		return Gender;
	}


	public void setGender(Boolean gender) {
		Gender = gender;
	}


	public String getEmail() {
		return Email;
	}


	public void setEmail(String email) {
		Email = email;
	}


	public Date getBirthday() {
		return Birthday;
	}


	public void setBirthday(Date birthday) {
		Birthday = birthday;
	}


	public String getPhone() {
		return Phone;
	}


	public void setPhone(String phone) {
		Phone = phone;
	}


	public Date getCreate_at() {
		return Create_at;
	}


	public void setCreate_at(Date create_at) {
		Create_at = create_at;
	}


	public Date getUpdate_at() {
		return Update_at;
	}


	public void setUpdate_at(Date update_at) {
		Update_at = update_at;
	}


	public Boolean getDeleted() {
		return Deleted;
	}


	public void setDeleted(Boolean deleted) {
		Deleted = deleted;
	}
	
	
}
